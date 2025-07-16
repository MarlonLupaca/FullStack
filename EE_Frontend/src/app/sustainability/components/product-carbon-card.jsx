import { Leaf, Scale } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ProductCarbonCard({ name, image, carbonFootprint, savings, delay = 50 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let interval;
    let start = 0;
    interval = setInterval(() => {
      start += Math.ceil(carbonFootprint / 50);
      if (start >= carbonFootprint) {
        setCount(carbonFootprint);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, delay);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [carbonFootprint]);
  return (
    <div
      className="rounded-xl shadow-lg overflow-hidden transition-all duration-700 transform opacity-100 translate-y-0"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-48 relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="absolute bottom-4 left-4">
            <h3 className="text-xl font-semibold text-white">{name}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="w-5 h-5 text-teal-600" />
          <span className="text-lg font-semibold text-gray-800">{count} kg CO₂e</span>
        </div>
        <div className="flex items-center gap-2 text-teal-600">
          <Leaf className="w-5 h-5" />
          <span className="font-medium">{savings}% menos que el promedio de la industria</span>
        </div>
      </div>
    </div>
  );
}
