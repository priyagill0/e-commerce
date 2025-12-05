
package com.example.backend.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_images")
public class ProductImage {

    @Id
    @Column(name = "image_id", nullable = false, unique = true)
    private String imageId;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "variant_id")
    private ProductVariant variant;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    public ProductImage() {}

    public ProductImage(Product product, ProductVariant variant) {
        this.imageId = generateShortId();
        this.product = product;
        this.variant = variant;
        this.imageUrl = "/assets/products/" + product.getProductId() + "/" + this.imageId + ".jpg";
    }

    
    // Getters and Setters
    public String getImageId() {
        return imageId;
    }
    // if you update imageId, then also update the imageUrl accordingly, to avoid mismatch
    public void setImageId(String imageId) {
        this.imageId = imageId;
        this.imageUrl = "/assets/products/" + this.product.getProductId()+ "/" + imageId + ".jpg";
    }
    public Product getProduct() {
        return product;
    }
    public void setProduct(Product product) {
        this.product = product;
    }
    public ProductVariant getVariant() {
        return variant;
    }
    public void setVariant(ProductVariant variant) {
        this.variant = variant;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    private String generateShortId() {
        return UUID.randomUUID().toString().substring(0, 8);
    }
}
