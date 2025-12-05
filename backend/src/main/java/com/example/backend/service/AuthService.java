package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.AuthRequest;
import com.example.backend.model.Cart;
import com.example.backend.model.Customer;
import com.example.backend.model.PasswordUtil;
import com.example.backend.repository.CartRepository;
import com.example.backend.repository.CustomerRepository;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class AuthService {
    private final CustomerRepository repo;
    private final CartRepository cartRepo;


    public AuthService(CustomerRepository repo, CartRepository cartRepo) {
        this.repo = repo;
        this.cartRepo = cartRepo;
    }

    public Customer register(Customer customer) {
        List<Customer> found = repo.findByEmail(customer.getEmail());
        if (!found.isEmpty()) {
            throw new RuntimeException("Email already exists");
        }

        System.out.println("Registering customer: " + customer.getEmail());
        String hashedPass = PasswordUtil.hashPassword(customer.getPassword());
        customer.setPassword(hashedPass);

        return repo.save(customer); // should also save address
    }

    public Customer login(AuthRequest request, HttpServletRequest http) {
        System.out.println("LOGIN sessionId = " + request.getSessionId());

        List<Customer> list = repo.findByEmail(request.getEmail());
        if (list.isEmpty()) {
            throw new RuntimeException("Invalid email");
        }
        Customer customer = list.get(0);
        String hashedPass = PasswordUtil.hashPassword(request.getPassword());
 
        if (!hashedPass.equals(customer.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
         // store user ID in session (backend decides login state)
         http.getSession().setAttribute("customerId", customer.getUserId());
         System.out.println("Customer " + customer.getEmail() + " with userId: "+ customer.getUserId()+"logged in with session " + http.getSession().getId());
 
        // move cart from guest session → user
        String sessionId = http.getSession().getId();
        Cart sessionCart = cartRepo.findBySessionId(sessionId);

        if (sessionCart != null) {
            sessionCart.setCustomer(customer);
            sessionCart.setSessionId(null);
            cartRepo.save(sessionCart);
        }  
        return customer;
    }
}
