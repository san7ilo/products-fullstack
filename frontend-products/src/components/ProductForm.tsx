"use client";

import { useState } from "react";
import { useProducts, useProductById } from "@/hooks/useProducts";
import { Product } from "@/types/product";

interface ProductFormProps {
  productId?: number;
  onClose: () => void;
}

const ProductForm = ({ productId, onClose }: ProductFormProps) => {
  const { createMutation, updateMutation } = useProducts();
  const productQuery = useProductById(productId ?? 0);


  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    description: "",
    stock: 0,
  });

  // Cargar datos si estamos en edición
  if (productQuery?.data && !formData.name) {
    setFormData(productQuery.data);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productId) {
      updateMutation.mutate({ id: productId, product: formData });
    } else {
      createMutation.mutate(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {productId ? "Editar Producto" : "Agregar Producto"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 mb-1">Nombre del Producto</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Precio */}
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 mb-1">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Descripción */}
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="text-gray-600 dark:text-gray-400 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              {productId ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
