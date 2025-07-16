import React from 'react';
import { Montserrat_Alternates } from 'next/font/google';
import { Heart, Users, Target, Award, Lightbulb, Globe, ChevronDown, Package } from 'lucide-react';
import SectionTitle from './common/SectionTitle';
import ContentSection from './common/ContentSection';
import Timeline from './timeline/Timeline';
import Footer from '../home/Footer';

const montserrat = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const UsContent = () => {
  const timelineData = [
    {
      year: '2018',
      title: 'Nacimiento de EcoVida',
      description: 'Fundamos EcoVida con una línea de productos de limpieza reutilizables.',
    },
    {
      year: '2019',
      title: 'Primera tienda física',
      description: 'Abrimos nuestra primera tienda física en Arequipa.',
    },
    {
      year: '2020',
      title: 'Tienda online',
      description: 'Lanzamos nuestra tienda online y duplicamos nuestras ventas.',
    },
    {
      year: '2022',
      title: 'Producción sostenible',
      description: 'Integramos materiales reciclados en el 80% de nuestros productos.',
    },
    {
      year: '2024',
      title: 'Reconocimiento nacional',
      description: 'Somos reconocidos como una de las startups más verdes del país.',
    },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Cuidado Familiar',
      description: 'Productos pensados para el bienestar de toda la familia en el hogar',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Resp. Social',
      description: 'Apoyo activo a comuni. locales y proyectos de desarrollo social',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Calidad y Confianza',
      description: 'Compromiso con la excelencia en cada producto que ofrecemos',
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovación',
      description: 'Desarrollo constante de soluciones para mejorar la vida cotidiana',
    },
  ];

  const stats = [
    { number: '6', label: 'Años de experiencia', icon: <Award className="w-6 h-6" /> },
    { number: '500+', label: 'Productos disponibles', icon: <Package className="w-6 h-6" /> },
    { number: '2000+', label: 'Familias satisfechas', icon: <Users className="w-6 h-6" /> },
    { number: '3', label: 'Ciudades de presencia', icon: <Globe className="w-6 h-6" /> },
  ];

  return (
    <div className={`${montserrat.className} text-gray-800 font-sans min-h-screen`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-transparent"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 opacity-20">
          <div className="w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
        </div>
        <div className="absolute bottom-10 left-10 opacity-20">
          <div className="w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              <Heart className="w-4 h-4" />
              <span>Cuidando hogares, fortaleciendo familias</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">
              Sobre Nosotros
            </h1>

            <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              Más que una empresa, somos una comunidad comprometida con el cuidado del hogar y la familia
            </p>

            <div className="flex justify-center pt-8">
              <ChevronDown className="w-8 h-8 animate-bounce text-teal-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-10">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl text-white mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-20 space-y-20">
        {/* Historia Section */}
        <div className="relative">
          <ContentSection
            title="Nuestra Historia"
            imageComponent={
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="./Img/Crecer.png"
                    alt="Nuestro propósito ecológico"
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            }
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">El Comienzo de Todo</h2>
              </div>

              <div className="prose prose-lg text-gray-700 leading-relaxed space-y-4">
                <p className="text-lg">
                  <span className="text-teal-600 font-semibold">EcoVida surgió en 2018</span> impulsada por una visión
                  clara: ofrecer productos de calidad que mejoren la vida cotidiana de las familias, comenzando por
                  transformar los hábitos de cuidado del hogar.
                </p>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-teal-500">
                  <p>
                    Lo que inicialmente fue una modesta tienda ubicada en un pequeño local de Lima, dedicada a productos
                    para el hogar, pronto se convirtió en el punto de partida de una{' '}
                    <span className="font-semibold text-teal-700">empresa familiar comprometida</span> con el bienestar
                    de sus clientes.
                  </p>
                </div>

                <p>
                  Motivados por el deseo de ofrecer alternativas de calidad para el cuidado del hogar, un grupo de
                  emprendedores decidió expandir el concepto más allá del comercio tradicional. Así nació EcoVida como
                  una <span className="font-semibold text-teal-600">empresa comprometida con la familia</span>, enfocada
                  en brindar productos confiables y de alta calidad para cada necesidad del hogar.
                </p>
              </div>
            </div>
          </ContentSection>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestro Recorrido</h2>
            <p className="text-xl text-gray-600">Cada año nos acerca más a nuestro objetivo</p>
          </div>
          <Timeline events={timelineData} />
        </div>

        {/* Values Section */}
        <div className="relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Valores</h2>
            <p className="text-xl text-gray-600">Los principios que guían cada una de nuestras acciones</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8  shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Creencias Section */}
        <ContentSection
          title="Lo que creemos"
          imageLeft
          imageComponent={
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500 rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="./Img/Dar.jpg"
                  alt="Productos sostenibles"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          }
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Nuestras Convicciones</h2>
            </div>

            <div className="bg-white rounded-2xl p-8 border-l-4 border-teal-500">
              <p className="text-lg text-gray-700 leading-relaxed">
                En EcoVida estamos convencidos de que{' '}
                <span className="font-semibold text-teal-600">
                  el verdadero cuidado del hogar empieza con productos de confianza
                </span>
                , que brinden tranquilidad y calidad a las familias. Creemos que cada elección consciente en el hogar,
                desde elegir productos seguros hasta mantener espacios limpios y organizados, contribuye al bienestar
                familiar.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Nos motiva profundamente la idea de que es posible{' '}
              <span className="font-semibold text-teal-600">cuidar a nuestras familias</span> sin comprometer la
              calidad, la seguridad ni la eficacia. Nos inspiran aquellas personas que buscan lo mejor para sus hogares,
              tomando decisiones que reflejan un compromiso real con el bienestar y la comodidad de sus seres queridos.
            </p>
          </div>
        </ContentSection>

        {/* Compromiso Section */}
        <div className="relative">
          <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl transform -translate-x-24 translate-y-24"></div>

            <div className="relative text-center max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Users className="w-6 h-6" />
                <span className="font-semibold">Nuestro Compromiso</span>
              </div>

              <h2 className="text-4xl font-bold mb-8">Más allá de los productos</h2>

              <div className="text-lg leading-relaxed space-y-6 text-teal-50">
                <p>
                  En EcoVida, asumimos un{' '}
                  <span className="font-semibold text-white">
                    compromiso firme con la calidad, la responsabilidad social y el servicio al cliente
                  </span>{' '}
                  como pilares fundamentales de nuestra misión. No solo ofrecemos productos para el hogar, sino que
                  también contribuimos activamente con programas de apoyo comunitario y proyectos de desarrollo local.
                </p>

                <p>
                  Colaboramos con proveedores locales y apoyamos iniciativas que beneficien a las comunidades donde
                  operamos. Creemos que{' '}
                  <span className="font-semibold text-white">
                    el éxito empresarial va de la mano con la responsabilidad social
                  </span>
                  , por eso trabajamos día a día para generar un impacto positivo que fortalezca el tejido social de
                  nuestras comunidades.
                </p>
              </div>

              <div className="flex justify-center pt-6">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  <span>Compromiso real, impacto duradero</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UsContent;
