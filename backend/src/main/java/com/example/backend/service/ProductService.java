package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.Product;
import com.example.backend.repository.ProductImageRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.ProductVariantRepository;

@Service
public class ProductService {

    private final ProductRepository repo;
    // private final ProductImageService imageService;
    private final ProductVariantRepository variantRepo;
    private final ProductImageRepository productImagesRepo;

    public ProductService(ProductRepository repo, ProductVariantRepository variantRepo, ProductImageRepository productImagesRepo) {
        this.repo = repo;
        this.variantRepo = variantRepo;
        this.productImagesRepo = productImagesRepo;
    }

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product getProductById(String productId) {
        return repo.findById(productId)
        .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product addProduct(Product product) {
        return repo.save(product);
    }

    // delete product by id (and all of its variants!!)
    public Product deleteProductById(String productId) {
        Product product = repo.findById(productId)
        .orElseThrow(() -> new RuntimeException("Product not found"));

        // delete all variants
        variantRepo.deleteByProductProductId(productId);

        // delete any images
        productImagesRepo.deleteByProductProductId(productId);

        // delete the product
        repo.delete(product);

        return product;
    }
}
