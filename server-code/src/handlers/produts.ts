import { Request, Response } from "express";
import { Product } from "../models/Product.model";

/// Validaciones movida a router.ts
//Error de validación movida a    middleware/index.ts

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

//Producto por ID
export const getProductsById = async (req: Request, res: Response) => {
  try {
    //console.log('Desde getProductsById');
    const { id } = req.params;
    const product = await Product.findByPk(id);
    res.json({ data: product });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

//Crear producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el producto",
      error,
    });
  }
};

//Actualizar producto
//PUT - actualizar todo el recurso
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({
      error: "Producto no encontrado",
    });
  }

  // Actualizar los campos del producto - PUT
  await product.update(req.body);
  await product.save();
  res.json({ data: product });
};

// PATCH - actualizar parte del recurso
export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Producto No Encontrado",
    });
  }

  // Actualizar el campo availability - PATCH
  // Alternar el valor de availability
  product.dataValues.availability = !product.dataValues.availability;
  await product.save();
  res.json({ data: product });
};

//Eliminar producto
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Producto No Encontrado",
    });
  }

  await product.destroy();
  res.json({ data: "Producto Eliminado" });
};
