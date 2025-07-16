import Link from 'next/link';

// Acepta una nueva prop 'orderNumber'
const MensajeExitoPago = ({ orderNumber }) => {
  return (
    <div className="fixed inset-0 bg-white min-h-screen flex items-center justify-center">
      <div className="container max-w-lg px-4">
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-teal-600 p-3 mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">¡Pago completado!</h2>
          <p className="text-gray-600 mb-6">
            Tu pedido ha sido procesado correctamente. Recibirás un correo electrónico con los detalles de tu compra.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 w-full mb-6">
            <div className="flex justify-between font-semibold">
              <span>Número de pedido:</span>
              {/* Muestra el número de pedido dinámico */}
              <span># {orderNumber}</span>
            </div>
          </div>
          <Link
            href="/"
            className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-700 transition duration-200"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MensajeExitoPago;
