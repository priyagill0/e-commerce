package com.example.backend.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Cart;
import com.example.backend.service.CartService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    // In Spring Boot, HttpSession session can be injected directly into controller methods.
    // This session is tied to the user's session and can be used to track their cart.

    // Get cart by session ID. The session ID is retrieved from the HttpServletRequest.
    @GetMapping
    public Cart getCart(HttpServletRequest request) {
        String sessionId = request.getSession().getId();
        Cart cart = service.getCartBySessionId(sessionId);
    
        if (cart == null) {
            // return empty cart to avoid frontend crash
            Cart empty = new Cart(); 
            return empty;
        }
        return cart;
    }
    


    @PostMapping
    public Cart createCart(@RequestBody Cart cart) {
        return service.save(cart);
    }

    // add a product variant to cart. (this also creates a CartItem if needed)
    @PostMapping("/add")
    public Cart addToCart(HttpServletRequest request, @RequestParam String variantId, @RequestParam int quantity) {
        String sessionId = request.getSession().getId();
        Cart updatedCart = service.addItemToCart(sessionId, variantId, quantity);
        return updatedCart;
    }

    // remove item from cart.
    @DeleteMapping("/item/{itemId}")
    public Cart removeItem(@PathVariable Long itemId, HttpServletRequest request) {
        String sessionId = request.getSession().getId();
        Cart cart = service.removeItem(sessionId, itemId);
        return cart;
    }

    // update item quantity in cart.
    @PutMapping("/item/{itemId}")
    public Cart updateItemQuantity(@PathVariable Long itemId, @RequestParam int quantity, HttpServletRequest request) {
        String sessionId = request.getSession().getId();
        Cart cart = service.updateItemQuantity(sessionId, itemId, quantity);
        return cart;
    }

    // session check
    @GetMapping("/session")
    public String getSession(HttpSession session) {
        return session.getId();
    }
}
