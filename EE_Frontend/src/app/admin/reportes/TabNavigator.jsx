import { LineChart as LineChartIcon, BarChart3, DollarSign } from 'lucide-react';

const TabNavigator = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('ventas')}
            className={`py-4 px-6 font-medium text-sm border-b-2 focus:outline-none ${
              activeTab === 'ventas'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <LineChartIcon className="inline mr-2" size={16} />
            Ventas
          </button>
          <button
            onClick={() => setActiveTab('productos')}
            className={`py-4 px-6 font-medium text-sm border-b-2 focus:outline-none ${
              activeTab === 'productos'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BarChart3 className="inline mr-2" size={16} />
            Productos
          </button>
          <button
            onClick={() => setActiveTab('finanzas')}
            className={`py-4 px-6 font-medium text-sm border-b-2 focus:outline-none ${
              activeTab === 'finanzas'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <DollarSign className="inline mr-2" size={16} />
            Finanzas
          </button>
        </nav>
      </div>
    </div>
  );
};

export default TabNavigator;
