import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VentasChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Tendencia de Ventas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip formatter={(value) => `S/ ${value}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="ventas"
            name="Ventas (S/)"
            stroke="#0D9488"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="costos" name="Costos (S/)" stroke="#F59E0B" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VentasChart;
