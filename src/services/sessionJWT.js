import { API_URL } from "../../backend/apiUrl.js";

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const login = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Error al iniciar sesión");
    const data = await res.json();
    setToken(data.token);
    return data.user; // Devuelve la información del usuario
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const register = async (email, password) => {
  console.log("sessionJWT", email, password);
  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Error al registrar usuario");
    const data = await res.json();
    console.log("Usuario registrado:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${API_URL}/api/auth/logout`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Error al realizar logout");
    const data = await res.json();
    console.log("session finalizada:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
