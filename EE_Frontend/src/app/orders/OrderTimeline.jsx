import React from 'react';
import { Package, CheckCircle } from 'lucide-react';
import './OrderTimeline.css';

const OrderTimeline = ({ order }) => {
  const steps = [
    { name: 'Procesando', icon: Package, color: 'bg-teal-500' },
    { name: 'Entregado', icon: CheckCircle, color: 'bg-teal-500' },
  ];

  const currentStep = steps.findIndex((step) => step.name.toLowerCase() === order.estate.toLowerCase());

  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index <= currentStep;
        const isCurrent = index === currentStep;

        return (
          <React.Fragment key={step.name}>
            <div className="flex flex-col items-center z-10">
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 relative
                  ${isActive ? 'bg-teal-500 text-white scale-110 shadow-lg' : 'bg-gray-200 text-gray-400'}
                  ${isCurrent && order.estate === 'Procesando' ? 'animate-pulse' : ''}
                `}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className={`mt-2 text-sm font-medium ${isActive ? 'text-teal-600' : 'text-gray-400'}`}>
                {step.name}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 h-2 mx-4 bg-gray-200 rounded-full overflow-hidden relative">
                {/* Barra de progreso base */}
                <div
                  className={`
                    absolute top-0 left-0 h-full rounded-full transition-all duration-1000
                    ${
                      index < currentStep
                        ? 'w-full bg-teal-500'
                        : index === currentStep
                        ? 'bg-teal-500 progress-wave'
                        : 'w-0 bg-gray-200'
                    }
                  `}
                />
                {/* Animación de bucle deslizante */}
                {index === currentStep && order.estate === 'Procesando' && (
                  <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-teal-300 to-transparent rounded-full opacity-80 slide-bounce" />
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
