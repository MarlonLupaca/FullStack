export default function EventList({ selectedDate, events }) {
  const eventDetails = events.filter(
    (event) => event.date && event.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="p-4 border-t border-gray-200 h-[240px] overflow-y-auto">
      <h3 className="font-medium text-gray-800 mb-2">Eventos del día</h3>
      {eventDetails.length > 0 ? (
        <div className="space-y-2">
          {eventDetails.map((event) => (
            <div key={event.id} className="p-2 px-4 bg-green-50 rounded">
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-green-800">{event.title}</div>
                <div className="text-xs text-gray-500">{event.time}</div>
              </div>
              <div className="text-sm text-gray-600 mb-1">{event.description}</div>
              <div className="flex justify-between items-center">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    event.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {event.status === 'Activo' ? '✓ Activo' : '× Inactivo'}
                </span>
                <span className="text-xs text-gray-400">ID: {event.id}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No hay eventos programados para este día.</p>
      )}
    </div>
  );
}
