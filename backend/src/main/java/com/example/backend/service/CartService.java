package com.example.backend.service;

import org.springframework.stereotype.Service;

import com.example.backend.model.Cart;
import com.example.backend.model.CartItem;
import com.example.backend.model.ProductVariant;
import com.example.backend.repository.CartItemRepository;
import com.example.backend.repository.CartRepository;
import com.example.backend.repository.ProductVariantRepository;

import jakarta.transaction.Transactional;

@Service
public class CartService {

    private final CartRepository cartRepo;
    private final ProductVariantRepository variantRepo;
    private final CartItemRepository cartItemRepo;

    public CartService(CartRepository cartRepo, ProductVariantRepository variantRepo, CartItemRepository cartItemRepo) {
        this.cartRepo = cartRepo;
        this.variantRepo = variantRepo;
        this.cartItemRepo = cartItemRepo; 
    }

    public Cart getCart(String id) {
        return cartRepo.findById(id).orElse(null);
    }

    public Cart getCartBySession(String sessionId) {
        return cartRepo.findBySessionId(sessionId);
    }

    public Cart save(Cart cart) {
        return cartRepo.save(cart);
    }

    @Transactional
    public Cart addItemToCart(String sessionId, String variantId, int quantity) {

        Cart cart = cartRepo.findBySessionId(sessionId);

        // Create cart if it does not exist already
        if (cart == null) {
            cart = new Cart();
            cart.setSessionId(sessionId);
            cartRepo.save(cart);
        }

        ProductVariant variant = variantRepo.findById(variantId)
            .orElseThrow(() -> new RuntimeException("Product variant not found."));

        // Check if the item already exists in the cart
        CartItem existingItem = cart.getItems().stream()
                .filter(i -> i.getProductVariant().getVariantId().equals(variantId))
                .findFirst()
                .orElse(null);
        
        // If item already exists in the cart, update quantity
        if (existingItem != null) {
            if(existingItem.getQuantityInCart() + quantity > variant.getQuantity()) {
                throw new RuntimeException("Cannot add more items than available in stock.");
            }
            existingItem.setQuantityInCart(existingItem.getQuantityInCart() + quantity);
            cartItemRepo.save(existingItem);
        } 

        // Otherwise, create a new cart item and add it to the cart.
        else {
            CartItem item = new CartItem();
            item.setCart(cart);
            item.setProductVariant(variant);
            if(quantity > variant.getQuantity()) {
                throw new RuntimeException("Cannot add more items than available in stock.");
            }
            item.setQuantityInCart(quantity);
    
            cart.getItems().add(item);
            cartItemRepo.save(item);
        }

        calculateTotal(cart);

        // Update count for total cart items
        cart.setTotalCartItems(
            cart.getItems().stream().mapToInt(CartItem::getQuantityInCart).sum()
        );

        return cartRepo.save(cart);
    }

    public Cart removeItem(String sessionId, Long itemId) {
        Cart cart = cartRepo.findBySessionId(sessionId);
        if (cart == null) {
            throw new RuntimeException("Cart not found for the given session: " + sessionId);
        }

        CartItem itemToRemove = cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not found in this cart"));
                 
            // Remove item and all its quantities from cart and delete it from repository
            cart.getItems().remove(itemToRemove);
            cartItemRepo.delete(itemToRemove);
 
            // Recalculate totals
            calculateTotal(cart);

            // Update count for total cart items
            cart.setTotalCartItems(
                cart.getItems().stream().mapToInt(CartItem::getQuantityInCart).sum()
            );

            return cartRepo.save(cart); 
    } 

    public Cart updateItemQuantity(String sessionId, Long itemId, int quantity) {
        Cart cart = cartRepo.findBySessionId(sessionId);
        if (cart == null) {
            throw new RuntimeException("Cart not found for the given session: " + sessionId);
        }

        // Find the item in the cart
        CartItem itemToUpdate = cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not found in this cart"));

        // if the item exists, update the quantity and save the cart item
        itemToUpdate.setQuantityInCart(quantity);
        cartItemRepo.save(itemToUpdate);
        // Recalculate totals
        calculateTotal(cart);

        // Update count for total cart items
        cart.setTotalCartItems(
            cart.getItems().stream().mapToInt(CartItem::getQuantityInCart).sum()
        );
        return cartRepo.save(cart);
    }

    public double calculateTotal(Cart cart) {
        // Round all values to 2 decimal places
        double subtotal = cart.getItems().stream()
        .mapToDouble(item -> item.getProductVariant().getPrice() * item.getQuantityInCart())
        .sum();

        subtotal = Math.round(subtotal * 100.0) / 100.0;

        double shipping = subtotal > 100 ? 0 : 8;
        shipping = Math.round(shipping * 100.0) / 100.0;

        // HST is 13% and it is applied on subtotal + shipping
        double tax = (subtotal+shipping) * 0.13;
        tax = Math.round(tax * 100.0) / 100.0;

        double total = subtotal + tax + shipping;
        total = Math.round(total * 100.0) / 100.0;

        cart.setSubtotal(subtotal);
        cart.setTax(tax);
        cart.setShipping(shipping);
        cart.setTotal(total);

        return total;
    }

    // test sessionId
    public Cart getCartBySessionId(String sessionId) {
        return cartRepo.findBySessionId(sessionId);
    }

    public Cart createCartForSession(String sessionId) {
        Cart cart = new Cart();
        cart.setSessionId(sessionId);
        return cartRepo.save(cart);
    }
}
