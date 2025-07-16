'use client';

import { useEffect, useRef } from 'react';

const ChatMessages = ({ messages = [], isAgentTyping }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAgentTyping]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp || Date.now());
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const MessageBubble = ({ msg, isConsecutive }) => (
    <div
      className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} ${
        isConsecutive ? 'mt-1' : 'mt-4'
      }`}
    >
      <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
        {!isConsecutive && (
          <div className={`flex items-center mb-1 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                msg.sender === 'user'
                  ? 'bg-primary text-white'
                  : msg.sender === 'system'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-500 text-white'
              }`}
            >
              {msg.sender === 'user' ? 'TÚ' : msg.sender === 'system' ? '!' : 'AG'}
            </div>
            <span className={`text-xs text-gray-500 ${msg.sender === 'user' ? 'mr-2' : 'ml-2'}`}>
              {msg.sender === 'user' ? 'Tú' : msg.sender === 'system' ? 'Sistema' : 'Agente'}
            </span>
          </div>
        )}

        <div
          className={`px-4 py-2 rounded-2xl relative shadow-sm ${
            msg.sender === 'user'
              ? 'bg-primary text-white rounded-br-md'
              : msg.sender === 'system'
              ? 'bg-green-50 text-green-800 border border-green-200 rounded-bl-md'
              : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
          }`}
        >
          <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</div>
          <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
            {formatTime(msg.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );

  const TypingIndicator = () => (
    <div className="mb-2 flex justify-start mt-4">
      <div className="flex flex-col items-start max-w-[85%]">
        <div className="flex items-center mb-1">
          <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-xs font-medium text-white">
            AG
          </div>
          <span className="text-xs text-gray-500 ml-2">Agente</span>
        </div>

        <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200 rounded-bl-md relative shadow-sm">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <div className="absolute -bottom-0 -left-0 w-3 h-3 bg-white border-l border-b border-gray-200 transform rotate-45 -translate-x-1 translate-y-1"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-80 overflow-y-auto bg-[url(/back/garras.svg)] ">
      <div className="p-4 space-y-1">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-black">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium">¡Inicia la conversación!</p>
            <p className="text-xs mt-1">Escribe un mensaje para comenzar</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const previousMsg = messages[index - 1];
            const isConsecutive =
              previousMsg && previousMsg.sender === msg.sender && msg.timestamp - (previousMsg.timestamp || 0) < 60000;

            return <MessageBubble key={msg.id || index} msg={msg} isConsecutive={isConsecutive} />;
          })
        )}

        {isAgentTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
