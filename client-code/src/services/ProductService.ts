import { safeParse, number, parse, string, transform, pipe } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductsSchema, ProductSchema } from "../types";
import type { Product } from "../types";
import { toBoolean } from "../utils";

type ProductData = {
  [k: string]: FormDataEntryValue;
};
export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, { 
      name: data.name,  
      price: +data.price,
      description: data.description || undefined  // 👈 AGREGA ESTO
    });
    
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
        description: result.output.description || null  // 👈 Y ESTO
      });
    } else { 
      throw new Error("Datos no válidos"); 
    }
  } catch (error) {  
    console.log(error); 
  }
}
export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);
    
    // ✅ NORMALIZAR: convertir id a string, price a number, y null a undefined
    const normalized = data.data.map((product: any) => ({
      ...product,
      id: String(product.id),
      price: Number(product.price),
      description: product.description === null ? undefined : product.description
    }));
    
    const result = safeParse(ProductsSchema, normalized);
    if (result.success) { return result.output; }
    else {  console.error('Error de validación:', result.issues);
    throw new Error("Hubo un error...");}
  } catch (error) { console.log(error);}
}

export async function getProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios(url);
    
    // ✅ NORMALIZAR datos
    const normalized = {
      ...data.data,
      id: String(data.data.id),
      price: Number(data.data.price),
      description: data.data.description === null ? undefined : data.data.description
    };
    
    const result = safeParse(ProductSchema, normalized);
    if (result.success) { return result.output;
    } else { console.error('Error de validación:', result.issues);
      throw new Error("Hubo un error..."); }
  } catch (error) { console.log(error);}
}
export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
        const NumberSchema = pipe(string(), transform(Number), number());
        const result = safeParse(ProductSchema, {
        id,
        name: data.name,
        price: parse(NumberSchema, data.price),
        description: data.description || undefined,
        availability: toBoolean(data.availability.toString()),
        });

        if (result.success) {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.put(url, result.output);
        }} catch (error) {console.log(error); } }

export async function deleteProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {  console.log(error); }
}

export async function updateProductAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) { console.log(error); }
}
