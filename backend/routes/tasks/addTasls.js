import Task from "../../models/taskModel.js";

export const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const imagePath = req.file.location;

    const createTaskData = {
      title,
      description,
      imagePath,
    };

    const task = await Task.agregar(createTaskData);
    res.status(201).json(task);
    // });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto" });
  }
};
