import API_BASE_URL from '../config/apiConfig';

const ResumenCompra = ({ productos, subtotal, envio, total }) => {
  return (
    <div className="md:w-2/5 bg-gray-50 p-8 px-10 rounded-lg mb-6 md:mb-0 flex flex-col justify-between">
      <div className="h-3/4">
        <span className="text-xl font-bold mb-4 block">Resumen de compra</span>
        <div className="space-y-4 mb-6 h-[41vh] overflow-y-auto pr-4 ">
          {productos.map((producto) => {
            return (
              <div key={producto.code} className="flex items-center space-x-3">
                <img
                  src={`${API_BASE_URL}${producto.imageUrl}`}
                  className="bg-gray-200 rounded-md w-12 h-12 flex-shrink-0"
                  alt={producto.name}
                />
                <div className="flex-grow">
                  <h3 className="font-medium">{producto.name}</h3>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Cant: {producto.quantity}</span>
                    <span>S/. {producto.price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2 h-1/4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>S/. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Envío</span>
          <span>S/. {envio.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>S/. {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResumenCompra;
