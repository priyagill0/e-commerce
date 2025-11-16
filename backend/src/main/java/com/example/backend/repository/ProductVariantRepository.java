package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.ProductVariant;

public interface ProductVariantRepository  extends JpaRepository<ProductVariant, String> {
    List<ProductVariant> findByProductId(String productId);
}
