package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.model.*;
import com.example.backend.repository.*;


@Service
public class CheckoutService {

    private final CartService cartService;
    private final CartItemService cartItemService;
    private final OrderService orderService;
    private final OrderItemService orderItemService;
    private final AddressService addressService;
    private final ProductVariantService variantService;
    //private final CustomerService customerService;

    public CheckoutService(
            CartService cartService,
            CartItemService cartItemService,
            OrderService orderService,
            OrderItemService orderItemService,
            AddressService addressService,
            ProductVariantService variantService
           // CustomerService customerService
    ) {
        this.cartService = cartService;
        this.cartItemService = cartItemService;
        this.orderService = orderService;
        this.orderItemService = orderItemService;
        this.addressService = addressService;
        this.variantService = variantService;
        //this.customerService = customerService;
    }

    /**
     * Save shipping info; if customerId provided, can save to their profile
     */
    public Address saveShippingInfo(String street, String province, String country, String zip, String phone) {
        Address address = new Address();
        address.setStreet(street);
        address.setProvince(province);
        address.setCountry(country);
        address.setZip(zip);
        address.setPhone(phone);
        return addressService.addAddress(address);
}

/**
     * Save shipping info; if customerId provided, can save to their profile
     */
    public Address saveBillingInfo(String street, String province, String country, String zip, String phone) {
        Address address = new Address();
        address.setStreet(street);
        address.setProvince(province);
        address.setCountry(country);
        address.setZip(zip);
        address.setPhone(phone);
        return addressService.addAddress(address);
}
    /**
     * Process payment: validate length (e.g. 16 digits) and simulate delay
     */
    public boolean processPayment( String creditCardNumber,String name, String expiryDate,String cvc
    ) throws InterruptedException {
        if (creditCardNumber == null || creditCardNumber.length() != 16 || cvc.length()>3 || expiryDate.length()!= 5 ) {
            return false; // invalid card
        }

        // this is where we would send to a oayment processor.

        // simulate payment processing
        Thread.sleep(2000); // 2s delay
        return true;
    }

    // /**
    //  * Submit order: creates order, order items, reduces inventory, deletes cart
    //  */
    // @Transactional
    // public String submitOrder(String cartId, Long shippingAddressId, Long billingAddressId) {

    //     Cart cart = cartRepo.findById(cartId)
    //             .orElseThrow(() -> new RuntimeException("Cart not found"));

    //     Address shipping = addressRepo.findById(shippingAddressId)
    //             .orElseThrow(() -> new RuntimeException("Shipping address not found"));

    //     Address billing = (billingAddressId != null)
    //             ? addressRepo.findById(billingAddressId)
    //                 .orElseThrow(() -> new RuntimeException("Billing address not found"))
    //             : shipping; // use shipping if billing not provided

    //     // check inventory
    //     for (CartItem c : cart.getItems()) {
    //         ProductVariant variant = c.getProductVariant();
    //         if (c.getQuantityInCart() > variant.getInventoryLevel()) {
    //             throw new RuntimeException(
    //                     "Item " + variant.getProduct().getName() + " exceeds available inventory"
    //             );
    //         }
    //     }

    //     // Create order
    //     Order order = new Order();
    //     order.setStatus(Status.CONFIRMED);
    //     order.setSubtotal(cart.getSubtotal());
    //     order.setTax(cart.getTax());
    //     order.setShipping(cart.getShipping());
    //     order.setTotal(cart.getTotal());
    //     order.setCustomer(cart.getCustomer());
    //     order.setShippingAddress(shipping);
    //     order.setBillingAddress(billing);

    //     orderRepo.save(order);

    //     // Create order items and reduce inventory
    //     for (CartItem c : cart.getItems()) {
    //         ProductVariant variant = c.getProductVariant();

    //         OrderItem oi = new OrderItem();
    //         oi.setOrder(order);
    //         oi.setProductVariant(variant);
    //         oi.setQty(c.getQuantityInCart());
    //         oi.setProductPrice(variant.getPrice());
    //         orderItemRepo.save(oi);

    //         // reduce inventory
    //         variant.setInventoryLevel(variant.getInventoryLevel() - c.getQuantityInCart());
    //         variantRepo.save(variant);
    //     }

    //     // clear cart
    //     cartItemRepo.deleteAll(cart.getItems());
    //     cartRepo.delete(cart);

    //     return order.getOrderId();
    // }
}
