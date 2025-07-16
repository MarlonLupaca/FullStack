'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 col-span-2">
      <h3 className="text-lg font-semibold mb-4">Resumen de Ventas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #eee' }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="ventas"
            name="Ventas"
            stroke="var(--color-primary)"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line type="monotone" dataKey="visitas" name="Visitas" stroke="var(--color-secondary)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
