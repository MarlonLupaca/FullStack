'use client';

import { Montserrat_Alternates } from 'next/font/google';
import { FaRegUser } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { CiCalendarDate } from 'react-icons/ci';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import CartSidebar from './Cart/CartSidebar';
import { useProducts } from '../context/ProductContext';
import EcoCalendar from './EcoCalendar/EcoCalendar';
import { LuCalendarRange } from 'react-icons/lu';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const montserrat = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3);
  const { products } = useProducts();
  const [calendar, setCalendar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const [user, setUser] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        console.log(decoded);
        setUser(decoded.sub);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        setUser('');
      }
    }
  }, []);

  const toggleCalendar = () => setCalendar(!calendar);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    setToken(null);
    setUser('');
    setIsUserMenuOpen(false);
  };

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuRef]);

  return (
    <>
      <header className="w-full bg-white shadow-md z-[80] relative">
        <div className="flex items-center justify-between px-6 py-4 md:px-10">
          {/* Logo */}
          <div className={`${montserrat.className} text-text font-[500] text-[26px]`}>
            <Link href="/">
              <Image
                width={500}
                height={500}
                src="/Img/logo_header.png"
                alt="logo root green"
                className="h-[50px] w-auto"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex">
            <ul className={`${montserrat.className} font-[600] text-text text-[16px] tracking-wide flex gap-6`}>
              <li className="hover:text-hover-text transition duration-200">
                <Link href="/products">Productos</Link>
              </li>
              <li className="hover:text-hover-text transition duration-200">
                <Link href="/sustainability">Sostenibilidad</Link>
              </li>
              <li className="hover:text-hover-text transition duration-200">
                <Link href="/blog">Blog</Link>
              </li>
              <li className="hover:text-hover-text transition duration-200">
                <Link href="/us">Nosotros</Link>
              </li>
            </ul>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-6 justify-center">
            {/* Calendar */}
            <div className="relative flex">
              <button onClick={toggleCalendar} className="cursor-pointer text-[27px] text-black hover:text-hover-text">
                <LuCalendarRange />
              </button>
              {calendar && (
                <div className="absolute right-[-125px] top-[100%] z-[200]">
                  <EcoCalendar />
                </div>
              )}
            </div>

            {/* User */}
            <div className="relative hidden sm:block" ref={userMenuRef}>
              <button
                onClick={toggleUserMenu}
                className="flex items-center gap-2 cursor-pointer text-text hover:text-hover-text"
              >
                <FaRegUser className="text-[25px]" />
                <span className={`${montserrat.className} text-[16px] font-semibold`}>
                  {token === null ? 'Login' : user}
                </span>
              </button>
              {isUserMenuOpen && token && (
                <div className="absolute right-0 top-[100%] mt-2 bg-white shadow-md rounded-md z-50 w-32">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100 transition duration-150">
                      <button onClick={handleLogout} className={`text-sm text-gray-700 w-full text-left text-nowrap`}>
                        Cerrar Sesión
                      </button>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 transition duration-150">
                      <button className={`text-sm text-gray-700 w-full text-left`}>
                        <Link href="/orders">Ver pedidos</Link>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
              {!token && (
                <Link href="/login" className=" absolute inset-0 flex items-center justify-center w-full h-full">
                  <span className="sr-only">Ir a Login</span>
                </Link>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="cursor-pointer relative text-white bg-primary/80 p-2 rounded-full text-[22px] hover:scale-105 transition"
            >
              <IoCartOutline />
              {products.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#fa4646] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {products.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button onClick={toggleMenu} className="text-[26px] text-black md:hidden" aria-label="Menú">
              {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav - Ahora posicionado absolutamente */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md z-50">
            <ul className={`${montserrat.className} font-[600] text-text flex flex-col gap-3 px-6 py-4`}>
              <li>
                <Link href="/products">Productos</Link>
              </li>
              <li>
                <Link href="/sustainability">Sostenibilidad</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/us">Nosotros</Link>
              </li>
              {token ? (
                <li>
                  <button onClick={handleLogout} className="w-full text-left">
                    Cerrar Sesión
                  </button>
                </li>
              ) : (
                <li>
                  <Link href="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </header>

      {/* Cart Sidebar Component */}
      <CartSidebar isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </>
  );
};

export default Header;
