'use client';
import React from 'react';
import { Calendar } from 'lucide-react';
import Button from './Button';

const ActivitiesList = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Calendar size={20} style={{ color: 'var(--color-primary)' }} />
        <h3 className="text-lg font-semibold ml-2">Próximas Actividades</h3>
      </div>
      <div className="space-y-4">
        {activities.map((act) => (
          <div key={act.id} className="flex items-start border-b border-gray-100 pb-3">
            <div className="flex-shrink-0 rounded-lg bg-gray-100 p-3 mr-3 text-center">
              <p className="text-xs" style={{ color: 'var(--color-primary-admin)' }}>
                {act.fecha.split(',')[0]}
              </p>
            </div>
            <div className="flex-grow">
              <p className="text-gray-800 font-medium">{act.titulo}</p>
              <p className="text-xs text-gray-500">
                {act.fecha} - {act.hora}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Button
        text="Ver calendario completo"
        backgroundColor="var(--color-tertiary)"
        textColor="var(--color-primary-admin)"
      />
    </div>
  );
};

export default ActivitiesList;
