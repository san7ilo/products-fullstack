import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";
import { Product } from "@/types/product";

export const useProducts = () => {
  const queryClient = useQueryClient();

  // Hook para obtener todos los productos
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Mutación para crear un producto
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // Mutación para actualizar un producto
  const updateMutation = useMutation({
    mutationFn: ({ id, product }: { id: number; product: Partial<Product> }) =>
      updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });

  // Mutación para eliminar un producto
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    productsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};

// Hook  para obtener un producto por ID
export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });
};
