import express from "express";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { db } from "./config/database";
import router from "./router";
import swaggerSpec from "./config/swagger";

// CONEXIÓN A LA BASE DE DATOS
async function connectDB() {
  try {
    await db.authenticate();
    await db.sync();
    console.log(colors.bgGreen.bold("✅ Conexión con MySQL establecida correctamente"));
  } catch (error) {
    console.error(colors.bgRed.bold("❌ Error al conectar con MySQL:"), error);
    process.exit(1); // Terminar el proceso si no hay conexión
  }
}

// Ejecutar la conexión
connectDB();

// Instancia de Express
const server = express();

// Configuración de CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean); // Eliminar valores undefined/null

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Permitir peticiones sin origin (como Postman o servidores)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true
};

// Middlewares
server.use(cors(corsOptions));
server.use(express.json());  // Leer datos de formularios
server.use(morgan('dev'));

// Rutas
server.use("/api/products", router);
server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta de health check
server.get("/api/health", (_, res) => {
  res.json({ 
    status: "OK", 
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString()
  });
});

// Manejador de rutas no encontradas
server.use((_, res) => {
  res.status(404).json({ 
    error: "Ruta no encontrada" 
  });
});

// Manejador global de errores
server.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(colors.red("Error:"), err.message);
  res.status(500).json({ 
    error: "Error interno del servidor",
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default server;