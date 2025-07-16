import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  const dateFormat = { month: 'long', year: 'numeric' };
  const formattedDate = currentMonth.toLocaleDateString('es-ES', dateFormat);

  return (
    <div className="flex items-center justify-between mb-4 bg-gray-50 p-4 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-700 capitalize">{formattedDate}</h3>
      <div className="flex space-x-2">
        <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-teal-100 text-teal-600 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-teal-100 text-teal-600 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
