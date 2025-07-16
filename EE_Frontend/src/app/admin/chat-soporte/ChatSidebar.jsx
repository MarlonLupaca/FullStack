'use client';

import ConversationTicket from './ConversationTicket';
import { parseISO } from 'date-fns';

const ChatSidebar = ({ tickets, activeTicket, onSelectTicket }) => {
  const sortedOpenTickets = [...tickets].sort((a, b) => {
    const dateA = parseISO(a.lastMessageCreatedAt ?? a.createdAt);
    const dateB = parseISO(b.lastMessageCreatedAt ?? b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <aside className="w-[350px] flex-none bg-tertiary border-r border-gray-200 overflow-y-auto shadow-sm relative z-20">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-teal-100">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">
            T
          </span>
          Tickets Abiertos
        </h2>
      </div>

      <nav className="divide-y divide-gray-100">
        {sortedOpenTickets.map((ticket) => (
          <ConversationTicket
            key={ticket.id}
            ticket={ticket}
            isActive={activeTicket?.id === ticket.id}
            onSelect={onSelectTicket}
          />
        ))}
      </nav>

      {sortedOpenTickets.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V9"
              />
            </svg>
          </div>
          <p className="text-lg font-medium">No hay tickets abiertos</p>
          <p className="text-sm mt-1">Los nuevos tickets aparecerán aquí automáticamente.</p>
        </div>
      )}
    </aside>
  );
};

export default ChatSidebar;
