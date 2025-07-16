'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import API_BASE_URL from '../config/apiConfig';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username: formData.username,
        password: formData.password,
      });

      const { token } = response.data;

      localStorage.setItem('token', token);

      const decoded = jwtDecode(token);
      console.log(decoded);
      const role = decoded.role;

      //login(token, user, userCode);

      if (role === 'ROLE_ADMIN') {
        router.push('/roleSelector');
      } else if (role === 'ROLE_USER') {
        router.push('/');
      } else if (role === 'ROLE_EMPLOYEE') {
        router.push('/');
      } else {
        setError('Rol no reconocido');
      }
    } catch (err) {
      if (err.response) {
        const status = err.response.status;

        if (status === 401) {
          setError('Credenciales incorrectas. Verifica tu usuario y contraseña.');
        } else if (status >= 400 && status < 500) {
          setError('Error en la solicitud. Intenta nuevamente.');
        } else if (status >= 500) {
          setError('El servidor no está disponible en este momento. Intenta más tarde.');
          console.warn('Error del servidor:', err);
        } else {
          setError('Error desconocido. Intenta nuevamente.');
          console.warn('Error inesperado:', err);
        }
      } else if (err.request) {
        setError('No se pudo conectar con el servidor. Revisa tu conexión.');
      } else {
        setError('Error inesperado al enviar la solicitud.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0e9e9] via-[#f5f0f0] to-[#ede4e4] flex relative">
      {/* Flecha de regreso */}
      <Link href="/" className="absolute top-6 left-6 z-30">
        <button className="cursor-pointer flex items-center justify-center w-10 h-10 bg-primary/80 text-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-110 border border-white/20">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </Link>

      {/* Sección de la imagen - Lado izquierdo */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-end p-8 pr-20">
        <div className="relative flex flex-col justify-center items-center">
          <p className="text-4xl font-extrabold text-gray-900 mb-2">Bienvenido de vuelta</p>
          <p className="text-lg text-gray-600 mb-10">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="z-20 relative">
              <span className="font-semibold text-primary hover:text-secondary cursor-pointer transition-colors duration-200 hover:underline">
                Regístrate
              </span>
            </Link>
          </p>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
          <img src="./Img/login_ee.svg" alt="Login" className="relative h-[50vh] object-contain drop-shadow-2xl" />
        </div>
      </div>

      {/* Sección del formulario - Lado derecho */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start lg:pl-10  p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Header móvil */}
          <div className="lg:hidden text-center mb-8">
            <p className="text-2xl font-extrabold text-gray-900">Inicia sesión</p>
            <p className="text-sm text-gray-600 mt-2">
              ¿No tienes una cuenta?{' '}
              <Link href="/register">
                <span className="font-medium text-primary hover:text-secondary cursor-pointer">Regístrate</span>
              </Link>
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-4 mb-6 animate-fade-in">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Campo de email */}
              <Input
                label="Nombre de usuario"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
              />

              {/* Campo de contraseña */}
              <PasswordInput
                label="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
                showPassword={showPassword}
                toggleShow={() => setShowPassword(!showPassword)}
              />

              {/* Opciones adicionales */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-secondary focus:ring-primary border-gray-300 rounded transition-all duration-200"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Recordarme
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="#">
                    <span className="font-medium text-secondary hover:text-primary cursor-pointer transition-colors duration-200 hover:underline">
                      ¿Olvidaste tu contraseña?
                    </span>
                  </Link>
                </div>
              </div>

              {/* Botones */}
              <div className="space-y-4">
                <button
                  type="submit"
                  className="cursor-pointer w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/50"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Iniciar sesión</span>
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">Bienvenido a la comunidad VerdeRaíz 🌱</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, type = 'text', value, onChange }) {
  return (
    <div className="group">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-primary"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          required
          value={value}
          onChange={onChange}
          className="
            appearance-none block w-full px-4 py-3
            border border-gray-200 rounded-xl shadow-sm
            placeholder-gray-400 text-gray-900
            bg-gray-50/50 backdrop-blur-sm
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
            focus:bg-white transition-all duration-300
            hover:border-gray-300 hover:shadow-md
          "
          placeholder={`Ingresa tu ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );
}

function PasswordInput({ label, name, value, onChange, showPassword, toggleShow }) {
  return (
    <div className="group">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-primary"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={showPassword ? 'text' : 'password'}
          required
          value={value}
          onChange={onChange}
          className="
            appearance-none block w-full px-4 py-3 pr-12
            border border-gray-200 rounded-xl shadow-sm
            placeholder-gray-400 text-gray-900
            bg-gray-50/50 backdrop-blur-sm
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
            focus:bg-white transition-all duration-300
            hover:border-gray-300 hover:shadow-md
          "
          placeholder={`Ingresa tu ${label.toLowerCase()}`}
        />
        <button
          type="button"
          onClick={toggleShow}
          className="cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          {showPassword ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414l-1.414-1.414m4.242 4.242l2.829 2.829m-16.97-16.97l18.384 18.384"
              />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
