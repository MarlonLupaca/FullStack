import { FaFacebookSquare, FaInstagramSquare, FaShareAlt } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

const GREEN_TIPS = [
  {
    title: 'Recicla los Envases',
    description:
      'Asegúrate de reciclar todo el cartón, vidrio y plástico. Enjuaga los envases antes de reciclar para evitar la contaminación.',
    shareText: '¡Recuerda reciclar todos los envases y enjuagarlos antes! #ConsejoEco',
    icon: '♻️',
  },
  {
    title: 'Extiende la Vida Útil',
    description:
      'Guarda tus productos ecológicos en un lugar fresco y seco para prolongar su vida útil y reducir el desperdicio.',
    shareText: '¡Guarda bien tus productos eco para que duren más y reducir el desperdicio! #VidaSostenible',
    icon: '🧊',
  },
  {
    title: 'Reutiliza Frascos y Botellas',
    description:
      'Reutiliza frascos o botellas de productos antiguos para almacenamiento o manualidades en vez de desecharlos.',
    shareText: '¡Reutiliza frascos y botellas para almacenamiento creativo o manualidades! #ConsejoVerde',
    icon: '🫙',
  },
  {
    title: 'Composta Artículos Biodegradables',
    description:
      'Composta cualquier empaque o parte del producto biodegradable para ayudar a devolver nutrientes a la tierra.',
    shareText: '¡Composta empaques biodegradables para ayudar al planeta! #EcoBrilla',
    icon: '🌱',
  },
];

function shareTip(tip, platform) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(tip.shareText);
  let shareUrl = '';
  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      break;
    case 'instagram':
      navigator.clipboard.writeText(`${tip.shareText} ${window.location.href}`);
      return;
    default:
      shareUrl = '';
  }
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  }
}

export default function SustainableTips() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-20 text-white bg-teal-600">
      <div className=" container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-14 text-white drop-shadow-lg tracking-tight">
          Consejos para un Estilo de Vida Sostenible
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {GREEN_TIPS.map((tip, idx) => (
            <div
              key={tip.title}
              className="p-6 flex flex-col items-start h-full bg-white shadow hover:shadow-lg transition-shadow rounded-3xl"
            >
              <div className="flex-1 mb-2">
                <h3 className="text-xl font-semibold mb-2 text-teal-600">
                  {tip.icon} {tip.title}
                </h3>
                <p className="text-gray-700">{tip.description}</p>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  className="p-2 rounded-full hover:bg-eco-leaf/20 transition"
                  onClick={() => shareTip(tip, 'facebook')}
                  type="button"
                >
                  <FaFacebookSquare size={20} className="text-[#4267B2]" />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-eco-sky/20 transition"
                  onClick={() => shareTip(tip, 'twitter')}
                  type="button"
                >
                  <FaSquareXTwitter size={20} className="text-gray-800" />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-eco-ocean/20 transition"
                  onClick={() => shareTip(tip, 'instagram')}
                  type="button"
                >
                  <FaInstagramSquare size={20} className="text-pink-500" />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-eco-leaf/10 transition"
                  onClick={() => {
                    navigator.clipboard.writeText(`${tip.shareText} ${window.location.href}`);
                  }}
                  type="button"
                >
                  <FaShareAlt size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
