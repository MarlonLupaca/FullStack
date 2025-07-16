'use client';

import { useState, useRef, useEffect } from 'react';
import { Paperclip, Smile, SendHorizontal, X, Zap } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

const quickResponseCategories = {
  saludos: [
    '¡Hola! ¿En qué puedo ayudarte hoy?',
    'Buenos días, estoy aquí para asistirte',
    'Gracias por contactarnos, ¿cómo puedo ayudarte?',
  ],
  pedidos: [
    'Déjame revisar el estado de tu pedido',
    '¿Podrías proporcionar tu número de pedido?',
    'Voy a verificar los detalles de tu compra',
  ],
  problemas: [
    'Lamento el inconveniente, vamos a solucionarlo',
    'Entiendo tu preocupación, permíteme ayudarte',
    'Voy a escalarlo con el equipo técnico',
  ],
  cierre: [
    '¿Hay algo más en lo que pueda ayudarte?',
    'Espero haber resuelto tu consulta',
    'No dudes en contactarnos si necesitas más ayuda',
  ],
};

const ChatInput = ({ onSend, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [showQuickResponses, setShowQuickResponses] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('saludos');

  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Focus automático
  useEffect(() => {
    if (!disabled && inputRef.current) inputRef.current.focus();
  }, [disabled]);

  // Cierra emojiPicker si haces clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target) &&
        !e.target.closest('[data-emoji-toggle]')
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker]);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (trimmed && !disabled && typeof onSend === 'function') {
      onSend(trimmed);
      setMessage('');
      setShowQuickResponses(false);
      setShowEmojiPicker(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSend(e);
    if (e.key === 'Escape') {
      setShowEmojiPicker(false);
      setShowQuickResponses(false);
    }
  };

  const applyQuickResponse = (text) => {
    setMessage(text);
    setShowQuickResponses(false);
    inputRef.current?.focus();
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      {/* Panel respuestas rápidas */}
      {showQuickResponses && (
        <div className="absolute bottom-full left-0 right-0 bg-white border border-gray-200 rounded-t-xl shadow-lg z-10 max-h-80 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-teal-500" />
              <h3 className="font-semibold text-gray-800">Respuestas Rápidas</h3>
            </div>
            <button onClick={() => setShowQuickResponses(false)} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="flex border-b border-gray-100">
            {Object.keys(quickResponseCategories).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-1 px-4 py-2 text-sm font-medium capitalize ${
                  selectedCategory === cat
                    ? 'text-teal-600 border-b-2 border-teal-500 bg-teal-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="max-h-48 overflow-y-auto">
            {quickResponseCategories[selectedCategory].map((text, i) => (
              <button
                key={i}
                onClick={() => applyQuickResponse(text)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0"
              >
                <span className="text-sm text-gray-800">{text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Emoji picker */}
      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="absolute bottom-[70px] right-20 z-20 shadow-xl rounded-xl overflow-hidden bg-white"
        >
          <EmojiPicker onEmojiClick={onEmojiClick} height={350} />
        </div>
      )}

      {/* Formulario */}
      <form
        onSubmit={handleSend}
        className="p-4 h-[12vh] bg-gradient-to-r from-teal-50 to-teal-100 border-t border-teal-200"
      >
        <div className="flex items-center space-x-3">
          {/* Botón respuestas rápidas */}
          <button
            type="button"
            onClick={() => setShowQuickResponses((prev) => !prev)}
            disabled={disabled}
            className={`p-3 rounded-full flex-shrink-0 ${
              showQuickResponses ? 'bg-teal-500 text-white' : 'bg-white text-teal-500 hover:bg-teal-50'
            } ${disabled ? 'opacity-50' : 'hover:shadow-lg'}`}
          >
            <Zap className="w-5 h-5" />
          </button>

          {/* Input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              placeholder={disabled ? 'Conectando...' : 'Escribe tu mensaje...'}
              rows={1}
              className="w-full pl-4 pr-20 py-3 bg-white text-gray-800 placeholder-gray-400 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-md h-12"
              style={{ minHeight: '48px', maxHeight: '48px' }}
            />

            {/* Emoji botón */}
            <div className="absolute right-3 bottom-3">
              <button
                type="button"
                data-emoji-toggle
                disabled={disabled}
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                title="Insertar emoji"
              >
                <Smile className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={`w-12 h-12 flex items-center justify-center rounded-full ${
              message.trim() && !disabled
                ? 'bg-teal-500 text-white hover:bg-teal-600 transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
