/**Importamos JSDoc para documentar APIS */
import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    tags: [
      {
        name: "Products",
        description: "Operaciones relacionadas con productos",
      },
    ],
    info: {
      title: "API de Productos",
      version: "1.0.0",
      description:
        "API para gestionar productos en una base de datos MySQL utilizando Express y Sequelize.",
    },
  },
  apis: ["src/router.ts", "src/models/*.ts"], // Rutas a los archivos donde están los JSDoc
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
