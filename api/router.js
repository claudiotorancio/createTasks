import { Router } from "express";
import { getProducts } from "../backend/routes/productos/getProducts.js";
import { addProducts } from "../backend/routes/productos/addProduct.js";
import { addTask } from "../backend/routes/tasks/addTasls.js";
import { getTasks } from "../backend/routes/tasks/getTasks.js";

const router = Router();

// Productos
router.get("/api/getProducts", getProducts);
router.post("/api/addProduct", addProducts);

//Tareas
router.post("/api/addTask", addTask);
router.get("/api/getTasks", getTasks);
export default router;
