const ProgressBar = ({ paso, onPasoChange }) => {
  return (
    <div className="mb-12 pt-4">
      <div className="flex justify-center items-center">
        <div className="relative w-full max-w-2xl flex justify-between">
          {/* Línea de progreso */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
            <div
              className="h-0.5 bg-teal-600 transition-all duration-300 "
              style={{ width: paso === 1 ? '0%' : paso === 2 ? '50%' : '100%' }}
            ></div>
          </div>

          {/* Paso 1: Dirección */}
          <div className="z-10 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                paso >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}
              onClick={() => onPasoChange(1)}
            >
              {paso > 1 ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                <span>1</span>
              )}
            </div>
            <span className={`mt-2 text-sm font-medium ${paso >= 1 ? 'text-teal-600' : 'text-gray-400'}`}>
              Dirección
            </span>
          </div>

          {/* Paso 2: Pago */}
          <div className="z-10 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                paso >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}
              onClick={() => (paso >= 1 ? onPasoChange(2) : null)}
            >
              {paso > 2 ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                <span>2</span>
              )}
            </div>
            <span className={`mt-2 text-sm font-medium ${paso >= 2 ? 'text-teal-600' : 'text-gray-400'}`}>Pago</span>
          </div>

          {/* Paso 3: Confirmar */}
          <div className="z-10 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                paso >= 3 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}
              onClick={() => (paso >= 2 ? onPasoChange(3) : null)}
            >
              <span>3</span>
            </div>
            <span className={`mt-2 text-sm font-medium ${paso >= 3 ? 'text-teal-600' : 'text-gray-400'}`}>
              Confirmar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
