package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.ProductVariant;
import com.example.backend.service.ProductVariantService;


@RestController
@RequestMapping("/api/product_variant")
public class ProductVariantController {
    
    private final ProductVariantService service;

    public ProductVariantController(ProductVariantService service) {
        this.service = service;
    }

    // get all product variants -> helpful for catalog
    @GetMapping
    public List<ProductVariant> getAll() {
        return service.getAllProductVariants();
    }

    // Get variants for a specific product
    @GetMapping("/{productId}")
    public List<ProductVariant> getByProductId(@PathVariable String productId) {
        return service.getProductVariantsByProductId(productId);
    }

    @PostMapping
    public ProductVariant add(@RequestBody ProductVariant productVariant) {
        return service.addProductVariant(productVariant);
    }
}
