'use client';
import React from 'react';

const StatCard = ({ title, value, change, icon: Icon, color }) => {
  return (
    <div
      className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-105 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
          <p className="text-xs text-green-500 mt-1">{change}</p>
        </div>
        <div className="rounded-full p-3" style={{ backgroundColor: 'var(--color-primary-leve)' }}>
          <Icon size={24} style={{ color: color }} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
