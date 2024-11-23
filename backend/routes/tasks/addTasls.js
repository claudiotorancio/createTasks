import Task from "../../models/taskModel.js";

export const addTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await Task.agregar(title, description);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto" });
  }
};
