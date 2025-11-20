package com.example.backend.model;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")

public class Category {
    @Id
    @Column(name = "category_id", nullable = false, unique = true)
    private String categoryId = UUID.randomUUID().toString();

    // inverse side of the product-category relationship, join table created in Product.java
    @ManyToMany(mappedBy = "categories")
    @JsonIgnore // JSON will NOT include products when returning Category. (prevents infinite recursion)
    private List<Product> products;

    private String name;

    public Category() {}

    public Category(String name) {
        this.name = name;
    }

    public String getCategoryId() { 
        return categoryId; 
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
