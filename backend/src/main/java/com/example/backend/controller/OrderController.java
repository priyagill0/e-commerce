package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Order;
import com.example.backend.model.Status;
import com.example.backend.service.AdminOrderDTO;
import com.example.backend.service.OrderService;



@RestController
@RequestMapping("/api/order")
//@CrossOrigin(origins = "*") // needed to connect frontend
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
    public Order getByOrderId(@PathVariable String orderId) {
        return service.getOrderByOrderId(orderId);
    }
    @GetMapping("/admin")
    public List<AdminOrderDTO> getAllOrders() {
        return service.getAllAdminOrders();
    }
    @PutMapping("/admin/{orderId}")
    public Order updateStatus(
            @PathVariable String orderId,
            @RequestBody String status) {
            String statusStr= status.replace("\"", "");
            Status status2 = Status.valueOf(statusStr);
        return service.updateOrderStatus(orderId, status2);
    }

    @PostMapping
    public Order add(@RequestBody Order order) {
        return service.addOrder(order);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getByUserId(@PathVariable String userId) {
        return service.getOrdersByUserId(userId);
    }

}
