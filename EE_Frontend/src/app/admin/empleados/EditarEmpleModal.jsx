'use client';

import { useState, useEffect } from 'react';

const EditarClienteModal = ({ isOpen, onClose, client, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  });

  useEffect(() => {
    if (client) {
      setFormData({
        firstName: client.fullname ? client.fullname.split(' ')[0] || '' : '',
        lastName: client.fullname ? client.fullname.split(' ').slice(1).join(' ') || '' : '',
        phoneNumber: client.phoneNumber || '',
        address: client.address || '',
      });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate && client) {
      onUpdate(formData);
    }
  };

  if (!isOpen || !client) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-96">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Editar Empleado</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                Nombre:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                Apellido:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                Teléfono:
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                Dirección:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarClienteModal;
