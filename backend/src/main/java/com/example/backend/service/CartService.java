package com.example.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.model.Cart;
import com.example.backend.model.CartItem;
import com.example.backend.model.Customer;
import com.example.backend.model.ProductVariant;
import com.example.backend.repository.CartItemRepository;
import com.example.backend.repository.CartRepository;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.repository.ProductVariantRepository;

import jakarta.transaction.Transactional;

@Service
public class CartService {

    private final CartRepository cartRepo;
    private final ProductVariantRepository variantRepo;
    private final CartItemRepository cartItemRepo;
    private final CustomerRepository customerRepo;

    public CartService(CartRepository cartRepo, ProductVariantRepository variantRepo, CartItemRepository cartItemRepo, CustomerRepository customerRepo) {
        this.cartRepo = cartRepo;
        this.variantRepo = variantRepo;
        this.cartItemRepo = cartItemRepo; 
        this.customerRepo = customerRepo;
    }

    public Cart getCart(String id) { 
        return cartRepo.findById(id).orElse(null);
    }

    public Cart getCartBySession(String sessionId, String customerId) {
        System.out.println("CustomerID: " + customerId);

        // If logged in → use customerId
        if (customerId != null) {
            List<Cart> carts = cartRepo.findByCustomerUserId(customerId);
            if (!carts.isEmpty()) return carts.get(0);

            // If no cart, create a new cart for user
            Cart newCart = new Cart();
            Customer c = customerRepo.findById(customerId).orElseThrow();
            System.out.println("Creating new cart for customer: " + c.getEmail());
            newCart.setCustomer(c);
            System.out.println("New cart created for customer: " + c.getEmail());
            return cartRepo.save(newCart);
        }

        // if guest → use sessionId
        Cart cart = cartRepo.findBySessionId(sessionId);
        if (cart != null) return cart;

        // create a guest cart if there is no cart
        Cart newGuestCart = new Cart();
        newGuestCart.setSessionId(sessionId);
        return cartRepo.save(newGuestCart);  
    }

    public Cart save(Cart cart) {
        return cartRepo.save(cart);
    }

    @Transactional
    public Cart addItemToCart(String sessionId, String customerId, String variantId, int quantity){

        Cart cart; 

        if (customerId != null) {
            // Logged in → use their cart
            List<Cart> carts = cartRepo.findByCustomerUserId(customerId);
            if (!carts.isEmpty()) {
                cart = carts.get(0);
            } else {
                // Create new cart for logged-in user
                cart = new Cart();
                cart.setCustomer(customerRepo.findById(customerId).orElseThrow());
                cart = cartRepo.save(cart);
            }
        } else {
            // Guest → use session cart
            cart = cartRepo.findBySessionId(sessionId);
    
            if (cart == null) {
                cart = new Cart();
                cart.setSessionId(sessionId);
                cart = cartRepo.save(cart);
            }
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
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only " + variant.getQuantity() + " items are available in stock."
                );                }
            existingItem.setQuantityInCart(existingItem.getQuantityInCart() + quantity);
            cartItemRepo.save(existingItem);
        } 

        // Otherwise, create a new cart item and add it to the cart.
        else {
            CartItem item = new CartItem();
            item.setCart(cart);
            item.setProductVariant(variant);
            if(quantity > variant.getQuantity()) {
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only " + variant.getQuantity() + " items are available in stock."
                );                }
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

    public Cart removeItem(String sessionId, String customerId, Long itemId) {
        Cart cart;
        if (customerId != null) {
            // logged-in user
            cart = cartRepo.findByCustomerUserId(customerId).stream().findFirst().orElse(null);
        } else {
            // guest
            cart = cartRepo.findBySessionId(sessionId);
        }
    
        if (cart == null) return new Cart(); // safe fallback
    
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

    public Cart updateItemQuantity(String sessionId, String customerId, Long itemId, int quantity) {
        // Cart cart = cartRepo.findBySessionId(sessionId);
        // if (cart == null) {
        //     throw new RuntimeException("Cart not found for the given session: " + sessionId);
        // }
        Cart cart;
        if (customerId != null) {
            // logged-in user
            cart = cartRepo.findByCustomerUserId(customerId).stream().findFirst().orElse(null);
        } else {
            // guest
            cart = cartRepo.findBySessionId(sessionId);
        }
    
        if (cart == null) return new Cart(); // safe fallback
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
