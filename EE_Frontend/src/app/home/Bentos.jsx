import React from 'react';

const Bentos = () => {
  return (
    <section className="h-auto lg:h-[88vh] max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 grid-rows-none lg:grid-rows-6 gap-4 md:gap-6 h-full text-white px-1">
        <div className="lg:col-span-4 col-span-1 row-span-3 lg:row-span-4 bg-[url('/Img/Ecologia.jpg')] bg-cover bg-center rounded-lg relative transition-transform duration-500 hover:scale-[1.02] min-h-[300px] sm:min-h-[350px] lg:h-auto flex items-center justify-center">
          <div className="z-10 absolute inset-0 bg-gradient-to-r from-black to-transparent rounded-lg opacity-70"></div>
          <div className="z-20 relative p-4 text-start px-10">
            <p className="text-white text-[2rem] xs:text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] leading-tight">
              Transforma tu <span className="text-orange-200 font-semibold">vida</span> con productos{' '}
              <span className="text-pink-200 font-semibold">100% ecológicos</span>
            </p>
          </div>
        </div>

        <div className="col-span-1 row-span-2 lg:col-span-2 lg:col-start-1 bg-[#DDD9DF] lg:row-start-5 rounded-lg overflow-hidden lg:min-h-[180px] relative transition-transform duration-500 hover:scale-[1.03] min-h-[200px] bg-[url('/Img/Bote.png')] bg-contain bg-no-repeat bg-center flex items-center">
          <div className="z-10 absolute inset-0 bg-gradient-to-r from-black to-transparent rounded-lg opacity-85"></div>
          <div className="z-20 relative p-4 w-full text-start px-10 lg:mb-10">
            <p className="text-[1.8rem] sm:text-base lg:text-[1.2rem] leading-tight">
              Tu <span className="text-orange-200 font-medium">estilo de vida</span> también puede{' '}
              <span className="text-pink-200 font-medium">salvar el planeta</span>.
            </p>
          </div>
        </div>

        <div className="relative row-span-2 lg:row-span-3 lg:col-start-5 lg:row-start-1 rounded-lg bg-[url('/Img/plastico.jpg')] bg-cover bg-no-repeat bg-center transition-transform duration-500 hover:scale-[1.03] min-h-[430px] sm:min-h-[250px] flex items-start justify-center">
          <div className="z-10 absolute inset-0 bg-gradient-to-b from-black to-transparent rounded-lg opacity-70"></div>
          <div className="relative z-20 p-4 text-center mt-10 lg:mt-5 px-10">
            <p className="text-[1.8rem] sm:text-base lg:text-[1.1rem] leading-tight px-10S">
              Cada producto <span className="text-pink-200 font-medium">reutiliza</span> hasta{' '}
              <span className="text-orange-200 font-semibold">12 botellas</span> de plástico.
            </p>
          </div>
        </div>

        <div className="relative row-span-3 lg:row-span-3 lg:col-start-5 lg:row-start-4 bg-[#DFCBB5] rounded-lg bg-[url('/Img/BotellaEcologica.png')] bg-center bg-contain bg-no-repeat flex items-end justify-center transition-transform duration-500 hover:scale-[1.03] min-h-[400px] sm:min-h-[250px]">
          <div className="z-10 absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-lg opacity-85"></div>
          <div className="relative z-20 p-4 text-center mb-12 lg:mb-6 px-10">
            <p className="text-[1.8rem] sm:text-base lg:text-[1.1rem] leading-tight">
              Elige entre una <span className="text-orange-200 font-medium">gran variedad</span> de productos{' '}
              <span className="text-pink-200 font-medium">sostenibles</span>.
            </p>
          </div>
        </div>

        <div className="relative col-span-1 lg:col-span-2 row-span-2 lg:col-start-3 lg:row-start-5 rounded-lg bg-[url('/Img/ProductosEcologicos2.png')] bg-cover flex items-end justify-center transition-transform duration-500 lg:min-h-[180px] hover:scale-[1.03] min-h-[200px] h-full ">
          <div className="z-10 absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-lg opacity-85"></div>
          <div className="relative z-20 p-4 w-full text-center mb-3 px-10">
            <p className="text-[1.8rem] sm:text-base lg:text-[1.2rem] leading-tight">
              Tu <span className="text-pink-200 font-medium">rutina</span>, ahora más{' '}
              <span className="text-orange-200 font-medium">ecológica</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bentos;
