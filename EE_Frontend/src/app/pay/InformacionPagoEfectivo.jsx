import { useState } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import { BsClockHistory } from 'react-icons/bs';
import { MdOutlineShare } from 'react-icons/md';
import { FaSms } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';

const InformacionPagoEfectivo = ({ total = 0 }) => {
  const [copiado, setCopiado] = useState(false);
  const [celular, setCelular] = useState('');

  // Código de ejemplo de PagoEfectivo (CIP)
  const codigoCIP = '210663942';

  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigoCIP).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  };

  // Formato de la fecha de expiración como en la imagen
  const fechaExpiracion = 'Viernes 29/03/2024 - 02:30 PM';

  const handleCompartir = () => {
    // Lógica para compartir el código
    console.log('Compartir código');
  };

  const handleEnviar = () => {
    // Lógica para enviar el código al celular
    console.log('Enviar código al celular:', celular);
  };

  return (
    <div className="max-w-2xl m-auto bg-white border border-gray-200 mb-4">
      {/* Header amarillo */}
      <div className="bg-[#FFCC00] p-3 flex justify-between items-center ">
        <div className="flex items-center">
          <img src="./Img/pagoefectivo.png" alt="logo pagoefectivo" className="h-8" />
        </div>
        <div className="text-sm font-medium">Información para tu pago</div>
      </div>

      {/* Título */}
      <div className="text-center my-5">
        <p className="text-base font-medium">¡Estás a punto de finalizar tu compra!</p>
      </div>

      <div className="px-4 flex justify-center">
        {/* Columna izquierda */}
        <div className="w-full md:w-1/2 mb-4 flex flex-col justify-center items-center">
          <div className="text-sm mb-1 bg-tertiary py-1 flex flex-col items-center w-full">
            <div>
              Empresa: <span className="font-medium">PagoEfectivo</span>
            </div>
            <div>
              Servicio: <span className="font-medium">PagoEfectivo Soles</span>
            </div>
          </div>

          {/* Código CIP */}
          <div className="flex mb-4 w-full">
            <div className="bg-[#FFCC00] p-2 py-3 flex-1 flex flex-col justify-center items-center">
              <div className="text-xs">Código de pago (CIP)</div>
              <div className="text-2xl font-bold">{codigoCIP}</div>
              <div className="flex justify-center items-center gap-1">
                <button onClick={copiarCodigo} className="flex items-center text-xs underline cursor-pointer">
                  <IoCopyOutline className="mr-1" /> Copiar
                </button>
                {copiado && (
                  <div className="text-xs text-green-400">
                    <FaCheckCircle />
                  </div>
                )}
              </div>
            </div>
            <div className="bg-black text-white p-2 flex flex-col justify-center items-center w-30">
              <div className="text-xs">Monto a pagar</div>
              <div className="text-lg font-bold">S/. {total.toFixed(2)}</div>
            </div>
          </div>

          {/* Expiración */}
          <div className="flex items-center mb-3 text-[12px]">
            <BsClockHistory className="mr-2" />
            <span>Págalo antes del {fechaExpiracion}</span>
          </div>

          {/* Compartir */}
          <div className="flex items-center mb-4 text-sm">
            <MdOutlineShare className="mr-2" />
            <span className="mr-1">Compartir código CIP por</span>
            <FaSms className="text-2xl" />
          </div>

          {/* Formulario de celular */}
          <div className="flex mb-4">
            <input
              type="tel"
              placeholder="Ingresar celular"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              className="border p-2 text-sm flex-1"
            />
            <button onClick={handleEnviar} className="bg-black text-white px-4 py-2 text-sm">
              Enviar
            </button>
          </div>
        </div>

        {/* Columna derecha */}
        <div className=" w-[260px] mb-4 pl-0 md:pl-4 flex flex-col justify-center items-center">
          <div className="text-sm mb-2">
            Escanea el QR y págalo
            <br />
            desde tu billetera favorita*
          </div>

          {/* QR Code */}
          <div className="mb-4">
            <img src="./Img/qr.jpg" alt="QR Code" className="w-40 h-40" />
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            <div className="bg-[#8B1FA9] text-white px-3 py-1 text-xs rounded">Yape</div>
            <div className="bg-[#00B9E2] text-white px-3 py-1 text-xs rounded">Plin</div>
            <div className="bg-[#0073CE] text-white px-3 py-1 text-xs rounded">Tunki</div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="bg-[#FFBF00] text-black px-3 py-1 text-xs rounded">BIM</div>
            <div className="bg-[#4CAF50] text-white px-3 py-1 text-xs rounded">Lukita</div>
            <div className="bg-[#F44336] text-white px-3 py-1 text-xs rounded">Agora</div>
          </div>

          <div className="text-xs text-gray-500 mt-2">
            *Recuerda habilitar tu tarjeta
            <br />
            para compras por internet.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 mb-4">
        <div className="text-center font-medium mb-2">Puedes pagar en:</div>
        <div className="flex flex-wrap justify-center gap-2">
          <div className="bg-[#0033A0] text-white px-3 py-1 text-sm rounded">BBVA</div>
          <div className="bg-[#005BAC] text-white px-3 py-1 text-sm rounded">BCP</div>
          <div className="bg-[#2E8B57] text-white px-3 py-1 text-sm rounded">Interbank</div>
          <div className="bg-[#CC0000] text-white px-3 py-1 text-sm rounded">Scotiabank</div>
          <div className="bg-[#F8B400] text-black px-3 py-1 text-sm rounded">Caja</div>
          <div className="bg-[#6E00FF] text-white px-3 py-1 text-sm rounded">Niubiz</div>
        </div>
      </div>
    </div>
  );
};

export default InformacionPagoEfectivo;
