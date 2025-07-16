import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FinanzasChart = ({ data }) => {
  const COLORS = ['#0D9488', '#F59E0B', '#10B981'];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Análisis Financiero</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="valor"
            label={({ name, valor, percent }) => `${name}: S/ ${valor} (${(percent * 100).toFixed(0)}%)`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `S/ ${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanzasChart;
