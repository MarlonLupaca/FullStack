import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-text pt-6 sm:pt-8 lg:pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-6 sm:pb-8 lg:pb-10 border-b border-secondary">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">Sobre Verde Raíz</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Productos Ecológicos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Sostenibilidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Ofertas Ecológicas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Nuestra misión verde
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">Categorías</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Alimentos orgánicos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Cosmética natural
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Limpieza ecológica
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Ropa sostenible
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Reutilizables
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Huertos urbanos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">Ayuda</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contáctanos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Blog ecológico
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-start lg:items-center">
            <button className="border border-primary text-primary hover:bg-primary hover:text-white px-3 sm:px-4 py-2 text-sm rounded-md w-fit transition-all duration-200 mb-4">
              Únete a nuestro equipo verde
            </button>
            <div className="flex space-x-3 text-white">
              <a
                className="bg-primary rounded-full p-2 hover:bg-hover-text transition-colors duration-200"
                href="#"
                aria-label="Facebook"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                className="bg-primary rounded-full p-2 hover:bg-hover-text transition-colors duration-200"
                href="#"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
              <a
                className="bg-primary rounded-full p-2 hover:bg-hover-text transition-colors duration-200"
                href="#"
                aria-label="YouTube"
              >
                <FaYoutube size={16} />
              </a>
              <a
                className="bg-primary rounded-full p-2 hover:bg-hover-text transition-colors duration-200"
                href="#"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm py-4 text-gray-600">
          ©2025 Verde Raíz - Grupo 8. Vivamos sosteniblemente 🌱
        </div>
      </div>
    </footer>
  );
};

export default Footer;
