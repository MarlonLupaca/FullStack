'use client';

const AgentTypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 mb-2 ml-4">
      <span className="font-bold text-gray-500 text-sm">Agente escribiendo</span>
      <div className="dot-flashing"></div>
    </div>
  );
};

export default AgentTypingIndicator;
