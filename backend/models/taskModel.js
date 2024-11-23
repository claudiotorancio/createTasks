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

  static async agregar(title, descripcion) {
    try {
      const [result] = await db.query(
        "INSERT INTO tasks (title, descripcion) VALUES (?, ?)",
        [title, descripcion]
      );
      return { id: result.insertId, title, descripcion };
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
      throw error;
    }
  }

  static async actualizar(id, tarea, descripcion) {
    try {
      await db.query(
        "UPDATE tasks SET tarea = ?, descripcion = ? WHERE id = ?",
        [tarea, descripcion, id]
      );
      return { id, tarea, descripcion };
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
