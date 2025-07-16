import React from 'react';

const TimelineItem = ({ year, title, description }) => (
  <div className="relative group">
    <div className="w-6 h-6 bg-primary rounded-full mx-auto transition-transform duration-300 group-hover:scale-125" />

    <div
      className={`
        mt-4
        w-[200px]
        bg-white
        p-4
        rounded-lg
        shadow-md
        transition-transform duration-300 ease-out
        group-hover:-translate-y-2 group-hover:shadow-xl
      `}
    >
      <h3 className="text-primary font-semibold text-lg">{year}</h3>
      <p className="font-bold text-gray-800">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default TimelineItem;
