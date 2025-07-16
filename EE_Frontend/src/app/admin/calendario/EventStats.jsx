import { CalendarDays } from 'lucide-react';

const StatCard = ({ label, count, iconColor, bgColor }) => (
  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center">
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold">{count}</div>
    </div>
    <div className={`${bgColor} p-3 rounded-full`}>
      <CalendarDays className={`${iconColor}`} size={24} />
    </div>
  </div>
);

const EventStats = ({ total, active, upcoming }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <StatCard label="Total Eventos" count={total} iconColor="text-blue-500" bgColor="bg-blue-100" />
    <StatCard label="Eventos Activos" count={active} iconColor="text-green-500" bgColor="bg-green-100" />
    <StatCard label="Próximos Eventos" count={upcoming} iconColor="text-purple-500" bgColor="bg-purple-100" />
  </div>
);

export default EventStats;
