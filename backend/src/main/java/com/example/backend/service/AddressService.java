package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.Address;
import com.example.backend.repository.AddressRepository;


@Service
public class AddressService {
    private final AddressRepository repo;

    public AddressService(AddressRepository repo) {
        this.repo = repo;
    }

    public List<Address> getAllAddresses() {
        return repo.findAll();
    }

    
    public List<Address> getAddressByAddressId(String addressId) {
        return repo.findByAddressId(addressId);
    }

    public Address addAddress(Address address) {
        return repo.save(address);
    }

}