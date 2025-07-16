import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarHeader({ currentMonth, selectedDate, previousMonth, nextMonth }) {
  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  return (
    <div className="p-4 bg-green-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <CalendarIcon className="w-6 h-6 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Calendario Eco</h2>
        </div>
        <div className="text-sm text-gray-600">
          {selectedDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={previousMonth} className="p-2 rounded-full hover:bg-primary-leve">
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>
        <div className="font-medium ">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-primary-leve">
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>
      </div>
    </div>
  );
}
