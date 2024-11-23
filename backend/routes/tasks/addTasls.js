import Task from "../../models/taskModel.js";

export const addTask = async (req, res) => {
  const { title, descripcion } = req.body;
  try {
    const task = await Task.agregar(title, descripcion);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto" });
  }
};
