import { CheckCircle, Truck, Clock, XCircle } from 'lucide-react';

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'entregado':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'enviado':
      return <Truck className="h-5 w-5 text-blue-500" />;
    case 'pendiente':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'cancelado':
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

export default StatusIcon;
