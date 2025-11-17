package com.example.backend.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_variants")
public class ProductVariant {

    @Id
    @Column(name = "variant_id", nullable = false, unique = true)
    private String variantId = UUID.randomUUID().toString();

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false) // foreign key, many to one
    private Product product;

    // @Column(name = "product_id", nullable = false)
    // private String productId;

    private String size;
    private double price;
    private int quantity;

    @Column(name = "sort_order")
    private int sortOrder; // start at 0

    public ProductVariant() {}

    public ProductVariant(Product product, String size, double price, int quantity, int sortOrder) {
        this.product = product;
        this.size = size;
        this.price = price;
        this.quantity = quantity;
        this.sortOrder = sortOrder;
    }

    public String getVariantId() {
        return variantId;
    }
    public void setVariantId(String variantId) {
        this.variantId = variantId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(int sortOrder) {
        this.sortOrder = sortOrder;
    }
}