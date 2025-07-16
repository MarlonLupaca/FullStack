'use client';
import React from 'react';
import ButtonAdaptable from './ButtonAdaptable'; 

const ModalConfirmacion = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  message = '¿Estás seguro de que deseas continuar?', 
  title = 'Confirmación', 
  ...props 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-10 flex items-center justify-center z-50 backdrop-blur">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Título del modal */}
        <h2 className="text-xl font-semibold mb-4 text-black">{title}</h2>
        
        {/* Mensaje de confirmación */}
        <p className="text-base mb-6 text-black">{message}</p>

        {/* Contenedor de los botones */}
        <div className="flex justify-between">
          {/* Botón de Cancelar */}
          <ButtonAdaptable 
            label="Cancelar" 
            variant="secondary" 
            size="md" 
            onClick={onClose} 
          />
          {/* Botón de Aceptar */}
          <ButtonAdaptable 
            label="Aceptar" 
            variant="danger" 
            size="md" 
            onClick={onConfirm} 
          />
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
