package com.innerconsulting.products.application.mapper;

import com.innerconsulting.products.application.dto.request.ProductRequest;
import com.innerconsulting.products.application.dto.response.ProductResponse;
import com.innerconsulting.products.domain.entities.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {

    @Mapping(target = "id", ignore = true) // ✅ Ignoramos el ID en el request
    Product toEntity(ProductRequest dto);

    @Mapping(target = "id", source = "id") // ✅ Mapear ID explícitamente en la conversión
    ProductResponse toDTO(Product product);
}
