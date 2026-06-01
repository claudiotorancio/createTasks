import Task from "../../models/taskModel.js";

export const addTask = async (req, res) => {
  try {
   const title = req.body.title || req.query.title;
    const description = req.body.description || req.query.description;

    if (!title || !description) {
      return res.status(400).json({ error: "Falta el título o la descripción" });
    }
    
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
