// backend/models/taskModel.js
import db from "../db.js";

class Task {
  static async obtenerTodos() {
    try {
      const [rows] = await db.query("SELECT * FROM tasks");
      return rows;
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    try {
      const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
      return rows[0]; // Devuelve la primera tarea encontrada
    } catch (error) {
      console.error("Error al obtener la tarea:", error);
      throw error;
    }
  }

  static async agregar(title, description) {
    try {
      const [result] = await db.query(
        "INSERT INTO tasks (title, description) VALUES (?, ?)",
        [title, description]
      );
      return { id: result.insertId, title, description };
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
      throw error;
    }
  }

  static async actualizar(id, title, description) {
    try {
      await db.query(
        "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
        [title, description, id]
      );
      return { id, title, description };
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      throw error;
    }
  }

  static async eliminar(id) {
    try {
      await db.query("DELETE FROM tasks WHERE id = ?", [id]);
      return { message: "Tarea eliminada correctamente" };
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      throw error;
    }
  }
}

export default Task;
