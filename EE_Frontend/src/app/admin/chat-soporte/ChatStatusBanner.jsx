'use client';

const ChatStatusBanner = ({ connectionStatus, activeTicket }) => {
  return (
    <>
      {/* Estado de conexión WebSocket */}
      <div
        className={`absolute top-6 right-4 z-5 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
          connectionStatus === 'connected'
            ? 'bg-green-100 text-green-800'
            : connectionStatus === 'error'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {connectionStatus === 'connected' && '🟢 Conectado'}
        {connectionStatus === 'disconnected' && '🟡 Desconectado'}
        {connectionStatus === 'error' && '🔴 Error'}
      </div>

      {/* Estado del ticket activo */}
      {activeTicket && (
        <div className="absolute top-6 right-32 z-5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          🔔 Ticket #{activeTicket.id}
        </div>
      )}
    </>
  );
};

export default ChatStatusBanner;
