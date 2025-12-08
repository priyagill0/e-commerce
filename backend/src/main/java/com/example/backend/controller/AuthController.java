package com.example.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.AuthRequest;
import com.example.backend.model.Customer;
import com.example.backend.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
// @CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/signup")
    public Customer register(@RequestBody Customer user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public Customer login(@RequestBody AuthRequest request, HttpServletRequest http) {
        return service.login(request, http);
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        request.getSession().invalidate();
    }
}
