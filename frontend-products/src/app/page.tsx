"use client";

import { useState } from "react";
import ProductList from "@/components/ProductList";
import ProductForm from "@/components/ProductForm";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Productos</h1>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowForm(true)}
      >
        Nuevo Producto
      </button>
      <ProductList />
      {showForm && <ProductForm onClose={() => setShowForm(false)} />}
    </main>
  );
}
