'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userCode, setUserCode] = useState(null);

  // Cargar el token del localStorage al iniciar (opcional)
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedUserCode = localStorage.getItem('userCode');

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedUserCode) {
      setUserCode(storedUserCode);
    }
  }, []);

  const login = (newToken, newUser, newUserCode) => {
    setToken(newToken);
    setUser(newUser);
    setUserCode(newUserCode);

    // Guardar en localStorage (opcional, pero útil para persistencia entre sesiones)
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('userCode', newUserCode);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserCode(null);

    // Limpiar del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userCode');
  };

  return <AuthContext.Provider value={{ token, user, userCode, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
