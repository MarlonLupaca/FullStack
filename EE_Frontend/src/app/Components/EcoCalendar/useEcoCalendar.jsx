'use client';

import { useState, useEffect } from 'react';
import API_BASE_URL from '@/app/config/apiConfig';

export function useEcoCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para parsear fecha de string a Date
  const parseLocalDateString = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Función para obtener eventos de la API
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/events`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // Transformar los datos de la API al formato esperado por el calendario
      const transformedEvents = data.map((event) => ({
        ...event,
        date: parseLocalDateString(event.date), // Convertir string a Date
      }));

      setEvents(transformedEvents);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching events:', err);

      // Eventos de fallback en caso de error
      setEvents([
        {
          id: 'fallback-1',
          date: new Date(2025, 3, 22),
          title: 'Día de la Tierra',
          description: 'Evento especial con descuentos en productos ecológicos',
          time: '10:00',
          status: 'Activo',
        },
        {
          id: 'fallback-2',
          date: new Date(2025, 4, 5),
          title: 'Taller de Reciclaje',
          description: 'Aprende a reciclar correctamente',
          time: '14:00',
          status: 'Activo',
        },
        {
          id: 'fallback-3',
          date: new Date(2025, 4, 15),
          title: 'Mercado Eco',
          description: 'Feria de productos locales y sostenibles',
          time: '09:00',
          status: 'Activo',
        },
        {
          id: 'fallback-4',
          date: new Date(2025, 4, 25),
          title: 'Webinar Sostenibilidad',
          description: 'Estrategias para reducir tu huella de carbono',
          time: '16:00',
          status: 'Activo',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar eventos al montar el componente
  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    currentMonth,
    setCurrentMonth,
    selectedDate,
    setSelectedDate,
    events,
    loading,
    error,
    refetchEvents: fetchEvents,
  };
}
