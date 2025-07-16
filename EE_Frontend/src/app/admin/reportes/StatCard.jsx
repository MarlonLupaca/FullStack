import { TrendingUp, PieChart, Receipt, TrendingDown } from 'lucide-react';

const StatCard = ({ stat }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp size={20} />;
      case 'PieChart':
        return <PieChart size={20} />;
      case 'Receipt':
        return <Receipt size={20} />;
      case 'TrendingDown':
        return <TrendingDown size={20} />;
      default:
        return <TrendingUp size={20} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{stat.titulo}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.valor}</p>
        </div>
        <div
          className={`p-2 rounded-full ${stat.positivo ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
        >
          {getIcon(stat.icono)}
        </div>
      </div>
      <div className={`flex items-center mt-2 ${stat.positivo ? 'text-green-600' : 'text-red-600'}`}>
        <span className="text-sm font-medium">{stat.cambio}</span>
        <span className="text-xs text-gray-500 ml-1">vs. período anterior</span>
      </div>
    </div>
  );
};

export default StatCard;
