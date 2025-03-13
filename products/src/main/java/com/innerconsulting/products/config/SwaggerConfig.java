package com.innerconsulting.products.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de Gestión de Productos")
                        .version("1.0")
                        .description("Documentación de la API para gestión de productos")
                        .contact(new Contact()
                                .name("Equipo de Desarrollo")
                                .email("contacto@innerconsulting.com")
                        )
                );
    }
}
