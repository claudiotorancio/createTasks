//taskServices.js

import { API_URL } from "../../backend/apiUrl";

export const fetchAddTask = async (title, description) => {
  try {
    const response = await fetch(`${API_URL}/api/addTask`, {
      method: "POST", // Método HTTP
      headers: {
        "Content-Type": "application/json", // Indica que los datos se envían en formato JSON
      },
      body: JSON.stringify({ title, description }), // Convierte los datos a JSON para el cuerpo de la solicitud
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Devuelve el JSON de la respuesta
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al agregar la tarea:", error.message);
    throw error; // Propaga el error para manejarlo en el componente o servicio que lo llame
  }
};

export const fetchGetTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/api/getTasks`, {
      method: "GET", // Método HTTP
      headers: {
        "Content-Type": "application/json", // Indica que los datos se envían en formato JSON
      },
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Devuelve el JSON de la respuesta
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener las tareas:", error.message);
    throw error; // Propaga el error para manejarlo en el componente o servicio que lo llame
  }
};
