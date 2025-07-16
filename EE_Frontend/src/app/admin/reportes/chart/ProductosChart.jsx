import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProductosChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Productos más vendidos</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip formatter={(value, name) => (name === 'ganancia' ? `S/ ${value}` : value)} />
          <Legend />
          <Bar dataKey="valor" name="Unidades" fill="#0D9488" />
          <Bar dataKey="ganancia" name="Ganancia (S/)" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductosChart;
