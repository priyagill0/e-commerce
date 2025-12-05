package com.example.backend.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Cart;
import com.example.backend.model.CartItem;
import com.example.backend.service.CartItemService;
import com.example.backend.service.CartService;

@RestController
@RequestMapping("/api/cart_item")
public class CartItemController {

    private final CartItemService itemService;
    private final CartService cartService;

    public CartItemController(CartItemService itemService, CartService cartService) {
        this.itemService = itemService;
        this.cartService = cartService;
    }

    @PostMapping("/{cartId}")
    public CartItem addItem(@PathVariable String cartId, @RequestBody CartItem item) {
        Cart cart = cartService.getCart(cartId);
        item.setCart(cart);
        return itemService.save(item);
    }

    @DeleteMapping("/{itemId}")
    public void deleteItem(@PathVariable Long itemId) {
        itemService.delete(itemId);
    }
}
