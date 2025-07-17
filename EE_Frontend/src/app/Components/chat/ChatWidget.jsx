'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import ChatButton from './ChatButton';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const stompClient = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);
  const closeFloatingWidget = () => setIsVisible(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsAuthenticated(true);
    setMessages([]);
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const socketUrl = `ws://31.97.86.247:8080/ws-chat?email=${encodeURIComponent(email)}&username=${encodeURIComponent(
      name
    )}&rol=CLIENT`;
    const emailSafe = email.replace('@', '_at_');

    const client = new Client({
      brokerURL: socketUrl,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ Conectado al WebSocket');

        // 1. Escuchamos el topic que envía el ticketId
        client.subscribe(`/topic/ticket/${emailSafe}`, (message) => {
          const ticketIdFromServer = message.body;
          console.log('🎫 Ticket recibido:', ticketIdFromServer);

          // 2. Cuando lo recibimos, nos suscribimos directamente al topic del ticket
          client.subscribe(`/topic/ticket/${ticketIdFromServer}`, (message) => {
            const body = JSON.parse(message.body);
            console.log(body);
            const incoming = {
              id: `msg-${Date.now()}`,
              text: body.content,
              sender: body.sender === name ? 'user' : 'agent',
              timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, incoming]);
          });
        });

        // 3. Emitimos eventos iniciales
        client.publish({
          destination: '/app/init',
          body: JSON.stringify({
            email,
            username: name,
          }),
        });

        client.publish({ destination: '/app/view' });
      },
      onStompError: (frame) => {
        console.error('❌ STOMP error:', frame);
      },
    });

    client.activate();
    stompClient.current = client;

    return () => {
      stompClient.current?.deactivate();
    };
  }, [isAuthenticated, name, email]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !stompClient.current?.connected) return;

    stompClient.current.publish({
      destination: '/app/send',
      body: JSON.stringify({
        content: inputMessage,
        type: 'CHAT',
      }),
    });

    setInputMessage('');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <div className="relative inline-block">
          <ChatButton toggleChat={toggleChat} />
          <button
            onClick={closeFloatingWidget}
            className="absolute -top-2 -right-2 rounded-full text-[15px] text-gray-400 hover:text-red-500 p-0 flex justify-center items-center"
            title="Cerrar"
          >
            <span className="font-extrabold">X</span>
          </button>
        </div>
      )}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 rounded-lg shadow-xl/20 overflow-hidden flex flex-col text-[15px]">
          <ChatHeader toggleChat={toggleChat} />
          <div className="flex-1 max-h-[450px] bg-transparent overflow-auto">
            {!isAuthenticated ? (
              <ChatForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                isSubmitting={false}
                onSubmit={handleEmailSubmit}
              />
            ) : (
              <ChatMessages messages={messages} />
            )}
          </div>
          {isAuthenticated && (
            <MessageInput inputMessage={inputMessage} setInputMessage={setInputMessage} onSubmit={sendMessage} />
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
