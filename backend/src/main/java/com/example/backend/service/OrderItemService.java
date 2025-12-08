package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.OrderItem;
import com.example.backend.repository.OrderItemRepository;



@Service
public class OrderItemService {
    private final OrderItemRepository repo;

    public OrderItemService(OrderItemRepository repo) {
        this.repo = repo;
    }

    public List<OrderItem> getAllOrderItems() {
        return repo.findAll();
    }

    
    public List<OrderItem> getOrderItemByOrderItemId(String orderItemId) {
        return repo.findByOrderItemId(orderItemId);
    }
    public List<OrderItem> getOrderItemByOrderId(String orderId) {
        return repo.findByOrder_OrderId(orderId);
    }

    public OrderItem addOrderItem(OrderItem orderItem) {
        return repo.save(orderItem);
    }

}