// backend/models/productoModel.js

import db from "../db.js";

class Producto {
  static async obtenerTodos() {
    try {
      const [rows] = await db.query("SELECT * FROM productos");
      return rows;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    try {
      const [rows] = await db.query("SELECT * FROM productos WHERE id = ?", [
        id,
      ]);
      return rows[0]; // Devuelve el primer producto encontrado
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      throw error;
    }
  }

  static async agregar(nombre, precio) {
    try {
      const [result] = await db.query(
        "INSERT INTO productos (nombre, precio) VALUES (?, ?)",
        [nombre, precio]
      );
      return { id: result.insertId, nombre, precio };
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      throw error;
    }
  }

  static async actualizar(id, nombre, precio) {
    try {
      await db.query(
        "UPDATE productos SET nombre = ?, precio = ? WHERE id = ?",
        [nombre, precio, id]
      );
      return { id, nombre, precio };
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      throw error;
    }
  }

  static async eliminar(id) {
    try {
      await db.query("DELETE FROM productos WHERE id = ?", [id]);
      return { message: "Producto eliminado correctamente" };
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error;
    }
  }
}

export default Producto;
