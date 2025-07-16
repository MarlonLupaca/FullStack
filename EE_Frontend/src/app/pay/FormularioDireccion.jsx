import { useState } from 'react';

const FormularioDireccion = ({ direccion: initialDireccion = {}, onDireccionChange = () => {}, onNext = () => {} }) => {
  const valoresIniciales = {
    calle: '',
    distrito: '',
    provincia: '',
    region: 'Lima',
    codigoPostal: '',
    ...initialDireccion,
  };

  const [direccion, setDireccion] = useState(valoresIniciales);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedDireccion = { ...direccion, [name]: value };
    setDireccion(updatedDireccion);
    onDireccionChange(updatedDireccion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const regiones = [
    'Amazonas',
    'Áncash',
    'Apurímac',
    'Arequipa',
    'Ayacucho',
    'Cajamarca',
    'Callao',
    'Cusco',
    'Huancavelica',
    'Huánuco',
    'Ica',
    'Junín',
    'La Libertad',
    'Lambayeque',
    'Lima',
    'Loreto',
    'Madre de Dios',
    'Moquegua',
    'Pasco',
    'Piura',
    'Puno',
    'San Martín',
    'Tacna',
    'Tumbes',
    'Ucayali',
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Dirección de envío</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
          <input
            name="calle"
            value={direccion.calle}
            onChange={handleChange}
            placeholder="Av./Jr./Calle, número, interior"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Distrito</label>
          <input
            name="distrito"
            value={direccion.distrito}
            onChange={handleChange}
            placeholder="Ej: Surco"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
          <input
            name="provincia"
            value={direccion.provincia}
            onChange={handleChange}
            placeholder="Ej: Lima"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Región</label>
          <select
            name="region"
            value={direccion.region}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white"
          >
            {regiones.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
          <input
            name="codigoPostal"
            value={direccion.codigoPostal}
            onChange={handleChange}
            placeholder="Opcional"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        <div className="col-span-2 flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="bg-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-teal-700 transition"
          >
            Continuar al pago
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioDireccion;
