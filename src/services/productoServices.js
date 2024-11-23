// src/services/apiService.js
import { API_URL } from "../../backend/apiUrl";

export const fetchProductos = async () => {
  try {
    const response = await fetch(`${API_URL}/api/getProducts`);

    // Verifica si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error.message);
    throw error; // Propagar el error para que el componente lo maneje si es necesario.
  }
};
