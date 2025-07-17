'use client';

import { useEffect, useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import { Client } from '@stomp/stompjs';
import API_BASE_URL from '@/app/config/apiConfig';

const ChatMessages = ({ ticketId, activeTicket, onSendMessage }) => {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const clientRef = useRef(null);

  // Cargar mensajes históricos (una vez al entrar)
  useEffect(() => {
    if (!ticketId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/chatvivo/mensajes/${ticketId}`);
        if (!res.ok) throw new Error('Error al cargar los mensajes');
        const data = await res.json();

        const mapped = data.map((msg) => ({
          id: msg.id,
          sender: msg.loger === 'admin' ? 'AGENT' : 'CUSTOMER',
          content: msg.content,
          createdAt: msg.timestamp,
        }));

        // Solo carga los mensajes como referencia, no renderiza
        setMessages(mapped);
      } catch (err) {
        console.error('Error cargando mensajes:', err);
      }
    };

    fetchMessages();
  }, [ticketId]);

  // WebSocket para escuchar nuevos mensajes de este ticket
  useEffect(() => {
    if (!ticketId) return;

    const client = new Client({
      brokerURL: `ws://31.97.86.247:8080/ws-chat?email=admin@gmail.com&username=admin&rol=ADMIN`,
      reconnectDelay: 5000,
      onConnect: () => {
        const sub = client.subscribe(`/topic/ticket/${ticketId}`, (message) => {
          try {
            const data = JSON.parse(message.body);

            // Evitar duplicados
            setMessages((prev) => {
              const exists = prev.some((m) => m.id === data.messageId);
              if (exists) return prev;

              return [
                ...prev,
                {
                  id: data.messageId,
                  sender: data.sender === 'admin' ? 'AGENT' : 'CUSTOMER',
                  content: data.content,
                  createdAt: data.timestamp,
                },
              ];
            });
          } catch (e) {
            console.error('❌ Error al parsear mensaje WebSocket:', e);
          }
        });

        clientRef.current = client;
      },
    });

    client.activate();

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, [ticketId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatMessageTime = (isoString) => {
    return format(parseISO(isoString), 'p', { locale: es });
  };

  return (
    <div className="flex flex-col w-full">
      <ChatHeader activeTicket={activeTicket} />
      <div className="flex-1 p-6 overflow-y-auto relative z-2 bg-[url(/back/garras.svg)]">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'AGENT' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[70%] p-3 rounded-2xl shadow-lg break-words text-sm ${
                  msg.sender === 'AGENT'
                    ? 'bg-teal-200 text-gray-900 rounded-tr-none'
                    : 'bg-gray-200 text-gray-900 rounded-tl-none'
                }`}
              >
                <p className="text-sm mx-2">{msg.content}</p>
                <div className="text-right mt-1 text-[10px] text-gray-600">
                  <span>{formatMessageTime(msg.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <ChatInput onSend={onSendMessage} />
    </div>
  );
};

export default ChatMessages;
