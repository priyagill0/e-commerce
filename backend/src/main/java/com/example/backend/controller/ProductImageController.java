package com.example.backend.controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.ProductImage;
import com.example.backend.service.ProductImageService;

@RestController
@RequestMapping("/api/product_image")
public class ProductImageController {
    private final ProductImageService service;

    
    public ProductImageController(ProductImageService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProductImage> getAll() {
        return service.getAllProductImages();
    }

    @GetMapping("/{productId}")
    public List<ProductImage> getByProductId(@PathVariable String productId) {
        return service.getProductImagesByProductId(productId);
    }
    

    
}
