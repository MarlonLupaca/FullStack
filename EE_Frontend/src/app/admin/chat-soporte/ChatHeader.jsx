'use client';

import { User } from 'lucide-react';

const ChatHeader = ({ activeTicket }) => {
  return (
    <div className="bg-teal-100 p-4 h-[11vh] border-b border-teal-200 flex justify-between items-center text-teal-900">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
          <User size={24} className="text-white" />
        </div>
        <div className="ml-3">
          {/* Muestra el ID del ticket y el número de mensajes */}
          <h2 className="font-semibold text-lg">{`${activeTicket?.customerName || 'N/A'}`}</h2>
          <span className="text-sm text-teal-700">{`${activeTicket?.customerEmail} mensajes`}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
