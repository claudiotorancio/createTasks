import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import User from "../../models/User.js";

const router = express.Router();

// Registrar usuario
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email inválido"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Contraseña mínima de 6 caracteres"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    console.log("req.body", req.body);
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.agregar({ email, password: hashedPassword });
      res.status(201).json({ message: "Usuario creado", user: user.email });
    } catch (error) {
      console.error("Error en /register:", error);
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  },
);
// Iniciar sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario y la contraseña son correctos usando el modelo
    const user = await User.verificarPassword(email, password);

    if (!user) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    // Crear un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, "secret_key", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

export default router;
