import { Recycle, Droplets, Sun, TreePine } from 'lucide-react';

const SUSTAINABILITY_CONTENT = [
  {
    title: 'Materiales reciclados',
    percentage: 87,
    description: 'de nuestros productos están hechos de materiales reciclados o renovables',
    icon: <Recycle className="w-8 h-8 text-teal-600 mr-3" />,
  },
  {
    title: 'Energía renovable',
    percentage: 75,
    description: 'de nuestra producción utiliza energía renovable para minimizar la huella de carbono',
    icon: <Sun className="w-8 h-8 text-teal-600 mr-3" />,
  },
  {
    title: 'Compens. de CO₂',
    percentage: 100,
    description: 'de nuestras emisiones de carbono son compensadas mediante proyectos de reforestación',
    icon: <TreePine className="w-8 h-8 text-teal-600 mr-3" />,
  },
  {
    title: 'Agua responsable',
    percentage: 65,
    description: 'de nuestra producción implementa prácticas de conservación del agua',
    icon: <Droplets className="w-8 h-8 text-teal-600 mr-3" />,
  },
];

export default function EnvironmentalImpact() {
  return (
    <section className="container mx-auto px-18 py-10 mb-16">
      <h2 className="text-4xl font-extrabold text-center mb-14 text-teal-800 drop-shadow-lg tracking-tight">
        Nuestro impacto ambiental
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {SUSTAINABILITY_CONTENT.map((item, index) => (
          <div
            key={index}
            className="bg-white/80 rounded-3xl shadow-sm transition-shadow duration-300 p-4 flex flex-col items-center relative overflow-hidden group"
          >
            <div className="flex items-center mb-4 z-10">
              {item.icon}
              <span className="text-lg font-semibold text-teal-700 tracking-wide">{item.title}</span>
            </div>
            <p className="text-5xl font-black mb-3 text-teal-800 drop-shadow-sm z-10">{item.percentage}%</p>
            <div className="w-full bg-teal-100 rounded-full h-4 mb-3 z-10">
              <div className="bg-teal-400 h-4 rounded-full shadow-md" style={{ width: `${item.percentage}%` }}></div>
            </div>
            <p className="text-base text-gray-600 text-center z-10">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
