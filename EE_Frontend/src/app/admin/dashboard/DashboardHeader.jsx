'use client';
import { useState, useEffect } from 'react';

const DashboardHeader = () => {
  const [currentTime, setCurrentTime] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">Panel de Control</h1>
      <div className="flex justify-between items-center mt-2">
        {isClient ? (
          <>
            <p className="text-gray-600">{formatDate(currentTime)}</p>
            <p className="text-gray-600 font-semibold">{formatTime(currentTime)}</p>
          </>
        ) : (
          <>
            <p className="text-gray-600">Cargando fecha...</p>
            <p className="text-gray-600 font-semibold">Cargando hora...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
