'use client';

import { User, Mail, Rocket, Lock, Hand } from 'lucide-react';

const ChatForm = ({ name, setName, email, setEmail, isSubmitting, onSubmit }) => (
  <div className="p-8 rounded-b-2xl bg-[url(/back/garras.svg)] shadow-lg border border-teal-200 ">
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
        <Hand className="w-6 h-6" />
        ¡Hola!
      </h2>
      <p className="text-black leading-relaxed">
        Para brindarte una experiencia personalizada, necesitamos conocerte un poco mejor
      </p>
    </div>

    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className=" text-sm font-semibold text-black mb-2 flex items-center gap-2">
          <User className="w-4 h-4 text-black" />
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 bg-white border-2 border-teal-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 text-black placeholder-gray-600"
          placeholder="Ingresa tu nombre completo"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className=" text-sm font-semibold text-black mb-2 flex items-center gap-2">
          <Mail className="w-4 h-4 text-black" />
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 bg-white border-2 border-teal-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 text-black placeholder-gray-600"
          placeholder="tu@email.com"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
      >
        <span className="flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Iniciando...</span>
            </>
          ) : (
            <>
              <Rocket className="w-5 h-5" />
              <span>Iniciar Chat</span>
            </>
          )}
        </span>
      </button>
    </form>

    <div className="mt-6 p-4 bg-teal-50 rounded-xl border border-teal-200">
      <p className="text-xs text-black text-center flex items-center justify-center gap-1">
        <Lock className="w-3 h-3" />
        Tus datos están seguros y solo se usan para personalizar tu experiencia
      </p>
    </div>
  </div>
);

export default ChatForm;
