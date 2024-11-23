import Task from "../../models/taskModel.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.obtenerTodos();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};
