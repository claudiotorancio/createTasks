//models/User.js
import pkg from "@prisma/client";
import bcrypt from "bcryptjs";

//Instanciar cliente Prisma
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

class User {
  //Buscar por email
  static async buscarPorEmail(email) {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error("error al buscar usuario por email", error);
      throw error;
    }
  }

  //Agregar Usuario
  static async agregar(data) {
    const { email, password } = data;

    try {
      const nuevoUsuario = await prisma.user.create({
        data: { email, password },
      });

      return nuevoUsuario;
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      throw error;
    }
  }

  //Actualizar usuario
  static async actualizar(id, email, password) {
    try {
      const usuarioActualizado = await prisma.user.update({
        where: { id: Number(id) },
        data: { email, password },
      });
      return usuarioActualizado;
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    }
  }

  //Eliminar usuario
  static async eliminar(id) {
    try {
      await prisma.user.delete({
        where: { id: Number(id) },
      });
      return { message: "Usuario eliminado correctamente" };
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }
  }

  // verificar la contraseña
  static async verificarPassword(email, password) {
    try {
      // Buscar al usuario por email
      const user = await this.buscarPorEmail(email);

      if (!user) {
        return null;
      }

      const esValido = await bcrypt.compare(password, user.password);

      if (esValido) {
        return user; // Si la contraseña es válida, devolver el usuario
      } else {
        return null; // Si la contraseña no es válida, devolver null
      }
    } catch (error) {
      console.error("Error al verificar la contraseña:", error);
      throw error;
    }
  }
}

export default User;
