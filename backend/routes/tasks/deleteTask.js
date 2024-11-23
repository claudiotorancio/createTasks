import Task from "../../models/taskModel.js";

export const deleteTask = async (req, res) => {
  const { taskId } = req.params; // Obtenemos el ID de la tarea desde los parámetros de la URL

  try {
    // Buscar la tarea en la base de datos
    const task = await Task.eliminar(taskId);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    return res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar tarea:", error.message);
    return res
      .status(500)
      .json({ message: "Error al eliminar tarea", error: error.message });
  }
};
