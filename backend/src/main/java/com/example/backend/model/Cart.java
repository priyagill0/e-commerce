package com.example.backend.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Cart {

    @Id
    @Column(name = "cart_id", nullable = false, unique = true)
    private String cartId = UUID.randomUUID().toString();

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private String sessionId;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<CartItem> items = new ArrayList<>();

    private int totalCartItems; // total number of items in cart (all quantities summed)

    private double subtotal;  
    private double tax;  
    private double shipping;
    private double total;  

    // GETTERS + SETTERS
    public String getCartId() {
        return cartId;
    }

    public void setCartId(String id) {
        this.cartId = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
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

    public double getShipping() {
        return shipping;
    }

    public void setShipping(double shipping) {
        this.shipping = shipping;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public int getTotalCartItems() {
        return totalCartItems;
    }
    
    public void setTotalCartItems(int totalCartItems) {
        this.totalCartItems = totalCartItems;
    }
}
