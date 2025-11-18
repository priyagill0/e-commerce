package com.example.backend.model;

import static java.util.UUID.randomUUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_item")
public class OrderItem {

    @Id
    @Column(name = "order_item_id", nullable = false, unique = true)
    private String orderItemId = randomUUID().toString();

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false) // foreign key, many to one
    private Order order;

    @ManyToOne
    @JoinColumn(name = "variant_id", nullable = false) // foreign key, many to one
    private ProductVariant variant;

    private int qty;
    private double productPrice; 

    public OrderItem() {}  

    public OrderItem(String orderItemId , Order order, ProductVariant variant, int qty, double productPrice) {
        this.orderItemId = orderItemId;
        this.order = order;
        this.variant = variant;
        this.qty=qty;
        this.productPrice=productPrice;
       
    }
    
    // Getters and Setters
    public String getOrderItemId(){
        return orderItemId;
    }
    
    public void SetOrderItemId(String orderItemId) {
        this.orderItemId = orderItemId;
    }
    public Order getOrder() {
        return order;
    }
    public void setOrder(Order order) {
        this.order = order;
    }
    public ProductVariant getProductVariant() {
        return variant;
    }
    public void setProductVariant(ProductVariant variant) {
        this.variant = variant;
    }
    public int getQty() {
        return qty;
    }
    public void setQty(int qty) {
        this.qty = qty;
    }
    public double getProductPrice() {
        return productPrice;
    }
    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
    }
    
   
}
