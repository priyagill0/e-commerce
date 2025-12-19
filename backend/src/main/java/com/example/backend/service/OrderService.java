package com.example.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.backend.model.Order;
import com.example.backend.model.Status;
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

    
    public Order getOrderByOrderId(String orderId) {
        return repo.findByOrderId(orderId);
    }

    public Order addOrder(Order order) {
        return repo.save(order);
    }
    public List<AdminOrderDTO> getAllAdminOrders() {
        return repo.findAll().stream()
            .map(this::toAdminDTO)
            .collect(Collectors.toList());
    }

    private AdminOrderDTO toAdminDTO(Order o) {
        AdminOrderDTO dto = new AdminOrderDTO();

        dto.setOrderId(o.getOrderId());
        dto.setStatus(o.getStatus().name());
        dto.setSubtotal(o.getSubtotal());
        dto.setTax(o.getTax());
        dto.setShipping(o.getShipping());
        dto.setTotal(o.getTotal());
        dto.setPlacedAt(o.getPlacedAt());

        dto.setCustomerEmail(o.getCustomer().getEmail());

        // Billing address
        dto.setBillingStreet(o.getBillingAddress().getStreet());
        dto.setBillingCity(o.getBillingAddress().getCity());
        dto.setBillingState(o.getBillingAddress().getProvince());
        dto.setBillingZip(o.getBillingAddress().getZip());
        dto.setBillingCountry(o.getBillingAddress().getCountry());

        // Shipping address
        dto.setShippingStreet(o.getShippingAddress().getStreet());
        dto.setShippingCity(o.getShippingAddress().getCity());
        dto.setShippingState(o.getShippingAddress().getProvince());
        dto.setShippingZip(o.getShippingAddress().getZip());
        dto.setShippingCountry(o.getShippingAddress().getCountry());

        return dto;
    }

    public Order updateOrderStatus(String orderId, Status status) {
            Order order = repo.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));

            order.setStatus(status);
            return repo.save(order);
    }
    

    public List<Order> getOrdersByUserId(String userId){
        return repo.findByCustomer_UserId(userId);
    }

}