'use client';
import { FaComments } from 'react-icons/fa';

const ChatButton = ({ toggleChat }) => {
  return (
    <button
      onClick={toggleChat}
      className="bg-teal-500 text-white rounded-full shadow-lg p-4 hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-500/50 transition-all duration-300"
      aria-label="Abrir chat"
    >
      <FaComments className="w-8 h-8" />
    </button>
  );
};

export default ChatButton;
