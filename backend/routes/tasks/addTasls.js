import Task from "../../models/taskModel.js";

export const addTask = async (req, res) => {
  try {
    const title = req.body.title || req.query.title;
    const description = req.body.description || req.query.description;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Falta el título o la descripción" });
    }

    const imagePath = req.file.location || req.files?.[0]?.location;

    if (!imagePath) {
      return res
        .status(400)
        .json({ error: "No se recibió ninguna imagen en AWS S3." });
    }

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
