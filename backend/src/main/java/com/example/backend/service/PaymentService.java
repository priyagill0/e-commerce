package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.Payment;

import com.example.backend.repository.PaymentRepository;


@Service
public class PaymentService {
    private final PaymentRepository repo;

    public PaymentService(PaymentRepository repo) {
        this.repo = repo;
    }

    public Payment getPaymentByPaymentId(String paymentId) {
        return repo.findByPaymentId(paymentId);
    }
    public List<Payment> getPaymentByCardNumber(String cardNumber) {
        return repo.findByCardNumber(cardNumber);
    }

    public Payment addPayment(Payment payment) {
        return repo.save(payment);
    }

}