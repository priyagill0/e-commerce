package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Order;
import com.example.backend.service.OrderService;



@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "*") // needed to connect frontend
public class OrderController {
    
    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @GetMapping
    public List<Order> getAll() {
        return service.getOrders();
    }

    // Get variants for a specific product
    @GetMapping("/{orderId}")
    public List<Order> getByOrderId(@PathVariable String orderId) {
        return service.getOrderByOrderId(orderId);
    }


    @PostMapping
    public Order add(@RequestBody Order order) {
        return service.addOrder(order);
    }
}
