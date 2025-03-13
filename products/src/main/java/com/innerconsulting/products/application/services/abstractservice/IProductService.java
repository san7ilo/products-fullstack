package com.innerconsulting.products.application.services.abstractservice;

import com.innerconsulting.products.application.dto.request.ProductRequest;
import com.innerconsulting.products.application.dto.response.ProductResponse;

import java.util.List;

public interface IProductService {
    List<ProductResponse> getAllProducts();
    ProductResponse getProductById(Long id);
    ProductResponse createProduct(ProductRequest requestDTO);
    ProductResponse updateProduct(Long id, ProductRequest requestDTO);
    void deleteProduct(Long id);
}
