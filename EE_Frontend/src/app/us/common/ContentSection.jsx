import React from 'react';

const ContentSection = ({ title, children, imageLeft = false, imageComponent = null }) => (
  <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
    {imageLeft && <div>{imageComponent}</div>}
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-primary">{title}</h2>
      <div className="text-lg leading-relaxed text-gray-700">{children}</div>
    </div>
    {!imageLeft && <div>{imageComponent}</div>}
  </div>
);

export default ContentSection;
