import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { HiCreditCard } from 'react-icons/hi';

const SelectorMetodoPago = ({ metodoPago, onMetodoPagoChange }) => {
  const [abierto, setAbierto] = useState(false);

  const metodosDePago = [
    {
      id: 'tarjeta',
      nombre: 'Tarj. Crédito / Débito',
      icono: (
        <div className="w-6 h-6 text-2xl flex justify-center items-center">
          <HiCreditCard />
        </div>
      ),
    },
    {
      id: 'yape',
      nombre: 'Yape',
      icono: (
        <div className="w-6 h-6 flex items-center justify-center">
          <img src="./Img/yape.png" alt="logo de yape" className="w-full h-full object-contain" />
        </div>
      ),
    },
    {
      id: 'plin',
      nombre: 'Plin',
      icono: (
        <div className="w-6 h-6 flex items-center justify-center">
          <img src="./Img/plin.png" alt="logo de plin" className="w-full h-full object-contain" />
        </div>
      ),
    },
    {
      id: 'pagoefectivo',
      nombre: 'Pagoefectivo',
      icono: (
        <div className="w-10 h-6 flex items-center justify-center">
          <img src="./Img/pagoefectivo.png" alt="logo de pagoefectivo" className="h-full object-contain" />
        </div>
      ),
    },
  ];

  const metodoSeleccionado = metodosDePago.find((m) => m.id === metodoPago);

  return (
    <div className="mb-6 relative w-[40vw] px-1">
      <p className="text-sm font-medium text-black mb-2">Método de pago</p>

      {/* Caja seleccionada tipo select */}
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        className="flex items-center justify-between w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <div className="flex items-center gap-2">
          {metodoSeleccionado.icono}
          <span>{metodoSeleccionado.nombre}</span>
        </div>
        <HiChevronDown className="ml-2 text-lg" />
      </button>

      {/* Lista de opciones desplegable */}
      {abierto && (
        <ul className="absolute z-10 mt-1  border w-[39.5vw] bg-white  border-gray-300 rounded-md shadow-md max-h-60 overflow-auto">
          {metodosDePago.map((metodo) => (
            <li key={metodo.id}>
              <button
                onClick={() => {
                  onMetodoPagoChange(metodo.id);
                  setAbierto(false);
                }}
                className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 text-sm"
              >
                {metodo.icono}
                <span>{metodo.nombre}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Línea divisoria */}
      <div className="h-px bg-gray-200 w-full mt-4"></div>
    </div>
  );
};

export default SelectorMetodoPago;
