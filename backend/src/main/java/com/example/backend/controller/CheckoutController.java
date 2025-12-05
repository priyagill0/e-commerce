package com.example.backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.example.backend.model.Address;
import com.example.backend.service.CheckoutService;


@RestController
@RequestMapping("/api/checkout")

public class CheckoutController {

    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    /**
     * Save shipping info
     */
    @PostMapping("/shipping")
    public String saveShipping(
            @RequestParam String street,
            @RequestParam String province,
            @RequestParam String country,
            @RequestParam String zip,
            @RequestParam String phone
            ) {
        Address address = checkoutService.saveShippingInfo(
                street, province, country, zip, phone
        );
        return  address.getAddressId();
    }

    @PostMapping("/billing")
    public String saveBilling(
            @RequestParam String street,
            @RequestParam String province,
            @RequestParam String country,
            @RequestParam String zip,
            @RequestParam String phone
            ) {
        Address address = checkoutService.saveBillingInfo(
                street, province, country, zip, phone
        );
        return  address.getAddressId();
    }
    /**
     * Process payment
     
     */
    @PostMapping("/payment")
    public boolean processPayment( 
        @RequestParam String creditCardNumber,
        @RequestParam String name ,
        @RequestParam String expiryDate,
        @RequestParam String cvc
    ) throws Exception {
        boolean approved = checkoutService.processPayment(creditCardNumber, name, expiryDate, cvc );

       return approved;
    }

    // /**
    //  * Submit order after payment
    //  * @param cartId
    //  * @param shippingAddressId
    //  * @param billingAddressId - optional
    //  */
    // @PostMapping("/submit")
    // public ResponseEntity<Map<String, Object>> submitOrder(
    //         @RequestParam String cartId,
    //         @RequestParam Long shippingAddressId,
    //         @RequestParam(required = false) Long billingAddressId
    // ) {
    //     String orderId = checkoutService.submitOrder(cartId, shippingAddressId, billingAddressId);
    //     return ResponseEntity.ok(Map.of("orderId", orderId, "message", "Order confirmed"));
    // }
}
