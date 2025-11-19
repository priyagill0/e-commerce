package com.example.backend.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.ProductImage;

public interface ProductImageRepository extends JpaRepository <ProductImage, String> {
    List<ProductImage> findByProductProductId(String productId);
    List<ProductImage> findByVariant_VariantId(String productVariantId);
    void deleteByProductProductId(String productId);
}
