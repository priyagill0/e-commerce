package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Address;

public interface AddressRepository  extends JpaRepository<Address, String> {
    List<Address> findByAddressId(String addressId);
}