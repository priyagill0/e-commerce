package com.example.backend.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.ProductVariant;
import com.example.backend.repository.ProductVariantRepository;

@Service
public class ProductVariantService {
    private final ProductVariantRepository repo;

    public ProductVariantService(ProductVariantRepository repo) {
        this.repo = repo;
    }

    public List<ProductVariant> getAllProductVariants() {
        return repo.findAll();
    }

    // get all product variants for the specified product id
    public List<ProductVariant> getProductVariantsByProductId(String productId) {
        return repo.findByProductId(productId);
    }

    public ProductVariant addProductVariant(ProductVariant productVariant) {
        return repo.save(productVariant);
    }

}