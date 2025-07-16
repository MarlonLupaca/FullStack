'use client';
import React from 'react';

const Button = ({ text, onClick, backgroundColor, textColor }) => {
  return (
    <button
      className="w-full mt-4 py-2 text-sm font-medium rounded"
      style={{ backgroundColor, color: textColor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
