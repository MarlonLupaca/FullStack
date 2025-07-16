import { useState, useEffect } from 'react';

const FormularioTarjetaCredito = ({ formularioTarjeta: initialTarjeta, onTarjetaChange }) => {
  const [formularioTarjeta, setFormularioTarjeta] = useState(initialTarjeta);

  useEffect(() => {
    setFormularioTarjeta(initialTarjeta);
  }, [initialTarjeta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formularioTarjeta, [name]: value };
    setFormularioTarjeta(updated);
    onTarjetaChange(updated);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200 w-[580px] m-auto mb-6">
      <p className="text-xl font-bold text-teal-700 mb-6 border-b pb-2">Detalles de la tarjeta</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Número de tarjeta</label>
          <input
            type="text"
            name="numero"
            value={formularioTarjeta.numero}
            onChange={handleChange}
            placeholder="•••• •••• •••• ••••"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre en la tarjeta</label>
          <input
            type="text"
            name="nombre"
            value={formularioTarjeta.nombre}
            onChange={handleChange}
            placeholder="Nombre completo"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de expiración</label>
            <input
              type="text"
              name="fechaExp"
              value={formularioTarjeta.fechaExp}
              onChange={handleChange}
              placeholder="MM/AA"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
            <input
              type="text"
              name="cvv"
              value={formularioTarjeta.cvv}
              onChange={handleChange}
              placeholder="123"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioTarjetaCredito;
