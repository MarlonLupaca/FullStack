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
    <div className="px-2 sm:px-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 border-b pb-2">Dirección de envío</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Dirección *</label>
          <input
            name="calle"
            value={direccion.calle}
            onChange={handleChange}
            placeholder="Av./Jr./Calle, número, interior"
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm sm:text-base"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Distrito *</label>
          <input
            name="distrito"
            value={direccion.distrito}
            onChange={handleChange}
            placeholder="Ej: Surco"
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm sm:text-base"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Provincia *</label>
          <input
            name="provincia"
            value={direccion.provincia}
            onChange={handleChange}
            placeholder="Ej: Lima"
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm sm:text-base"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Región *</label>
          <select
            name="region"
            value={direccion.region}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white text-sm sm:text-base"
          >
            {regiones.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Código Postal</label>
          <input
            name="codigoPostal"
            value={direccion.codigoPostal}
            onChange={handleChange}
            placeholder="Opcional"
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm sm:text-base"
          />
        </div>

        <div className="col-span-1 sm:col-span-2 flex justify-center sm:justify-end mt-4 sm:mt-6">
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto bg-teal-600 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg font-medium hover:bg-teal-700 transition duration-200 text-sm sm:text-base"
          >
            Continuar al pago
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioDireccion;
