package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.OrderItem;

import com.example.backend.service.OrderItemService;



@RestController
@RequestMapping("/api/oder_item")
public class OrderItemController {
    
    private final OrderItemService service;

    public OrderItemController(OrderItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<OrderItem> getAll() {
        return service.getAllOrderItems();
    }

    // Get variants for a specific product
    @GetMapping("/{orderItemId}")
    public List<OrderItem> getByProductId(@PathVariable String productId) {
        return service.getOrderItemByOrderItemId(productId);
    }


    @PostMapping
    public OrderItem add(@RequestBody OrderItem orderItem) {
        return service.addOrderItem(orderItem);
    }
}
