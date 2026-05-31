// backend/models/taskModel.js
import pkg from "@prisma/client";

// Usamos el cliente global de node_modules (Prisma v6)
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

class Task {
  // OBTENER TODAS LAS TAREAS
  static async obtenerTodos() {
    try {
      // Prisma expone el modelo en minúsculas: prisma.task
      return await prisma.task.findMany();
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      throw error;
    }
  }

  // OBTENER TAREA POR ID
  static async obtenerPorId(id) {
    try {
      return await prisma.task.findUnique({
        where: { id: Number(id) }, // Prisma exige que el ID sea numérico si en el esquema es un Int
      });
    } catch (error) {
      console.error("Error al obtener la tarea:", error);
      throw error;
    }
  }

  // AGREGAR TAREA (¡Acá es donde se guarda en la Base de Datos!)
  static async agregar(data) {
    const { title, description, imagePath } = data;
    try {
      return await prisma.task.create({
        data: {
          title,
          description,
          image: imagePath, // Mapeamos imagePath al campo 'image' de tu schema.prisma
        },
      });
    } catch (error) {
      console.error("Error al agregar la tarea en Prisma:", error);
      throw error;
    }
  }

  // ACTUALIZAR TAREA
  static async actualizar(id, title, description) {
    try {
      return await prisma.task.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
        },
      });
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      throw error;
    }
  }

  // ELIMINAR TAREA
  static async eliminar(id) {
    try {
      await prisma.task.delete({
        where: { id: Number(id) },
      });
      return { message: "Tarea eliminada correctamente" };
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      throw error;
    }
  }
}

export default Task;
