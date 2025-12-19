package com.example.backend.controller;

import com.example.backend.model.Customer;
import com.example.backend.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
// @CrossOrigin(origins = "*")
@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
public class CustomerController {
    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return service.getAllCustomers();
    }

    @GetMapping("/{id}")
    public Customer getCustomer(@PathVariable String id) {
        return service.getCustomerById(id);
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return service.saveCustomer(customer);
    }

    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable String id, @RequestBody Customer customer) {
        return service.updateCustomer(id, customer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable String id) {
        service.deleteCustomer(id);
    }
}
