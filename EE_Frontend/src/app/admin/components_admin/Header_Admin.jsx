'use client';

import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiLogOut } from 'react-icons/fi';
import { HiOutlineUserCircle, HiOutlineCog } from 'react-icons/hi';

const Header_Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userCode, setUserCode] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const role = decoded.role || '';

      const allowedRoles = ['ROLE_ADMIN', 'ROLE_EMPLOYEE'];
      if (!allowedRoles.includes(role)) {
        window.location.href = '/login';
        return;
      }

      setUserName(decoded.sub || '');
      setUserRole(role);
      setUserCode(decoded.userCode || '');
    } catch (error) {
      console.error('Error al decodificar token:', error);
      window.location.href = '/login';
    }
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-2xl h-[10vh]">
      <div className="px-4 md:px-10 flex justify-between items-center h-full flex-wrap gap-y-2">
        {/* Panel Administrativo - Solo visible en pantallas md+ */}
        <div className="hidden md:flex items-center space-x-3">
          <p className="text-lg md:text-xl font-bold text-gray-800">Panel Administrativo</p>
        </div>

        <div className="flex items-center space-x-4 md:space-x-10 text-black ml-auto">
          {/* Buscador - Solo visible en pantallas lg+ */}
          <div className="hidden lg:block relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-9 pr-4 py-2 rounded-lg border text-[15px] w-[25vw] border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#40a99b] focus:border-transparent"
            />
            <div className="absolute left-2 top-2.5 text-gray-400">
              <FiSearch className="h-5 w-5" />
            </div>
          </div>

          {/* Usuario + Dropdown */}
          <div className="relative h-[10vh] bg-[url(/back/patternb.svg)] px-2 flex" ref={dropdownRef}>
            <div
              className="flex items-center px-4 md:px-5 space-x-4 cursor-pointer transition-colors duration-200"
              onClick={toggleDropdown}
            >
              <Image width={40} height={40} src="/Img/usuario.jpg" alt="Avatar" className="h-10 w-10 rounded-full" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">{userName}</span>
                <span className="text-[12px] font-medium text-gray-600">ID: {userCode}</span>
              </div>
            </div>

            {isOpen && (
              <div className="absolute right-0 top-[89%] mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-3 border-b border-gray-100 select-none">
                  <p className="text-sm font-medium text-primary">¡Bienvenido, {userName}!</p>
                </div>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                >
                  <HiOutlineUserCircle className="h-5 w-5 mr-3 text-gray-400" />
                  Mi Cuenta
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                >
                  <HiOutlineCog className="h-5 w-5 mr-3 text-gray-400" />
                  Configuración
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                >
                  <FiLogOut className="h-5 w-5 mr-3 text-gray-400" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header_Admin;
