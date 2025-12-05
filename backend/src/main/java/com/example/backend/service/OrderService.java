package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.Order;

import com.example.backend.repository.OrderRepository;


@Service
public class OrderService {
    private final OrderRepository repo;

    public OrderService(OrderRepository repo) {
        this.repo = repo;
    }

    public List<Order> getOrders() {
        return repo.findAll();
    }

    
    public List<Order> getOrderByOrderId(String orderId) {
        return repo.findByOrderId(orderId);
    }

    public Order addOrder(Order order) {
        return repo.save(order);
    }

}