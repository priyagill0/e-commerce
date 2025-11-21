package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Address;
import com.example.backend.service.AddressService;



@RestController
@RequestMapping("/api/address")
public class AddressController {
    
    private final AddressService service;

    public AddressController(AddressService service) {
        this.service = service;
    }

    @GetMapping
    public List<Address> getAll() {
        return service.getAllAddresses();
    }

    @GetMapping("/{addressId}")
    public List<Address> getByAddressId(@PathVariable String addressId) {
        return service.getAddressByAddressId(addressId);
    }


    @PostMapping
    public Address add(@RequestBody Address address) {
        return service.addAddress(address);
    }
}
