import { Router } from "express";
import { getProducts } from "../backend/routes/productos/getProducts.js";
import { addProducts } from "../backend/routes/productos/addProduct.js";
import { addTask } from "../backend/routes/tasks/addTasls.js";
import { getTasks } from "../backend/routes/tasks/getTasks.js";
import { deleteTask } from "../backend/routes/tasks/deleteTask.js";
import { updateTask } from "../backend/routes/tasks/updateTask.js";
import { uploadSingle } from "../backend/routes/tasks/uploadImage.js";

const router = Router();

// Productos
router.get("/api/getProducts", getProducts);
router.post("/api/addProduct", addProducts);

//Tareas
router.post("/api/addTask", uploadSingle, addTask);
router.get("/api/getTasks", getTasks);
router.delete("/api/deleteTask/:taskId", deleteTask);
router.put("/api/updateTask/:taskId", updateTask);

export default router;
