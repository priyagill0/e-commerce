package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Cart;

public interface CartRepository extends JpaRepository<Cart, String> {
    Cart findBySessionId(String sessionId);

    List<Cart> findByCustomerUserId(String customerId);
}