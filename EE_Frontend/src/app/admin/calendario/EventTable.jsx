import { Edit, Trash, Eye } from 'lucide-react';

const parseLocalDateString = (dateString) => {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const EventTable = ({ events, handleEdit, handleToggle, handleDelete }) => (
  <div className="overflow-x-auto mb-6">
    <div className="max-h-[350px] overflow-y-auto">
      <table className="min-w-full bg-white">
        <thead className="sticky top-0 bg-gray-50 z-10">
          <tr className="border-b text-sm text-left text-gray-500 font-medium">
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">TÍTULO</th>
            <th className="py-3 px-4">FECHA</th>
            <th className="py-3 px-4">HORA</th>
            <th className="py-3 px-4">DESCRIPCIÓN</th>
            <th className="py-3 px-4">ESTADO</th>
            <th className="py-3 px-4">ACCIONES</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-gray-50">
              <td className="py-3 px-4">{event.id}</td>
              <td className="py-3 px-4 font-medium">{event.title}</td>
              <td className="py-3 px-4">{parseLocalDateString(event.date)?.toLocaleDateString('es-ES') || ''}</td>
              <td className="py-3 px-4">{event.time}</td>
              <td className="py-3 px-4">{event.description}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-nowrap ${
                    event.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {event.status === 'Activo' ? '✓ Activo' : '× Inactivo'}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(event)} className="text-teal-600 hover:text-teal-800">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleToggle(event.id)} className="text-blue-600 hover:text-blue-800">
                    <Eye size={18} />
                  </button>
                  <button onClick={() => handleDelete(event)} className="text-red-600 hover:text-red-800">
                    <Trash size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {events.length === 0 && (
            <tr>
              <td colSpan="7" className="py-4 text-center text-gray-500">
                No se encontraron eventos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default EventTable;
