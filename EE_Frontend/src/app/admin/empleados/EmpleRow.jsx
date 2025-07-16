'use client';

import { useState } from 'react';
import { Eye, Edit, MailOpen, Phone, UserX } from 'lucide-react';
import EstadoEmpleIndicator from './EstadoEmpleIndicator';
import axios from 'axios';
import API_BASE_URL from '@/app/config/apiConfig';

const ClienteRow = ({ cliente, onEdit, fetchClientes }) => {
  const [toggleLoading, setToggleLoading] = useState(false);
  const [toggleError, setToggleError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleToggleActive = async () => {
    setToggleLoading(true);
    setToggleError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.put(`${API_BASE_URL}/auth/users/toggle/${cliente.usercode}`);

      if (response.status === 200) {
        const message = response.data;
        fetchClientes();

        const isNowActive = message.includes('activado');

        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(null), 3000);

        console.log('Operación exitosa:', message);
      } else {
        setToggleError(`Error al cambiar el estado del usuario: ${response.status}`);
      }
    } catch (error) {
      console.error('Error en toggle:', error);
      if (error.response) {
        // Error del servidor
        setToggleError(`Error del servidor: ${error.response.status} - ${error.response.data || error.message}`);
      } else if (error.request) {
        // Error de red
        setToggleError('Error de conexión. Verifica tu conexión a internet.');
      } else {
        // Otro tipo de error
        setToggleError(`Error: ${error.message}`);
      }
    } finally {
      setToggleLoading(false);
    }
  };

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(cliente); // Pasar el objeto cliente para la edición
    }
  };

  return (
    <tr key={cliente.usercode} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-600">{cliente.usercode}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{cliente.fullname}</div>
        {cliente.username && <div className="text-sm text-gray-500">@{cliente.username}</div>}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <MailOpen className="h-5 w-5 text-blue-500" />
          <span className="text-sm text-gray-700">{cliente.email}</span>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <Phone className="h-5 w-5 text-green-500" />
          <span className="text-sm text-gray-700">{cliente.phoneNumber}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cliente.registrationDate}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cliente.purchaseCount}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        S/. {cliente.totalSpent?.toFixed(2) || '0.00'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <EstadoEmpleIndicator estado={cliente.active ? 'activo' : 'inactivo'} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex justify-center items-center">
          <button onClick={handleEditClick} className="text-gray-600 hover:text-gray-800">
            <Edit className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ClienteRow;
