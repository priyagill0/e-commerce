package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.model.*;
import com.example.backend.repository.*;


@Service
public class CheckoutService {

    private final CartRepository cartRepo;
    private final CustomerService customerService;
    private final CartItemRepository cartItemRepo;
    private final OrderService orderService;
    private final OrderItemService orderItemService;
    private final AddressService addressService;
    private final PaymentService paymentService;
    private final ProductVariantService variantService;
    //private final CustomerService customerService;

    public CheckoutService(
            CartRepository cartRepo,
            CustomerService customerService,
            CartItemRepository cartItemRepo,
            OrderService orderService,
            OrderItemService orderItemService,
            AddressService addressService,
            ProductVariantService variantService,
            PaymentService paymentService
           // CustomerService customerService
    ) {
        this.cartRepo = cartRepo;
        this.cartItemRepo = cartItemRepo;
        this.orderService = orderService;
        this.orderItemService = orderItemService;
        this.addressService = addressService;
        this.variantService = variantService;
        this.customerService = customerService;
        this.paymentService = paymentService;
    }

    public Address getUserAddress(String customerId) {
        // assuming one address per user; adjust if multiple addresses
        
        return customerService.getCustomerById(customerId).getAddress();
    }

    public Payment getUserPayment(String customerId) {
        // assuming one address per user; adjust if multiple addresses
        
        return customerService.getCustomerById(customerId).getPayment();
    }

    public String checkoutOrder(CheckoutRequest req, String customerId)throws InterruptedException {
        Address shippingAddress;
        boolean flag = false;
        Address old = customerService.getCustomerById(customerId).getAddress();
            if(old.getCountry().equals(req.getShippingCountry())&&old.getStreet().equals(req.getShippingStreet()) && old.getPhone().equals(req.getShippingPhone())&& old.getZip().equals(req.getShippingZip()) && old.getProvince().equals(req.getShippingProvince())){
                shippingAddress= old;
                flag= true;
            } else{
                Address address = new Address();
                address.setStreet( req.getShippingStreet());
                address.setProvince( req.getShippingProvince());
                address.setCountry(req.getShippingCountry());
                address.setZip(req.getShippingZip());
                address.setPhone(req.getShippingPhone());
                address.setCity(req.getShippingCity());
                shippingAddress = addressService.addAddress(address);
            }
       
        // Determine billing address
        Address billingAddress;
        if (req.isSameAsShipping()) {
            billingAddress = shippingAddress; // use shipping address
        } else {
            // always create a new billing address, independent of shipping
            Address address = new Address();
            address.setStreet(req.getBillingStreet());
            address.setProvince(req.getBillingProvince());
            address.setCountry(req.getBillingCountry());
            address.setZip(req.getBillingZip());
            address.setPhone(req.getBillingPhone());
            address.setCity(req.getBillingCity());
            billingAddress = addressService.addAddress(address);}
        String creditCardNumber=  req.getCardNumber();
        String name = req.getName();
        String expiryDate=req.getExpiryDate();
        String cvc = req.getCvc();
    
        if (creditCardNumber == null || creditCardNumber.length() != 16 || cvc.length()>3 || expiryDate.length()!= 5 ) {
            return null; // invalid card
        }
        Payment payment = new Payment();

        payment.setCardNumber(creditCardNumber);
        payment.setCvc(cvc);
        payment.setExpiryDate(expiryDate);
        payment.setName(name);
        payment = paymentService.addPayment(payment);
        // simulate payment processing
        Thread.sleep(2000); // 2s delay
        Cart cart = cartRepo.findById(req.getCartId()).orElseThrow(() -> new RuntimeException("Cart not found"));
        // check inventory
        for (CartItem c : cart.getItems()) {
            ProductVariant variant = c.getProductVariant();
            if (c.getQuantityInCart() > variant.getQuantity()) {
                throw new RuntimeException(
                        "Item " + variant.getProduct().getName() + " exceeds available inventory"
                );
            }
        }
        // Create order
        Order order = new Order();
        order.setStatus(Status.Processing);
        order.setSubtotal(cart.getSubtotal());
        order.setTax(cart.getTax());
        order.setShipping(cart.getShipping());
        order.setTotal(cart.getTotal());
        order.setCustomer(cart.getCustomer());
        order.setShippingAddress(shippingAddress);
        order.setBillingAddress(billingAddress);
        order.setPayment(payment);

        orderService.addOrder(order);
         // Create order items and reduce inventory
         for (CartItem c : cart.getItems()) {
            ProductVariant variant = c.getProductVariant();

            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProductVariant(variant);
            oi.setQty(c.getQuantityInCart());
            oi.setProductPrice(variant.getPrice());
            orderItemService.addOrderItem(oi);

            // reduce inventory
            variant.setQuantity(variant.getQuantity() - c.getQuantityInCart());
            variantService.addProductVariant(variant);
        }

        // clear cart
        cartItemRepo.deleteAll(cart.getItems());
        cartRepo.delete(cart);

        return order.getOrderId();


    }
}
