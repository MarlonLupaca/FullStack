'use client';
import React from 'react';

const ButtonAdaptable = ({
  type = 'button', // tipo por defecto es 'button'
  label = '', // etiqueta por defecto estará vacía
  onClick, // función que manejará el evento click
  variant = 'primary', // variante por defecto ( 'primary', 'secondary', etc.)
  icon = '', // para el ícono (puede ser 'check', 'cancel', 'x', 'back', etc.)
  size = 'md', // tamaño del botón (pequeño, mediano, grande)
  disabled = false, // para manejar el estado deshabilitado
  className = '', // clase personalizada adicional para estilos
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg focus:outline-none transition-all duration-200 ease-in-out';
  
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
    cancel: 'bg-red-300 text-white hover:bg-red-400',
    check: 'bg-green-300 text-white hover:bg-green-400',
  };

  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };

  const iconMapping = {
    check: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>,
    cancel: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>,
    x: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>,
    back: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5M12 5l-7 7 7 7" /></svg>,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{iconMapping[icon]}</span>}
      {label}
    </button>
  );
};

export default ButtonAdaptable;
