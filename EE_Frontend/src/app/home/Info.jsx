import React from 'react';
import Card from './Card';

const Info = () => {
  return (
    <section className="w-full px-4 py-10 md:px-8 lg:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card
          url="bambu.jpg"
          titule="Materiales Sostenibles"
          context="Todos nuestros productos están fabricados con materiales 100% sostenibles, biodegradables o reciclados. Desde bambú y algodón orgánico hasta plásticos recuperados de los océanos, cada material es cuidadosamente seleccionado para minimizar nuestro impacto ambiental."
        />
        <Card
          url="ProduccionEtica.jpg"
          titule="Producción Ética"
          context="Trabajamos exclusivamente con fabricantes que garantizan condiciones laborales justas y dignas. Creemos en un comercio justo donde cada persona en la cadena de producción reciba una compensación adecuada por su trabajo, creando un ciclo de bienestar para todos."
        />
        <Card
          url="EmpaquesEcoAmigables.jpg"
          titule="Empaques Eco amigables"
          context="Nos comprometemos a reducir los residuos al mínimo utilizando empaques compostables, biodegradables o reutilizables. Nuestro objetivo es eliminar el plástico de un solo uso de toda nuestra cadena de distribución, contribuyendo a la reducción de la contaminación global."
        />
        <Card
          url="HuellaDeCarbono.jpg"
          titule="Huella de Carbono Reducida"
          context="Calculamos y compensamos la huella de carbono de cada producto, desde su fabricación hasta la entrega en tu hogar. Por cada compra, plantamos árboles a través de nuestros socios forestales y financiamos proyectos de energía renovable para contrarrestar las emisiones."
        />
      </div>
    </section>
  );
};

export default Info;
