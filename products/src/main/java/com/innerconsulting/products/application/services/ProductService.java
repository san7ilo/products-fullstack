package com.innerconsulting.products.application.services;

import com.innerconsulting.products.application.dto.request.ProductRequest;
import com.innerconsulting.products.application.dto.response.ProductResponse;
import com.innerconsulting.products.application.exceptions.ProductNotFoundException;
import com.innerconsulting.products.application.mapper.ProductMapper;
import com.innerconsulting.products.application.services.abstractservice.IProductService;
import com.innerconsulting.products.domain.entities.Product;
import com.innerconsulting.products.domain.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService implements IProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Producto con ID " + id + " no encontrado"));
        return productMapper.toDTO(product);
    }

    @Override
    public ProductResponse createProduct(ProductRequest requestDTO) {
        Product product = productMapper.toEntity(requestDTO);
        product = productRepository.save(product);
        return productMapper.toDTO(product);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest requestDTO) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Producto con ID " + id + " no encontrado"));

        existingProduct.setName(requestDTO.getName());
        existingProduct.setPrice(requestDTO.getPrice());
        existingProduct.setDescription(requestDTO.getDescription());
        existingProduct.setStock(requestDTO.getStock());

        productRepository.save(existingProduct);
        return productMapper.toDTO(existingProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Producto con ID " + id + " no encontrado");
        }
        productRepository.deleteById(id);
    }
}
