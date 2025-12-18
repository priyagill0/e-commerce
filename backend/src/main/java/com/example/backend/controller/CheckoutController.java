package com.example.backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.example.backend.model.Address;
import com.example.backend.model.CheckoutRequest;
import com.example.backend.model.Order;
import com.example.backend.model.Payment;
import com.example.backend.service.CheckoutService;
import jakarta.servlet.http.HttpServletRequest;



@RestController
@RequestMapping("/api/checkout")

public class CheckoutController {

    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @GetMapping("/address")
    public Address getUserAddress(HttpServletRequest request) {
        String customerId = (String) request.getSession().getAttribute("customerId");
        if (customerId == null) {
            return null; // or throw 401 Unauthorized
        }
        return checkoutService.getUserAddress(customerId);
    }
    @GetMapping("/getpay")
    public Payment getUserPayment(HttpServletRequest request) {
        String customerId = (String) request.getSession().getAttribute("customerId");
        if (customerId == null) {
            return null; // or throw 401 Unauthorized
        }
        return checkoutService.getUserPayment(customerId);
    }

     /**
     * Submit order after payment
     * @param cartId
     * @param shippingAddressId
     * @param billingAddressId - optional
     */
    @PostMapping("/checkoutconfirm")
    public ResponseEntity<?> checkoutOrder( HttpServletRequest request,
            @RequestBody CheckoutRequest req
    
    ) throws Exception {
        String customerId = (String) request.getSession().getAttribute("customerId");
        String orderId = checkoutService.checkoutOrder(req, customerId );
       return ResponseEntity.ok(Map.of("orderId", orderId));
   
    }
}
