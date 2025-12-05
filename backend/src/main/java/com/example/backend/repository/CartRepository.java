package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Cart;

public interface CartRepository extends JpaRepository<Cart, String> {
    Cart findBySessionId(String sessionId);
}