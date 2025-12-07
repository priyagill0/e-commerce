package com.example.backend.service;


import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.backend.model.Category;
import com.example.backend.model.Product;
import com.example.backend.model.ProductImage;
import com.example.backend.model.ProductType;
import com.example.backend.model.ProductVariant;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductImageRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.ProductVariantRepository;

@Service
public class ProductVariantService {
    private final ProductVariantRepository repo;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductImageRepository imageRepository;

    public ProductVariantService(ProductVariantRepository repo, ProductRepository productRepository, CategoryRepository categoryRepository, ProductImageRepository imageRepository ){
        this.repo = repo;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.imageRepository = imageRepository;
    }

    public List<ProductVariant> getAllProductVariants() {
        return repo.findAllByOrderBySortOrderAsc();
    }

    // get all product variants for the specified product id
    public List<ProductVariant> getProductVariantsByProductId(String productId) {
        return repo.findByProductProductIdOrderBySortOrderAsc(productId);
    }

    public ProductVariant addProductVariant(ProductVariant productVariant) {
        return repo.save(productVariant);
    }

    public List<ProductVariant> getAllProductVariantsSorted() {
        return repo.findAllByOrderByProductProductIdAscSortOrderAsc();
    }

    public int updateStockQuantity(String variantId, int newQuantity) {
        return repo.findById(variantId)
                    .map(variant -> {
                        variant.setQuantity(newQuantity);   
                        repo.save(variant);
                        return newQuantity;
                    }).
                    orElseThrow(() -> new IllegalArgumentException("Variant not found with id: " + variantId));
    }
 
    public ProductVariant addProductWithVariant(ProductWithVariantDto dto) {
        // CREATE PRODUCT
        Product product = new Product();
        product.setName(dto.name);
        product.setDescription(dto.description);
        product.setBrand(dto.brand);
        product.setProductType(ProductType.valueOf(dto.type));

        // Handle Categories
        List<Category> categories = dto.categories.stream()
        .map(name -> categoryRepository.findByName(name) // find existing category
            .orElseGet(() -> { // if not found, create new
                Category c = new Category();
                c.setName(name);
                return categoryRepository.save(c);
            }))
        .toList();

        product.setCategories(categories);


        productRepository.save(product);

        // CREATE VARIANT
        ProductVariant variant = new ProductVariant();
        variant.setProduct(product);
        variant.setSize(dto.variant.size);
        variant.setPrice(dto.variant.price);
        variant.setQuantity(dto.variant.qty);
        repo.save(variant);

        // ADD IMAGE 
        if (dto.image != null) {
            ProductImage img = new ProductImage(product, variant);
            // img.setImageId(generateShortId());
            img.setImageUrl(dto.image.imageUrl);

            imageRepository.save(img);
        }

        return variant;
    }

    private String generateShortId() {
        return UUID.randomUUID().toString().substring(0, 8);
    } 
}