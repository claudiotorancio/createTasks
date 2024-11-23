import { API_URL } from "../../backend/apiUrl";

// Función para agregar una tarea
export const fetchAddTask = async (title, description) => {
  try {
    const response = await fetch(`${API_URL}/api/addTask`, {
      method: "POST", // Método HTTP
      headers: {
        "Content-Type": "application/json", // Indica que los datos se envían en formato JSON
      },
      body: JSON.stringify({ title, description }), // Convierte los datos a JSON para el cuerpo de la solicitud
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al agregar la tarea:", error.message);
    throw error;
  }
};

// Función para obtener todas las tareas
export const fetchGetTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/api/getTasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las tareas:", error.message);
    throw error;
  }
};

// Función para eliminar una tarea
export const fetchDeleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/api/deleteTask/${taskId}`, {
      method: "DELETE", // Método HTTP DELETE
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return taskId; // Devuelve el ID de la tarea eliminada para poder manejarlo en el frontend
  } catch (error) {
    console.error("Error al eliminar la tarea:", error.message);
    throw error;
  }
};

// Función para actualizar una tarea
export const fetchUpdateTask = async (updatedTask) => {
  try {
    const response = await fetch(
      `${API_URL}/api/updateTask/${updatedTask.id}`,
      {
        method: "PUT", // Método HTTP PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask), // Cuerpo de la solicitud con los datos actualizados
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json(); // Devuelve los datos actualizados de la tarea
    return data;
  } catch (error) {
    console.error("Error al actualizar la tarea:", error.message);
    throw error;
  }
};
