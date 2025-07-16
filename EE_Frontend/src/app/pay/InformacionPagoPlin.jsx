import { useState } from 'react';

const InformacionPagoPlin = () => {
  const [celular, setCelular] = useState('');
  const [codigo, setCodigo] = useState('');

  const handleContinuar = () => {
    console.log('Procesando pago con Plin:', celular, codigo);
  };

  return (
    <div className="py-10 pb-20 mb-5 w-full max-w-md m-auto shadow-md px-10 border-t-8 border-green-500 rounded-lg">
      <div className=" flex justify-center items-center h-30 mb-10">
        <img src="./Img/plin.png" alt="yape" className="h-full" />
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="w-full">
          <label htmlFor="celular" className="block text-sm font-medium text-gray-700 mb-1">
            Número de celular
          </label>
          <input
            type="tel"
            id="celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
            placeholder="912345678"
          />
        </div>

        <div className="w-full mb-5">
          <label htmlFor="codigo" className="block text-sm font-medium text-gray-700 mb-1">
            Código de verificación
          </label>
          <input
            type="text"
            id="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="123456"
          />
        </div>

        <button
          onClick={handleContinuar}
          className="w-fit py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default InformacionPagoPlin;
