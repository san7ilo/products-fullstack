package com.innerconsulting.products.application.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
@Schema(name = "ProductResponse", description = "DTO que representa un producto en la respuesta de la API")
public class ProductResponse {

    @Schema(description = "ID del producto", example = "1")
    private Long id;

    @Schema(description = "Nombre del producto", example = "Laptop Gamer")
    private String name;

    @Schema(description = "Precio del producto", example = "1299.99")
    private BigDecimal price;

    @Schema(description = "Descripción del producto", example = "Laptop con procesador Intel i7 y 16GB RAM")
    private String description;

    @Schema(description = "Cantidad en stock", example = "15")
    private Integer stock;
}
