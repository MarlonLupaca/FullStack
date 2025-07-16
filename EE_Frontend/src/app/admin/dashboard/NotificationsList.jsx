'use client';
import React from 'react';
import { Bell } from 'lucide-react';
import Button from './Button';

const NotificationsList = ({ notifications }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Bell size={20} style={{ color: 'var(--color-primary)' }} />
        <h3 className="text-lg font-semibold ml-2">Notificaciones Recientes</h3>
      </div>
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className="flex items-start border-b border-gray-100 pb-3">
            <div
              className="flex-shrink-0 w-2 h-2 mt-2 rounded-full mr-3"
              style={{
                backgroundColor:
                  notif.tipo === 'info'
                    ? 'var(--color-primary)'
                    : notif.tipo === 'warning'
                    ? 'var(--color-warning)'
                    : 'var(--color-success)',
              }}
            />
            <div className="flex-grow">
              <p className="text-gray-800">{notif.mensaje}</p>
              <p className="text-xs text-gray-500">{notif.tiempo}</p>
            </div>
          </div>
        ))}
      </div>
      <Button
        text="Ver todas las notificaciones"
        backgroundColor="var(--color-tertiary)"
        textColor="var(--color-primary-admin)"
      />
    </div>
  );
};

export default NotificationsList;
