// backend/models/productoModel.js
import pkg from "@prisma/client";

// Usamos el cliente global de node_modules (Prisma v6)
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

class Producto {
  // OBTENER TODOS LOS PRODUCTOS
  static async obtenerTodos() {
    try {
      // Prisma maneja la pluralización automáticamente o usa el nombre del modelo en minúsculas (producto)
      return await prisma.producto.findMany();
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  }

  // OBTENER POR ID
  static async obtenerPorId(id) {
    try {
      return await prisma.producto.findUnique({
        where: { id: Number(id) }, // Aseguramos que el ID vaya como número
      });
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      throw error;
    }
  }

  // AGREGAR PRODUCTO
  static async agregar(nombre, precio) {
    try {
      return await prisma.producto.create({
        data: {
          nombre,
          precio: Number(precio), // Aseguramos que el precio mantenga el tipo correcto
        },
      });
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      throw error;
    }
  }

  // ACTUALIZAR PRODUCTO
  static async actualizar(id, nombre, precio) {
    try {
      return await prisma.producto.update({
        where: { id: Number(id) },
        data: {
          nombre,
          precio: Number(precio),
        },
      });
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      throw error;
    }
  }

  // ELIMINAR PRODUCTO
  static async eliminar(id) {
    try {
      await prisma.producto.delete({
        where: { id: Number(id) },
      });
      return { message: "Producto eliminado correctamente" };
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error;
    }
  }
}

export default Producto;
