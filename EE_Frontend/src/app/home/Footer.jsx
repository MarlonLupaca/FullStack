import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-text pt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-10 border-b border-secondary">
        <div>
          <h2 className="text-lg font-semibold text-primary mb-4">Sobre Verde Raíz</h2>
          <ul className="space-y-2 text-sm">
            <li>Productos Ecologicos</li>
            <li>Sostenibilidad</li>
            <li>Ofertas Ecologicas</li>
            <li>Nuestra misión verde</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-primary mb-4">Categorías</h2>
          <ul className="space-y-2 text-sm">
            <li>Alimentos orgánicos</li>
            <li>Cosmética natural</li>
            <li>Limpieza ecológica</li>
            <li>Ropa sostenible</li>
            <li>Reutilizables</li>
            <li>Huertos urbanos</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-primary mb-4">Ayuda</h2>
          <ul className="space-y-2 text-sm">
            <li>Preguntas frecuentes</li>
            <li>Contáctanos</li>
            <li>Blog ecológico</li>
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <button className="border border-primary text-primary hover:text-hover-text px-4 py-2 text-sm rounded-md w-fit transition cursor-pointer">
            Únete a nuestro equipo verde
          </button>
          <div className="flex space-x-4 mt-4 text-white">
            <a className="bg-primary rounded-full p-2 hover:bg-hover-text" href="#">
              <FaFacebookF size={16} />
            </a>
            <a className="bg-primary rounded-full p-2 hover:bg-hover-text" href="#">
              <FaInstagram size={16} />
            </a>
            <a className="bg-primary rounded-full p-2 hover:bg-hover-text" href="#">
              <FaYoutube size={16} />
            </a>
            <a className="bg-primary rounded-full p-2 hover:bg-hover-text" href="#">
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm py-4 text-gray-600">
        ©2025 Verde Raíz - Grupo 8. Vivamos sosteniblemente 🌱
      </div>
    </footer>
  );
};

export default Footer;
