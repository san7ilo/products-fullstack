import axios from "axios";
import { Product } from "@/types/product";

const API_URL = "http://localhost:8080/api/products";

// Obtener todos los productos
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};

// Obtener un solo producto por ID
export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await axios.get<Product>(`${API_URL}/${id}`);
  return response.data;
};

// Crear un producto
export const createProduct = async (product: Partial<Product>): Promise<Product> => {
  const response = await axios.post<Product>(API_URL, product);
  return response.data;
};

// Actualizar un producto
export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  const response = await axios.put<Product>(`${API_URL}/${id}`, product);
  return response.data;
};

// Eliminar un producto
export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
