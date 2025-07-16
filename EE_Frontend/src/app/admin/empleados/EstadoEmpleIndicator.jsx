import { Check, X } from 'lucide-react';

const EstadoClienteIndicator = ({ estado }) => {
  switch (estado) {
    case 'activo':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <Check className="h-3 w-3 mr-1" />
          Activo
        </span>
      );
    case 'inactivo':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <X className="h-3 w-3 mr-1" />
          Inactivo
        </span>
      );
    default:
      return null;
  }
};

export default EstadoClienteIndicator;
