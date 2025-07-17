'use client';
import { FaArrowLeftLong } from 'react-icons/fa6';
import ProgressBar from './ProgressBar';
import ResumenCompra from './ResumenCompra';
import FormularioDireccion from './FormularioDireccion';
import SelectorMetodoPago from './SelectorMetodoPago';
import FormularioTarjetaCredito from './FormularioTarjetaCredito';
import InformacionPagoYape from './InformacionPagoYape';
import InformacionPagoPlin from './InformacionPagoPlin';
import ConfirmarPedido from './ConfirmarPedido';
import MensajeExitoPago from './MensajeExitoPago';
import { useProducts } from '../context/ProductContext';
import { useState } from 'react';
import Link from 'next/link';
import InformacionPagoEfectivo from './InformacionPagoEfectivo';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

const PasarelaPago = () => {
  const { products, clearCart } = useProducts();
  const [paso, setPaso] = useState(1);
  const [metodoPago, setMetodoPago] = useState('yape');
  const [formularioTarjeta, setFormularioTarjeta] = useState({ numero: '', nombre: '', fechaExp: '', cvv: '' });
  const [direccion, setDireccion] = useState({ calle: '', ciudad: '', codigoPostal: '', pais: '' });
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);
  const [numeroSerieFactura, setNumeroSerieFactura] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const subtotal = products.reduce((total, producto) => total + producto.price * producto.quantity, 0);
  const envio = 0;
  const total = subtotal + envio;

  const handleCambioPaso = (nuevoPaso) => {
    setPaso(nuevoPaso);
  };

  const handleCambioMetodoPago = (metodo) => {
    setMetodoPago(metodo);
  };

  const handleInputTarjeta = (data) => {
    setFormularioTarjeta(data);
  };

  const handleInputDireccion = (data) => {
    setDireccion(data);
  };

  const procesarPago = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    const token = localStorage.getItem('token');

    console.log('token: ' + token);

    if (!token) {
      router.push('/login');
      return;
    }

    let decoded;

    try {
      decoded = jwtDecode(token);
    } catch (err) {
      router.push('/login');
      return;
    }

    if (!decoded.userCode) {
      router.push('/login');
      return;
    }

    console.log(decoded);
    const shippingAddress = [
      direccion.calle,
      direccion.distrito,
      direccion.provincia,
      direccion.region,
      direccion.codigoPostal,
    ]
      .map((campo) => campo?.trim())
      .filter(Boolean)
      .join(', ');

    const invoicePayload = {
      customerCode: decoded.userCode,
      estate: 'procesando',
      shippingAddress,
      details: products.map((product) => ({
        productCode: product.code,
        quantity: product.quantity,
      })),
    };

    console.log(invoicePayload);
    try {
      const response = await axios.post(`${API_BASE_URL}/invoices`, invoicePayload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setNumeroSerieFactura(response.data.seriesNumber);
        clearCart();
        setExito(true);
      } else {
        setError('Hubo un problema al procesar tu pago. Por favor, inténtalo de nuevo.');
      }
    } catch (apiError) {
      setError('No se pudo conectar con el servidor. Verifica tu conexión e inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  if (exito) {
    return <MensajeExitoPago orderNumber={numeroSerieFactura} />;
  }

  return (
    <div className="fixed inset-0 bg-tertiary min-h-screen overflow-y-auto px-4 sm:px-6 lg:px-10">
      <div className="absolute top-0 left-0 w-[50px] h-[35px] flex justify-center items-center bg-teal-600 text-white text-[20px]">
        <Link href="/" className="p-1 px-3">
          <FaArrowLeftLong />
        </Link>
      </div>
      <div className="container mx-auto py-6 px-2 sm:px-4">
        <div className="flex flex-col h-full">
          <ProgressBar paso={paso} onPasoChange={handleCambioPaso} />
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-4">
            <div className="order-1 w-full lg:w-2/5">
              <ResumenCompra productos={products} subtotal={subtotal} envio={envio} total={total} />
            </div>
            <div className="order-2 w-full lg:w-3/5 bg-white p-4 sm:p-6 lg:p-8 xl:p-10 rounded-lg shadow-sm h-fit sm:h-[70vh] lg:h-[75vh] overflow-y-auto">
              {paso === 1 && (
                <FormularioDireccion
                  direccion={direccion}
                  onDireccionChange={handleInputDireccion}
                  onNext={() => handleCambioPaso(2)}
                />
              )}

              {paso === 2 && (
                <div className="space-y-4 flex flex-col justify-between h-full overflow-y-auto">
                  <div>
                    <SelectorMetodoPago metodoPago={metodoPago} onMetodoPagoChange={handleCambioMetodoPago} />
                    {metodoPago === 'tarjeta' && (
                      <FormularioTarjetaCredito
                        formularioTarjeta={formularioTarjeta}
                        onTarjetaChange={handleInputTarjeta}
                      />
                    )}
                    {metodoPago === 'yape' && <InformacionPagoYape />}
                    {metodoPago === 'plin' && <InformacionPagoPlin />}
                    {metodoPago === 'pagoefectivo' && <InformacionPagoEfectivo total={total} />}
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center sm:justify-end pr-0 sm:pr-10">
                    <button
                      onClick={() => handleCambioPaso(1)}
                      className="w-full sm:w-fit bg-gray-200 text-gray-800 py-2 px-6 rounded-lg font-medium hover:bg-gray-300 transition duration-200"
                    >
                      Atrás
                    </button>
                    <button
                      onClick={() => handleCambioPaso(3)}
                      className="w-full sm:w-fit bg-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-teal-700 transition duration-200"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}

              {paso === 3 && (
                <ConfirmarPedido
                  direccion={direccion}
                  metodoPago={metodoPago}
                  subtotal={subtotal}
                  envio={envio}
                  total={total}
                  formularioTarjeta={formularioTarjeta}
                  onBack={() => handleCambioPaso(2)}
                  onConfirm={procesarPago}
                  cargando={cargando}
                />
              )}

              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasarelaPago;
