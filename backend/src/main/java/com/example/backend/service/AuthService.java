package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.AuthRequest;
import com.example.backend.model.Customer;
import com.example.backend.model.PasswordUtil;
import com.example.backend.repository.CustomerRepository;

@Service
public class AuthService {
    private final CustomerRepository repo;


    public AuthService(CustomerRepository repo) {
        this.repo = repo;
    }

    public Customer register(Customer customer) {
        List<Customer> found = repo.findByEmail(customer.getEmail());
        if (!found.isEmpty()) {
            throw new RuntimeException("Email already exists");
        }

        String hashedPass = PasswordUtil.hashPassword(customer.getPassword());
        customer.setPassword(hashedPass);

        return repo.save(customer); // should also save address
    }

    public Customer login(AuthRequest request) {
        List<Customer> list = repo.findByEmail(request.getEmail());
        if (list.isEmpty()) {
            throw new RuntimeException("Invalid email");
        }
        Customer customer = list.get(0);
        String hashedPass = PasswordUtil.hashPassword(request.getPassword());

        if (!hashedPass.equals(customer.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return customer;
    }
}
