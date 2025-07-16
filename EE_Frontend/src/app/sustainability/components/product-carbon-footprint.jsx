'use client';

import { ProductCarbonCard } from './product-carbon-card';

const ECO_PRODUCTS = [
  {
    name: 'Botella de Bambú Eco-friendly',
    image: './Img/producto1.jpg',
    carbonFootprint: 12,
    savings: 45,
  },
  {
    name: 'Cepillos de Dientes de Bambú (Pack x4)',
    image: './Img/producto2.jpg',
    carbonFootprint: 8,
    savings: 60,
  },
  {
    name: 'Set de Bolsas Reutilizables para Compras',
    image: './Img/producto3.jpg',
    carbonFootprint: 15,
    savings: 35,
  },
  {
    name: 'Papel Higiénico de Bambú (12 rollos)',
    image: './Img/producto4.jpg',
    carbonFootprint: 10,
    savings: 50,
  },
];

export default function ProductCarbonFootprint() {
  return (
    <div className="container mx-auto  px-25">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-center mb-14 text-teal-800 drop-shadow-lg tracking-tight">
          Huellas de Carbono de Nuestros Productos
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubre cómo nuestros productos ayudan a reducir la huella de carbono y contribuyen a un futuro más
          sostenible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {ECO_PRODUCTS.map((product, index) => (
          <ProductCarbonCard
            key={index}
            name={product.name}
            image={product.image}
            carbonFootprint={product.carbonFootprint}
            savings={product.savings}
          />
        ))}
      </div>
    </div>
  );
}
