// index.ts
import colors from "colors";
import { connectDB, db } from "./config/database";
import server from "./server";

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectDB();
    await db.sync({ alter: true });
    console.log(
      colors.bgBlue("✅ Tablas sincronizadas correctamente con MySQL.")
    );

    server.listen(PORT, () => {
      console.log(colors.green(`🚀 Servidor corriendo en el puerto ${PORT}`));
    });
  } catch (error) {
    console.error(colors.red("❌ Error al iniciar el servidor:"), error);
    process.exit(1);
  }
}

startServer();
