package com.example.backend.service;

import java.time.LocalDateTime;

public class AdminOrderDTO {

    private String orderId;
    private String status;

    private double subtotal;
    private double tax;
    private double shipping;
    private double total;

    private LocalDateTime placedAt;

    // Customer
    private String customerEmail;

    // Billing Address
    private String billingStreet;
    private String billingCity;
    private String billingState;
    private String billingZip;
    private String billingCountry;

    // Shipping Address
    private String shippingStreet;
    private String shippingCity;
    private String shippingState;
    private String shippingZip;
    private String shippingCountry;

    public AdminOrderDTO() {}

    // getters & setters
    // Order info
public String getOrderId() {
    return orderId;
}

public void setOrderId(String orderId) {
    this.orderId = orderId;
}

public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}

// Pricing
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

// Dates
public LocalDateTime getPlacedAt() {
    return placedAt;
}

public void setPlacedAt(LocalDateTime placedAt) {
    this.placedAt = placedAt;
}

// Customer
public String getCustomerEmail() {
    return customerEmail;
}

public void setCustomerEmail(String customerEmail) {
    this.customerEmail = customerEmail;
}

// Billing Address
public String getBillingStreet() {
    return billingStreet;
}

public void setBillingStreet(String billingStreet) {
    this.billingStreet = billingStreet;
}

public String getBillingCity() {
    return billingCity;
}

public void setBillingCity(String billingCity) {
    this.billingCity = billingCity;
}

public String getBillingState() {
    return billingState;
}

public void setBillingState(String billingState) {
    this.billingState = billingState;
}

public String getBillingZip() {
    return billingZip;
}

public void setBillingZip(String billingZip) {
    this.billingZip = billingZip;
}

public String getBillingCountry() {
    return billingCountry;
}

public void setBillingCountry(String billingCountry) {
    this.billingCountry = billingCountry;
}

// Shipping Address
public String getShippingStreet() {
    return shippingStreet;
}

public void setShippingStreet(String shippingStreet) {
    this.shippingStreet = shippingStreet;
}

public String getShippingCity() {
    return shippingCity;
}

public void setShippingCity(String shippingCity) {
    this.shippingCity = shippingCity;
}

public String getShippingState() {
    return shippingState;
}

public void setShippingState(String shippingState) {
    this.shippingState = shippingState;
}

public String getShippingZip() {
    return shippingZip;
}

public void setShippingZip(String shippingZip) {
    this.shippingZip = shippingZip;
}

public String getShippingCountry() {
    return shippingCountry;
}

public void setShippingCountry(String shippingCountry) {
    this.shippingCountry = shippingCountry;
}

}
