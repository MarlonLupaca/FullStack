'use client';

import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const ConversationTicket = ({ ticket, isActive, onSelect }) => {
  if (!ticket) return null;

  const {
    id,
    lastMessageCreatedAt,
    createdAt,
    lastMessageContent,
    customerName = 'Cliente Anónimo',
    customerEmail = 'Sin correo',
  } = ticket;

  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = parseISO(isoString);
    const now = new Date();

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    return isToday ? format(date, 'h:mm a', { locale: es }) : format(date, 'dd/MM/yy', { locale: es });
  };

  const getInitials = (name) => {
    if (!name || name === 'Cliente Anónimo') return '?';
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  const getAvatarColor = (name) => {
    if (!name || name === 'Cliente Anónimo') return 'bg-gray-500';

    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-teal-500',
      'bg-orange-500',
      'bg-cyan-500',
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const handleClick = () => onSelect?.(id);

  const timeToDisplay = formatTime(lastMessageCreatedAt ?? createdAt);
  const lastPreview = lastMessageContent || 'Sin mensajes';
  const initials = getInitials(customerName);
  const avatarColor = getAvatarColor(customerName);

  return (
    <div
      className={`flex items-center p-4 cursor-pointer bg-white hover:bg-gray-50 transition-all duration-200 ${
        isActive ? 'bg-teal-50 border-l-4 border-teal-500' : ''
      }`}
      onClick={handleClick}
      title={`Ticket #${id} - ${customerName}`}
    >
      <div
        className={`w-12 h-12 ${avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md ring-2 ring-white`}
      >
        {initials}
      </div>

      <div className="flex-1 ml-4 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg truncate text-gray-800">{customerName}</h3>
          <span className="text-xs text-gray-500 flex-shrink-0 ml-2 bg-gray-100 px-2 py-1 rounded-full">
            {timeToDisplay}
          </span>
        </div>

        <div className="text-xs text-gray-500 mt-1 truncate flex items-center">
          <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full text-xs font-medium mr-2">#{id}</span>
          {customerEmail}
        </div>

        <p className="text-sm text-gray-600 mt-2 truncate leading-relaxed">{lastPreview}</p>
      </div>
    </div>
  );
};

export default ConversationTicket;
