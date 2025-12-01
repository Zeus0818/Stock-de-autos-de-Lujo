import { Link, Form, useActionData, redirect } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import ErrorMessage from "../components/ErrrorMessage";
import { addProduct } from "../services/ProductService";
{
  /* Para recuperar los datos ingresados en el formulario usaremos FormData*/
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = '';
  if (Object.values(data).includes('')) { error = 'Todos los campos son obligatorios';}
  if (error.length) { return error; }
  await addProduct(data);
  return redirect('/');  // ✅ Esto es CRÍTICO
}
// Formulario para crear un nuevo producto
export default function NewProduct() {
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-3xl font-black text-slate-500">
          Registrar Producto
        </h2>
        <Link
          to="/"
          className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded text-white font-bold uppercase"
        >
          Volver a Productos
        </Link>
      </div>

      <br />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form method="post" className="mt-10">
        
        {/* Nombre */}
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">Nombre Producto:</label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del Producto"
            name="name"
            
          />
        </div>

        {/* Precio */}
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">Precio:</label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
          />
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Descripción del producto (opcional)"
          ></textarea>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
