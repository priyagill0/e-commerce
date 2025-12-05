package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000")  // required for frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowCredentials(true)  // REQUIRED for cookies
                        .allowedHeaders("*")
                        .exposedHeaders("*");
            }
            
        };
    }
}
