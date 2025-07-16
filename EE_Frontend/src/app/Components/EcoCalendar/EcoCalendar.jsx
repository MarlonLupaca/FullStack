'use client';

import { useEcoCalendar } from './useEcoCalendar';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventList from './EventList';

export default function EcoCalendar() {
  const { currentMonth, setCurrentMonth, selectedDate, setSelectedDate, events, loading, error, refetchEvents } =
    useEcoCalendar();

  const previousMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  return (
    <div className="w-[350px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden text-black">
      <CalendarHeader
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        previousMonth={previousMonth}
        nextMonth={nextMonth}
      />

      {loading && (
        <div className="p-4 text-center text-gray-500">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
          Cargando eventos...
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-400">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-red-700">Error al cargar eventos: {error}</p>
              <p className="text-xs text-red-600 mt-1">Mostrando eventos de ejemplo</p>
            </div>
            <button
              onClick={refetchEvents}
              className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      <CalendarGrid
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        events={events}
      />

      <EventList selectedDate={selectedDate} events={events} />
    </div>
  );
}
