// AuthContext.js
import { createContext, useState, useEffect } from "react";
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
  getToken,
  removeToken,
} from "../services/sessionJWT.js";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      // Lógica para obtener los datos del usuario desde el token o una API
      setUser({ email: "usuario@ejemplo.com" }); // Simulando un usuario
    }
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await loginService(email, password);
      setUser(userData);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const register = async (email, password) => {
    console.log("authContext", email, password);
    try {
      const userData = await registerService(email, password);
      setUser(userData); // Opcional: establecer el usuario inmediatamente tras el registro
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
