import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Asegúrate de que esta ruta apunta correctamente al directorio 'public'
const output = path.resolve(__dirname, "../../../src/components");

const tasks = async (req, res) => {
  try {
    res.sendFile(path.join(output, "TaskList.jsx"));
  } catch (error) {
    console.error("Error al enviar el archivo:", error.message);
    res.status(500).send({ error: "Error al enviar el archivo." });
  }
};

export default tasks;
