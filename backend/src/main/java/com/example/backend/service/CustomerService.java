package com.example.backend.service;

import com.example.backend.model.Customer;
import com.example.backend.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    private final CustomerRepository repo;

    public CustomerService(CustomerRepository repo) {
        this.repo = repo;
    }

    public List<Customer> getAllCustomers() {
        return repo.findAll();
    }

    public Customer getCustomerById(String id) {
        List<Customer> list = repo.findAll()
            .stream()
            .filter(c -> c.getUserId().equals(id))
            .toList();
        if (list.isEmpty()) {
            throw new RuntimeException("Customer not found");
        }
        return list.get(0);
    }

    public Customer saveCustomer(Customer customer) {
        return repo.save(customer);
    }

    public Customer updateCustomer(String id, Customer updated) {
        Customer exists = getCustomerById(id);

        exists.setFirstName(updated.getFirstName());
        exists.setLastName(updated.getLastName());
        exists.setEmail(updated.getEmail());
        exists.setAddress(updated.getAddress());
        exists.setPassword(updated.getPassword());
        exists.setPayment(updated.getPayment());

        return repo.save(exists);
    }

    public void deleteCustomer(String id) {
        repo.deleteById(id);
    }
}
