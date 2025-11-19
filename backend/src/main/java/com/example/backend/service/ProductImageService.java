package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.ProductImage;
import com.example.backend.repository.ProductImageRepository;

@Service
public class ProductImageService {

    private final ProductImageRepository repo;

    public ProductImageService(ProductImageRepository repo) {
        this.repo = repo;
    }

    public List<ProductImage> getAllProductImages() {
        return repo.findAll();
    }

    public ProductImage addProduct(ProductImage image) {
        return repo.save(image);
    }

    public List<ProductImage> getProductImagesByProductId(String productId) {
        return repo.findByProductProductId(productId);
    }
}
