import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsById,
  updateAvailability,
  updateProduct,
} from "./handlers/produts";
import { handleInputError } from "./middleware";

const router = Router();

//----- AQUI VA LA DOCUMENTACIÓN DE SWAGGER (squema OpenAPI) ------

/**
 *@swagger
 *components:
 *    schemas:
 *       Product:
 *              type: object
 *              properties:
 *                   id:
 *                      type: integer
 *                      description: ID del producto
 *                      example: 1
 *                   name:
 *                      type: string
 *                      description: Nombre del producto
 *                      example: Monitor LG 24''
 *                   price:
 *                      type: number
 *                      description: Precio del producto
 *                      example: 250.75
 *                   availability:
 *                     type: boolean
 *                     description: Disponibilidad del producto
 *                     example: true
 *
 */



// Documentación Swagger para endpoint GET /api/products
/**
 *  @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *      
 */
router.get("/", getProducts);

// Documentación Swagger para obtener producto por id, endpoint GET /api/products/{id}
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por su ID
 *     tags:
 *       - Products
 *     description: Retorna un producto específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */



router.get(
  "/:id",
  param("id").isInt().withMessage(" ID no valido "),   //Validamos parametro id
  handleInputError,
  getProductsById
); //Empoint para obtener productos por ID


router.post(
  "/",
  // Validación usar express-validator
  //Traido desde products.ts
  //Elimminas los .run(req) porque no se puede usar ahi
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("description").optional().isString().withMessage("La descripcion es obligatoria"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto no puede estar vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no puede ser menor o igual a 0"),
  //Middleware para manejar errores de input
  handleInputError,
  createProduct
);
 // Documentación Swagger para crear un nuevo producto, endpoint POST /api/products
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags:
 *       - Products
 *     description: Crea un nuevo producto en la base de datos. La disponibilidad se establece automáticamente en true.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - precio
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Monitor Curvo 49 Pulgadas"
 *               descripcion:
 *                 type: string
 *                 example: "Monitor curvo ultrawide con resolución 5K y tecnología QLED."
 *               precio:
 *                 type: number
 *                 example: 3999.99
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error del servidor
 */




router.put(
  "/:id",
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("description").notEmpty().withMessage("La descripcion es obligatoria"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto no puede estar vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no puede ser menor o igual a 0"),
  body("availability")
    .isBoolean()
    .withMessage("El valor de availability debe ser booleano"),
  //Middleware para manejar errores de input
  handleInputError,
  updateProduct
);
// Documentación Swagger para actualizar un producto, endpoint PUT /api/products/{id}

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product by ID
 *      tags:
 *          - Products
 *      description: Updates the full product information (name, description, price)
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: integer
 *            description: ID of the product to update
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Laptop Lenovo ThinkPad X1"
 *                          description:
 *                              type: string
 *                              example: "Laptop empresarial ultradelgada con 16 GB de RAM y SSD de 512 GB"
 *                          price:
 *                              type: number
 *                              example: 4299
 *      responses:
 *          200:
 *              description: Product updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data
 *          404:
 *              description: Product not found
 */


router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputError,
  updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Actualizar la disponibilidad de un producto por su ID
 *     tags:
 *       - Products
 *     description: Actualiza únicamente el campo de disponibilidad de un producto.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a actualizar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Disponibilidad actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Solicitud incorrecta - datos de entrada no válidos
 *       404:
 *         description: Producto no encontrado
 */


router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputError,
  deleteProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags:
 *       - Products
 *     description: Elimina un producto de la base de datos usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Solicitud incorrecta - ID inválido
 *       404:
 *         description: Producto no encontrado
 */


export default router;
