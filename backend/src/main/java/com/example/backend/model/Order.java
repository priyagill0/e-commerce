package com.example.backend.model;

import java.time.LocalDateTime;
import static java.util.UUID.randomUUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order")
public class Order {

    @Id
    @Column(name = "order_id", nullable = false, unique = true)
    private String orderId = randomUUID().toString();


    @Enumerated(EnumType.STRING) 
    @Column(name = "status")
    private Status status; // using an enum

    private double subtotal;  
    private double tax;  
    private double total;  


    @Column(name = "placed_at", updatable = false)
    private LocalDateTime placedAt = LocalDateTime.now(); // set only once when created

    @Column(name = "updated_at", updatable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false) // foreign key, many to one
    private Address shippingAddress;
    
    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false) // foreign key, many to one
    private Address billingAddress;

    public Order() {}  

    public Order(String orderId , Status status, double subtotal,double tax, double total, LocalDateTime placedAt, LocalDateTime updatedAt, Address shippingAddress, Address billingAddress) {
        this.orderId = orderId;
        this.status = status;
        this.subtotal = subtotal;
        this.tax=tax;
        this.total=total;
        this.placedAt=placedAt;
        this.updatedAt=updatedAt;
        this.shippingAddress=shippingAddress; 
        this.billingAddress=billingAddress;
    }
    
    // Getters and Setters
    public String getOrderId(){
        return orderId;
    }
    
    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }
    public double getSubtotal() {
        return subtotal;
    }
    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }
    public double getTax() {
        return tax;
    }
    public void setTax(double tax) {
        this.tax = tax;
    }
    public double getTotal() {
        return total;
    }
    public void setTotal(double total) {
        this.total = total;
    }
    public LocalDateTime getPlacedAt() {
        return placedAt;
    }
    public void setPlacedAt(LocalDateTime placedAt) {
        this.placedAt = placedAt;
    }
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt; 
    }
    
    public Address getShippingAddress() {
        return shippingAddress;
    }
    public void setShippingAddress(Address shippingAddress) {
        this.shippingAddress = shippingAddress;
    }
    public Address getBillingAddress() {
        return billingAddress;
    }
    public void setBillingAddress(Address billingAddress) {
        this.billingAddress = billingAddress;
    }
   
}
