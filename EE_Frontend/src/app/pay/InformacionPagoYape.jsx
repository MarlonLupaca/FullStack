import { useState } from 'react';

const InformacionPagoYape = () => {
  const [celular, setCelular] = useState('');
  const [codigo, setCodigo] = useState('');

  const handleContinuar = () => {
    console.log('Procesando pago con:', celular, codigo);
  };

  return (
    <div className="py-10 pb-20 mb-5  w-[30vw] m-auto shadow-md px-10 border-t-10 border-[#5F0672] rounded-lg">
      <div className=" flex justify-center items-center h-30 mb-10">
        <img src="./Img/yape.png" alt="yape" className="h-full" />
      </div>

      <div className="flex flex-col  items-center  gap-6">
        <div className=" w-full">
          <label htmlFor="celular" className="block text-sm font-medium text-gray-700 mb-1">
            Número de celular
          </label>
          <input
            type="tel"
            id="celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            className=" px-3 py-2 border border-gray-300 rounded-md w-full"
            placeholder="912345678"
          />
        </div>

        <div className=" w-full mb-5">
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
          className="w-fit py-2 px-4 bg-[#5F0672] text-white font-medium rounded-md hover:bg-purple-700"
        >
          Pagar
        </button>
      </div>
    </div>
  );
};

export default InformacionPagoYape;
