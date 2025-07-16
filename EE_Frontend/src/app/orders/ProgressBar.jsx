import React from 'react';

const ProgressBar = () => {
  return (
    <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 w-full h-full animate-progress-flow" />
    </div>
  );
};

export default ProgressBar;
