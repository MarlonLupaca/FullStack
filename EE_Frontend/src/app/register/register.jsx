'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/orchestrator/register`, {
        username: formData.username,
        password: formData.password,
        rol: formData.rol,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });

      console.log('Respuesta backend:', response.data);

      router.push('/login?registered=true');
    } catch (err) {
      setError('Error al registrar. Por favor intenta de nuevo.');
      console.error('Error en axios:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0e9e9] via-[#f5f0f0] to-[#ede4e4] flex pt-10">
      {/* Sección de la imagen - Lado izquierdo */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-8 ">
        <div className="relative flex flex-col justify-center items-center">
          <p className="text-4xl font-extrabold text-gray-900 mb-2">Regístrate</p>
          <p className="text-lg text-gray-600 mb-14">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="z-20 relative">
              <span className="font-semibold text-primary hover:text-secondary cursor-pointer transition-colors duration-200 hover:underline">
                Inicia sesión
              </span>
            </Link>
          </p>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
          <img
            src="./Img/register.svg"
            alt="Registro"
            className="relative w-full max-w-lg h-auto object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Sección del formulario - Lado derecho */}
      <div className="w-full lg:w-1/2 flex items-center justify-start p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl">
          {/* Título y texto para móvil */}
          <div className="lg:hidden text-center mb-8">
            <p className="text-3xl font-extrabold text-gray-900 mb-2">Regístrate</p>
            <p className="text-base text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/login">
                <span className="font-semibold text-primary hover:text-secondary cursor-pointer transition-colors duration-200 hover:underline">
                  Inicia sesión
                </span>
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

            <form className=" flex flex-col justify-center items-center " onSubmit={handleSubmit}>
              {/* Grid de campos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="space-y-6">
                  <Input label="Nombre de usuario" name="username" value={formData.username} onChange={handleChange} />
                  <Input label="Nombres" name="firstName" value={formData.firstName} onChange={handleChange} />
                  <Input label="Apellidos" name="lastName" value={formData.lastName} onChange={handleChange} />
                  <Input label="Dirección" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div className="space-y-6">
                  <Input
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Input
                    label="Teléfono"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  <PasswordInput
                    label="Contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    showPassword={showPassword}
                    toggleShow={() => setShowPassword(!showPassword)}
                  />
                  <PasswordInput
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    showPassword={showConfirmPassword}
                    toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>
              </div>

              {/* Términos y condiciones */}
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-5 w-5 text-secondary focus:ring-primary border-gray-300 rounded-md mt-0.5 transition-all duration-200"
                />
                <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                  Acepto los{' '}
                  <Link href="#">
                    <span className="font-semibold text-secondary hover:text-primary cursor-pointer transition-colors duration-200 hover:underline">
                      términos y condiciones
                    </span>
                  </Link>{' '}
                  y autorizo el tratamiento de mis datos personales
                </label>
              </div>

              {/* Botón de registro */}
              <button
                type="submit"
                className="cursor-pointer bg-gradient-to-r w-fit from-primary to-secondary text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/50"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Crear mi cuenta</span>
                </span>
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">Al registrarte, formas parte de la comunidad VerdeRaíz 🌱</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente mejorado de entrada
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

// Componente específico para contraseñas con toggle de visibilidad
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
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
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
