package com.innerconsulting.products.application.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
@Schema(name = "ProductRequest", description = "DTO para crear o actualizar un producto")
public class ProductRequest {

    @Schema(description = "Nombre del producto", example = "Laptop Gamer")
    @NotBlank(message = "El nombre no puede estar vacío")
    private String name;

    @Schema(description = "Precio del producto", example = "1299.99")
    @NotNull(message = "El precio es obligatorio")
    @Min(value = 0, message = "El precio no puede ser negativo")
    private BigDecimal price;

    @Schema(description = "Descripción opcional del producto", example = "Laptop con procesador Intel i7 y 16GB RAM")
    private String description;

    @Schema(description = "Stock disponible", example = "15")
    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;
}
