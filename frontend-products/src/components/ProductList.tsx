"use client";

import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const { productsQuery, deleteMutation } = useProducts();
  const { data: products, isLoading, error } = productsQuery;
  const [editingProduct, setEditingProduct] = useState<number | null>(null);

  if (isLoading) return <p className="text-center text-gray-700">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-500">Error al cargar productos.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-white-900">Lista de Productos</h2>

      {products?.length === 0 ? (
        <p className="text-gray-600 text-center">No hay productos disponibles.</p>
      ) : (
        <div className="table-container">
          <table className="w-full border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b text-left">Nombre</th>
                <th className="py-3 px-4 border-b text-left">Descripción</th>
                <th className="py-3 px-4 border-b text-left">Precio</th>
                <th className="py-3 px-4 border-b text-left">Stock</th>
                <th className="py-3 px-4 border-b text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100 transition">
                  <td className="py-3 px-4 border-b text-gray-800">{product.name}</td>
                  <td className="py-3 px-4 border-b text-gray-700">{product.description || "Sin descripción"}</td>
                  <td className="py-3 px-4 border-b text-green-600 font-semibold">${product.price}</td>
                  <td className="py-3 px-4 border-b text-center text-gray-800">{product.stock}</td>
                  <td className="py-3 px-4 border-b flex justify-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      onClick={() => setEditingProduct(product.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => deleteMutation.mutate(product.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingProduct && (
        <ProductForm productId={editingProduct} onClose={() => setEditingProduct(null)} />
      )}
    </div>
  );
};

export default ProductList;
