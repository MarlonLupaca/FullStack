import API_BASE_URL from '../config/apiConfig';

const ResumenCompra = ({ productos, subtotal, envio, total }) => {
  return (
    <div className="w-full bg-gray-50 p-4 sm:p-6 md:p-8 px-4 sm:px-6 md:px-10 rounded-lg mb-6 md:mb-0 flex flex-col justify-between">
      <div className="flex-1">
        <span className="text-lg sm:text-xl font-bold mb-4 block">Resumen de compra</span>
        <div className="space-y-3 sm:space-y-4 mb-6 h-[35vh] sm:h-[38vh] md:h-[41vh] overflow-y-auto pr-2 sm:pr-4">
          {productos.map((producto) => {
            return (
              <div key={producto.code} className="flex items-center space-x-2 sm:space-x-3">
                <img
                  src={`${API_BASE_URL}${producto.imageUrl}`}
                  className="bg-gray-200 rounded-md w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 object-cover"
                  alt={producto.name}
                />
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-sm sm:text-base truncate">{producto.name}</h3>
                  <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                    <span>Cant: {producto.quantity}</span>
                    <span>S/. {producto.price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2 flex-shrink-0">
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-gray-600">Subtotal</span>
          <span>S/. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-gray-600">Envío</span>
          <span>S/. {envio.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold pt-2 border-t border-gray-200 text-sm sm:text-base">
          <span>Total</span>
          <span>S/. {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResumenCompra;
