import Task from "../../models/taskModel.js";

// Controlador para editar una tarea
export const updateTask = async (req, res) => {
  const { taskId } = req.params; // Obtenemos el ID de la tarea desde los parámetros de la URL
  const { title, description } = req.body; // Obtenemos los datos del cuerpo de la solicitud (título y descripción)

  try {
    // Buscar la tarea en la base de datos
    const task = await Task.actualizar(taskId, title, description);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    return res.status(200).json(task); // Devuelve la tarea actualizada
  } catch (error) {
    console.error("Error al editar tarea:", error.message);
    return res
      .status(500)
      .json({ message: "Error al editar tarea", error: error.message });
  }
};
