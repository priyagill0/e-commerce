package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Product;
import com.example.backend.model.ProductVariant;

public interface ProductVariantRepository  extends JpaRepository<ProductVariant, String> {
    List<ProductVariant> findByProduct(Product product);
    List<ProductVariant> findByProductProductId(String productId);
    void deleteByProductProductId(String productId);
    List<ProductVariant> findByProductProductIdOrderBySortOrderAsc(String productId);
    List<ProductVariant> findAllByOrderBySortOrderAsc();
    List<ProductVariant> findAllByOrderByProductProductIdAscSortOrderAsc();
}
