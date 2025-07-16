const SUPPLIERS = [
  {
    name: 'Algodonera Andina',
    country: 'Perú',
    material: 'Algodón Orgánico',
    practices: 'Cultivo sin pesticidas, riego eficiente, apoyo a comunidades locales',
  },
  {
    name: 'ReciclaPlast Sur',
    country: 'Chile',
    material: 'Poliéster Reciclado',
    practices: 'Recolección de botellas post-consumo, energía renovable, economía circular',
  },
  {
    name: 'Cooperativa Lino Verde',
    country: 'Argentina',
    material: 'Lino Natural',
    practices: 'Rotación de cultivos, manejo responsable del agua, comercio justo',
  },
  {
    name: 'EcoFibras Amazonía',
    country: 'Perú',
    material: 'Fibras Naturales Amazónicas',
    practices: 'Recolección sostenible, conservación de la biodiversidad, empleo local',
  },
  {
    name: 'Plásticos Renova',
    country: 'Colombia',
    material: 'Poliéster Reciclado',
    practices: 'Reciclaje de redes de pesca, reducción de emisiones, inclusión social',
  },
  {
    name: 'HempLatam',
    country: 'Uruguay',
    material: 'Cáñamo Natural',
    practices: 'Agricultura regenerativa, sin agroquímicos, apoyo a pequeños productores',
  },
];

export default function MaterialSuppliers() {
  return (
    <section className="py-16 px-15">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-14 text-teal-800 drop-shadow-lg tracking-tight">
          Proveedores &amp; Trazabilidad de Materiales
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Nos asociamos con proveedores responsables y transparentes en todo el mundo. Explora el origen de nuestros
          materiales y las prácticas sostenibles detrás de ellos.
        </p>
        <div className="overflow-x-auto rounded-3xl">
          <table className="min-w-[700px] w-full bg-gradient-to-br shadow-2xl rounded-3xl overflow-hidden border border-teal-200">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="py-4 px-6 text-left font-bold text-lg">Proveedor</th>
                <th className="py-4 px-6 text-left font-bold text-lg">País de Origen</th>
                <th className="py-4 px-6 text-left font-bold text-lg">Material</th>
                <th className="py-4 px-6 text-left font-bold text-lg">Prácticas &amp; Certificaciones</th>
              </tr>
            </thead>
            <tbody>
              {SUPPLIERS.map((supplier, i) => (
                <tr
                  key={i}
                  className={`transition-colors duration-200 hover:bg-teal-200/80 ${
                    i % 2 === 1 ? 'bg-teal-100/60' : 'bg-white'
                  }`}
                >
                  <td className="py-3 px-6 font-semibold flex items-center gap-2 text-teal-900">
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-500"></span>
                    {supplier.name}
                  </td>
                  <td className="py-3 px-6 text-teal-800">{supplier.country}</td>
                  <td className="py-3 px-6">
                    <span className="inline-block bg-teal-200 text-teal-900 px-2 py-1 rounded-full text-xs font-semibold shadow">
                      {supplier.material}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-gray-800">{supplier.practices}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4 text-center">
          * Todos los proveedores son auditados anualmente por estándares ambientales y éticos.
        </p>
      </div>
    </section>
  );
}
