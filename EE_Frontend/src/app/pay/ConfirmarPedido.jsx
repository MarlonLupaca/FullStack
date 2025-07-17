import { useState, useEffect } from 'react';
import { IoClipboardOutline, IoLocationOutline } from 'react-icons/io5';
import { MdPayment } from 'react-icons/md';
import { RiShoppingBagLine } from 'react-icons/ri';

const ConfirmarPedido = ({
  direccion = {},
  metodoPago = '',
  subtotal = 0,
  envio = 0,
  total = 0,
  formularioTarjeta = { numero: '' },
  onBack,
  onConfirm,
  cargando = false,
}) => {
  const [animateTotal, setAnimateTotal] = useState(false);

  useEffect(() => {
    setAnimateTotal(true);
    const timer = setTimeout(() => setAnimateTotal(false), 500);
    return () => clearTimeout(timer);
  }, [total]);

  // Unir dirección como un solo texto
  const direccionCompleta = [
    direccion.calle,
    direccion.distrito,
    direccion.provincia,
    direccion.region,
    direccion.codigoPostal,
  ]
    .map((campo) => campo?.trim())
    .filter((campo) => campo && campo.length > 0)
    .join(', ');

  const tieneDireccionValida = direccionCompleta.length > 0;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6 transition-all max-w-4xl mx-auto">
      <p className="text-xl sm:text-2xl font-bold text-teal-700 border-b pb-2 flex items-center">
        <IoClipboardOutline className="mr-2 text-xl sm:text-2xl" />
        Confirmar tu pedido
      </p>

      <div className="space-y-2">
        <p className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
          <IoLocationOutline className="text-xl sm:text-2xl mr-1 text-teal-700 flex-shrink-0" />
          Dirección de envío
        </p>
        {tieneDireccionValida ? (
          <p className="pl-6 sm:pl-7 text-sm sm:text-base text-gray-700 break-words">{direccionCompleta}</p>
        ) : (
          <p className="pl-6 sm:pl-7 text-sm sm:text-base text-amber-600 italic">Dirección no disponible</p>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
          <MdPayment className="text-xl sm:text-2xl mr-1 text-teal-700 flex-shrink-0" />
          Método de pago
        </p>
        {metodoPago ? (
          <div className="pl-6 sm:pl-7">
            <p className="font-medium text-gray-700 text-sm sm:text-base">
              {metodoPago === 'tarjeta'
                ? 'Tarjeta de crédito'
                : metodoPago === 'efectivo'
                ? 'Pago en efectivo'
                : metodoPago === 'transferencia'
                ? 'Transferencia bancaria'
                : metodoPago}
            </p>
            {metodoPago === 'tarjeta' && formularioTarjeta?.numero && (
              <p className="text-xs sm:text-sm text-gray-500">
                Tarjeta terminada en **** {formularioTarjeta.numero.slice(-4)}
              </p>
            )}
          </div>
        ) : (
          <p className="pl-6 sm:pl-7 text-sm sm:text-base text-amber-600 italic">Método de pago no seleccionado</p>
        )}
      </div>

      <div className="space-y-3">
        <p className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
          <RiShoppingBagLine className="text-xl sm:text-2xl mr-1 text-teal-700 flex-shrink-0" />
          Resumen del pedido
        </p>
        <div className="pl-6 sm:pl-7 space-y-2 text-gray-700 text-sm sm:text-base">
          <div className="flex justify-between items-center">
            <span>Subtotal</span>
            <span>S/. {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Envío</span>
            <span>S/. 0</span>
          </div>
          <div
            className={`flex justify-between font-bold pt-3 border-t border-gray-200 text-gray-900 ${
              animateTotal ? 'text-teal-600 transform scale-105 transition-all' : 'transition-all'
            }`}
          >
            <span>Total</span>
            <span>S/. {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end items-stretch sm:items-center pt-4">
        <button
          onClick={onBack}
          disabled={cargando}
          className="w-full sm:w-auto bg-gray-100 text-gray-800 py-3 sm:py-2 px-4 sm:px-4 rounded-xl font-medium hover:bg-gray-200 transition-all hover:shadow-md disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm sm:text-base"
        >
          Atrás
        </button>
        <button
          onClick={onConfirm}
          className="w-full sm:w-auto bg-teal-600 text-white py-3 sm:py-2 px-4 sm:px-4 rounded-xl font-medium hover:bg-teal-700 transition-all hover:shadow-md disabled:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
        >
          {cargando ? 'Procesando...' : 'Confirmar y pagar'}
        </button>
      </div>

      {(!tieneDireccionValida || !metodoPago) && (
        <p className="text-amber-600 text-xs sm:text-sm mt-2 text-center px-2">
          Por favor, completa todos los datos necesarios antes de confirmar.
        </p>
      )}
    </div>
  );
};

export default ConfirmarPedido;
