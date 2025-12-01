import { Link, useLoaderData } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import { getProducts ,  updateProductAvailability } from "../services/ProductService";
import type { Product } from "../types";
import ProductDetails from '../components/ProductDetails'
//funcion loader para obtener los productos
export async function loader() {
  const products = await getProducts();
  return products;
}

// Funcion action
export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    await updateProductAvailability(data.id as string)
    return {}
}

export default function Products() {
  const products = useLoaderData() as Product[];

   return (
    <>
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-black text-slate-500">Productos</h2>
        <Link
          to="/products/nuevo"
          className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded text-white font-bold uppercase"
        >
          Nuevo Producto
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
       <thead className="bg-slate-200">
        <tr>
          <th className="px-4 py-2">Nombre</th>
          <th className="px-4 py-2">Precio</th>
          <th className="px-4 py-2">Descripción</th>  
          <th className="px-4 py-2">Disponibilidad</th>
          <th className="px-4 py-2">Acciones</th>
        </tr>
    </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductDetails key={product.id} product={product} />  
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-4 text-center text-gray-500">
                  No hay productos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}