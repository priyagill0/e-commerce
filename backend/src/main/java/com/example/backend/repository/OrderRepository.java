package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Order;

public interface OrderRepository  extends JpaRepository<Order, String> {
    Order findByOrderId(String orderId);
    List<Order> findByCustomer_UserId(String userId);
}