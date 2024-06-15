import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const login = async (usuario, clave) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/generar_token', {
        usuario,
        clave
      });
      const { token } = response.data;
      setToken(token);
      setError(null);
    } catch (error) {
      setError(error.responses);
      setToken(null);
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
