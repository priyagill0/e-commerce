package com.example.backend.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.example.backend.model.Category;
import com.example.backend.model.Product;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductImageRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.ProductVariantRepository;

@Service
public class ProductService {

    private final ProductRepository repo;
    // private final ProductImageService imageService;
    private final ProductVariantRepository variantRepo;
    private final ProductImageRepository productImagesRepo;
    private final CategoryRepository categoryRepo;

    public ProductService(ProductRepository repo, ProductVariantRepository variantRepo, ProductImageRepository productImagesRepo, CategoryRepository categoryRepo) {
        this.repo = repo;
        this.variantRepo = variantRepo;
        this.productImagesRepo = productImagesRepo;
        this.categoryRepo = categoryRepo;
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

    public Product addCategoryToProduct(String productId, String categoryId) {
        Product product = repo.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        Category category = categoryRepo.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));

        List<Category> categories = product.getCategories();
        if (categories == null) {
            categories = new ArrayList<>();
        }
        if (!categories.contains(category)) {
            categories.add(category);
            product.setCategories(categories);
            repo.save(product);
        }
        return product;
    }

    public Product deleteCategoryFromProduct(String productId, String categoryId) {
        Product product = repo.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        List<Category> categories = product.getCategories();
        if (categories != null) {
            categories.removeIf(cc -> cc.getCategoryId().equals(categoryId));
            product.setCategories(categories);
            repo.save(product);
        }
        return product;
    }
}
