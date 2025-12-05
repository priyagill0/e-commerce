package com.example.backend.model;

public class AuthRequest {
    private String email;
    private String password;
    private String sessionId; // needed to add customer to cart

    public AuthRequest(String email, String password, String sessionId) {
        this.email = email;
        this.password = password;
        this.sessionId = sessionId;
    }

    public String getEmail() { return email; }
    public String getPassword() { return password; }

    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; } 

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
}
