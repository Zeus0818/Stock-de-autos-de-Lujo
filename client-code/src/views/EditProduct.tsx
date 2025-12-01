import { Link, useLoaderData, useActionData, Form, redirect } from "react-router-dom";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import { getProductById, updateProduct } from "../services/ProductService";
import type { Product } from "../types";
import ErrorMessage from '../components/ErrrorMessage';

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(params.id);
    if (!product) return redirect("/");
    return product;
  }
  return redirect("/");
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {
    return error;
  }

  if (params.id !== undefined) {
    await updateProduct(data, params.id);
    return redirect("/");
  }
  return redirect("/");
}

export default function EditProduct() {
  const product = useLoaderData() as Product;
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-3xl font-black text-slate-500">Editar Producto</h2>
        <Link
          to="/"
          className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded text-white font-bold uppercase"
        >
          Volver a Productos
        </Link>
      </div>

      <br />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form method="put" className="mt-10">
        {/* Nombre */}
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Nombre Producto:
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del Producto"
            defaultValue={product.name}
          />
        </div>

        {/* Precio */}
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Precio:
          </label>
          <input
            id="price"
            type="number"
            name="price"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio Producto. ej. 200, 300"
            defaultValue={product.price}
            step="0.01"
          />
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="description">
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Descripción del producto (opcional)"
            defaultValue={product.description ?? ""}
          ></textarea>
        </div>

        {/* Disponibilidad */}
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            name="availability"
            defaultValue={product.availability ? "true" : "false"}
            className="mt-2 block w-full p-3 bg-gray-50"
          >
            <option value="true">Disponible</option>
            <option value="false">No disponible</option>
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Editar Producto"
        />
      </Form>
    </>
  );
}
