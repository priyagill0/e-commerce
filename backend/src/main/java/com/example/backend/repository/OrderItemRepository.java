package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.backend.model.OrderItem;

public interface OrderItemRepository  extends JpaRepository<OrderItem, String> {
    List<OrderItem> findByOrderItemId(String orderItemId);
}