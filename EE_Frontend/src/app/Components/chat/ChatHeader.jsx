'use client';
import { FaTimesCircle } from 'react-icons/fa';

const ChatHeader = ({ toggleChat, connectionStatus }) => (
  <div className="bg-gradient-to-r from-teal-500 to-teal-700 p-4 text-white flex justify-between items-center rounded-t-xl">
    <div className="flex items-center">
      <h3 className="font-semibold mr-2">Chat de Soporte</h3>
      {connectionStatus === 'connected' && (
        <span className="bg-green-400 rounded-full w-2.5 h-2.5 animate-pulse" title="Conectado"></span>
      )}
      {connectionStatus === 'connecting' && (
        <span className="bg-yellow-400 rounded-full w-2.5 h-2.5 animate-pulse" title="Conectando..."></span>
      )}
      {connectionStatus === 'disconnected' && (
        <span className="bg-red-500 rounded-full w-2.5 h-2.5" title="Desconectado"></span>
      )}
    </div>
    <button
      onClick={toggleChat}
      className="text-white opacity-80 hover:opacity-100 transition-opacity"
      aria-label="Cerrar chat"
    >
      <FaTimesCircle className="w-5 h-5" />
    </button>
  </div>
);

export default ChatHeader;
