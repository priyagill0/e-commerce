package com.example.backend.service;

import org.springframework.stereotype.Service;
import com.example.backend.model.CartItem;
import com.example.backend.repository.CartItemRepository;

@Service
public class CartItemService {

    private final CartItemRepository repo;

    public CartItemService(CartItemRepository repo) {
        this.repo = repo;
    }

    public CartItem save(CartItem item) {
        return repo.save(item);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
