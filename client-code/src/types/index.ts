import {
  object,
  string,
  number,
  optional,
  boolean,
  array,
  type InferOutput,
} from "valibot";

export const DraftProductSchema = object({
  name: string(),
  price: number(),
  description: optional(string()),
});

export const ProductSchema = object({
  id: string(),
  name: string(),
  price: number(),
  description: optional(string()),
  availability: boolean(),
});

export const ProductsSchema = array(ProductSchema);

export type Product = InferOutput<typeof ProductSchema>;
export type DraftProduct = InferOutput<typeof DraftProductSchema>;
