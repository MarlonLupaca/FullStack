// Archivo: EcommerceSupportChat.jsx

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import ChatSidebar from './ChatSidebar';
import ChatStatusBanner from './ChatStatusBanner';
import ChatBackground from './ChatBackground';
import ChatMessages from './ChatMessages';
import API_BASE_URL from '@/app/config/apiConfig';

const EcommerceSupportChat = () => {
  const [tickets, setTickets] = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [error, setError] = useState(null);
  const [ticketSheared, setTicketSheared] = useState('');

  const stompClientRef = useRef(null);
  const subscriptionsRef = useRef({});

  const isAdmin = true; // ✅ Forzar modo admin permanentemente

  useEffect(() => {
    const fetchInitialTickets = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/chatvivo/open`);
        if (!res.ok) throw new Error('Error al cargar los tickets');
        const data = await res.json();

        const parsed = data.map((t) => ({
          id: t.id,
          subject: t.lastMessage || 'Nuevo ticket',
          status: t.status,
          createdAt: t.createdAt,
          lastMessageContent: t.lastMessage,
          lastMessageCreatedAt: t.messages?.at(-1)?.timestamp || t.createdAt,
          customerEmail: t.customerEmail,
          customerName: t.customerName,
          messages: [],
        }));

        setTickets(parsed);
        setIsLoading(false);
      } catch (err) {
        console.error('Error al obtener tickets:', err);
        setError('No se pudieron cargar los tickets');
        setIsLoading(false);
      }
    };

    fetchInitialTickets();
  }, []);

  const handleNewTicket = useCallback((data) => {
    const ticketId = data.numeroTicket || data.ticketId;
    const newTicketData = {
      id: ticketId,
      subject: data.subject || data.lastMessageContent || 'Nuevo ticket',
      status: data.status || 'OPEN',
      createdAt: data.createdAt || data.lastMessageTimestamp,
      lastMessageContent: data.lastMessageContent,
      lastMessageCreatedAt: data.lastMessageTimestamp,
      customerEmail: data.customerEmail,
      customerName: data.customerName,
      messages: [],
    };

    setTickets((prev) => {
      const exists = prev.find((t) => t.id === ticketId);
      if (exists) {
        return prev.map((t) => (t.id === ticketId ? { ...t, ...newTicketData } : t));
      } else {
        return [newTicketData, ...prev];
      }
    });
  }, []);

  const handleTicketMessage = useCallback((ticketId, data) => {
    const newMsg = {
      id: data.messageId,
      sender: data.sender || (data.loger === 'admin' ? 'AGENT' : 'CUSTOMER'),
      content: data.content,
      createdAt: data.timestamp,
      timestamp: new Date(data.timestamp).getTime(),
    };

    setTickets((prevTickets) => {
      const ticketIndex = prevTickets.findIndex((t) => t.id === ticketId);
      if (ticketIndex === -1) return prevTickets;

      const ticketToUpdate = prevTickets[ticketIndex];
      if (ticketToUpdate.messages.some((msg) => msg.id === newMsg.id)) return prevTickets;

      const updatedTicket = {
        ...ticketToUpdate,
        messages: [...ticketToUpdate.messages, newMsg],
        lastMessageContent: newMsg.content,
        lastMessageCreatedAt: newMsg.createdAt,
      };

      const newTickets = [...prevTickets];
      newTickets[ticketIndex] = updatedTicket;
      return newTickets;
    });

    setActiveTicket((prevActive) => {
      if (!prevActive || prevActive.id !== ticketId) return prevActive;
      if (prevActive.messages.some((msg) => msg.id === newMsg.id)) return prevActive;
      return {
        ...prevActive,
        messages: [...prevActive.messages, newMsg],
        lastMessageContent: newMsg.content,
        lastMessageCreatedAt: newMsg.createdAt,
      };
    });
  }, []);

  const cleanupSubscriptions = useCallback(() => {
    Object.values(subscriptionsRef.current).forEach((sub) => sub?.unsubscribe?.());
    subscriptionsRef.current = {};
  }, []);

  useEffect(() => {
    const socketUrl = `ws://localhost:8080/ws-chat?email=admin@gmail.com&username=admin&rol=ADMIN`;
    const stompClient = new Client({
      brokerURL: socketUrl,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        setConnectionStatus('connected');
        setError(null);

        const globalSub = stompClient.subscribe('/topic/globalChat', (message) => {
          try {
            const data = JSON.parse(message.body);
            handleNewTicket(data);
          } catch (err) {
            console.error('Error en globalChat:', err);
          }
        });
        subscriptionsRef.current.global = globalSub;
      },
      onStompError: (frame) => {
        setConnectionStatus('error');
        setError(`STOMP error: ${frame.headers.message || frame.body}`);
      },
      onWebSocketError: () => {
        setConnectionStatus('error');
        setError('Error de conexión WebSocket');
      },
      onDisconnect: () => {
        setConnectionStatus('disconnected');
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      cleanupSubscriptions();
      stompClientRef.current?.deactivate();
      stompClientRef.current = null;
    };
  }, [handleNewTicket, cleanupSubscriptions]);

  const handleTicketSelection = useCallback(
    (ticketId) => {
      subscriptionsRef.current[ticketSheared]?.unsubscribe?.();
      delete subscriptionsRef.current[ticketSheared];

      if (ticketSheared !== ticketId && stompClientRef.current?.connected) {
        const sub = stompClientRef.current.subscribe(`/topic/ticket/${ticketId}`, (message) => {
          try {
            const data = JSON.parse(message.body);
            handleTicketMessage(ticketId, data);
          } catch (err) {
            console.error(`Error en mensaje de ticket ${ticketId}:`, err);
          }
        });
        subscriptionsRef.current[ticketId] = sub;
      }

      setActiveTicket(tickets.find((t) => t.id === ticketId));
      setTicketSheared(ticketId);
    },
    [tickets, ticketSheared, handleTicketMessage]
  );

  const handleSendMessage = useCallback(
    (text) => {
      if (!activeTicket || !text.trim() || !stompClientRef.current?.connected) return;

      const msg = {
        content: text,
        numeroTicket: activeTicket.id,
        type: 'CHAT',
      };

      stompClientRef.current.publish({
        destination: '/app/admin-send',
        body: JSON.stringify(msg),
      });
    },
    [activeTicket]
  );

  if (isLoading) {
    return <div className="p-8">Conectando al servidor...</div>;
  }

  return (
    <div className="relative flex bg-white text-gray-800 h-[90vh] shadow-2xl overflow-hidden">
      <ChatStatusBanner connectionStatus={connectionStatus} activeTicket={activeTicket} />
      <ChatSidebar tickets={tickets} activeTicket={activeTicket} onSelectTicket={handleTicketSelection} />
      {ticketSheared === '' ? (
        <ChatBackground />
      ) : (
        <ChatMessages ticketId={ticketSheared} activeTicket={activeTicket} onSendMessage={handleSendMessage} />
      )}
    </div>
  );
};

export default EcommerceSupportChat;
