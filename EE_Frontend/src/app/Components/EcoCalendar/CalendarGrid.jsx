export default function CalendarGrid({ currentMonth, selectedDate, setSelectedDate, events }) {
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  const days = [];

  // Días vacíos
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-11 flex items-center justify-center"></div>);
  }

  // Días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isSelected = selectedDate.toDateString() === date.toDateString();
    const hasEvent = events.some((event) => event.date.toDateString() === date.toDateString());

    days.push(
      <div key={day} className="h-11 flex items-center justify-center">
        <div
          className={`font-[500] flex items-center justify-center rounded-full cursor-pointer relative
            h-10 w-10 
            ${isSelected ? 'bg-primary text-white' : ''}
            hover:bg-primary-leve`}
          onClick={() => setSelectedDate(date)}
        >
          {day}
          {hasEvent && (
            <span
              className={`absolute bottom-1 w-1 h-1  rounded-full ${
                isSelected ? 'bg-white border-3 border-white' : 'bg-primary border-3 border-primary'
              }`}
            ></span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7">
      {dayNames.map((day) => (
        <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500 border-b">
          {day}
        </div>
      ))}
      {days}
    </div>
  );
}
