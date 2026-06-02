import Task from "../../models/taskModel.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  },
});

export const addTaskFromMobile = async (req, res) => {
  try {
    // 1. Atrapamos los textos desde la URL (Query params de App Inventor)
    const title = req.query.title;
    const description = req.query.description;

    if (!title || !description) {
      return res.status(400).json({ error: "Falta el título o la descripción en la URL." });
    }

    // 2. Recomponemos el Buffer binario de la imagen que manda el celular
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    if (buffer.length === 0) {
      return res.status(400).json({ error: "No se recibieron bytes de imagen." });
    }

    // 3. Nombre único para S3
    const fileName = `mobile-${Date.now()}.png`;

    // 4. Subida directa a AWS S3
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_AWS,
        Key: fileName,
        Body: buffer,
        ContentType: "image/png",
        ACL: "public-read",
      })
    );

    const imagePath = `https://${process.env.BUCKET_AWS}.s3.${process.env.S3_BUCKET_REGION}.amazonaws.com/${fileName}`;

    // 5. Guardamos en la base de datos con tu modelo
    const createTaskData = {
      title,
      description,
      imagePath,
    };

    const task = await Task.agregar(createTaskData);
    res.status(201).json(task);

  } catch (error) {
    console.error("Error en endpoint móvil:", error);
    res.status(500).json({ error: "Error interno en servidor móvil", detalles: error.message });
  }
};