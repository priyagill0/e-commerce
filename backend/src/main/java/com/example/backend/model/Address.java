package com.example.backend.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "address")
public class Address {

    @Id
    @Column(name = "address_id", nullable = false, unique = true)
    private String addressId = UUID.randomUUID().toString();

    private String street;
    private String Province;
    private String Country;
    private String zip ;
    private String phone;


    public Address() {}

    public Address(String addressId, String street, String Province, String Country, String zip, String phone ) {
        this.addressId = addressId;
        this.street = street;
        this.Province = Province;
        this.Country = Country;
        this.zip  = zip ;
        this.phone  = phone;
    }

    public String getAddressId() {
        return addressId;
    }
    public void setAddressId(String addressId) {
        this.addressId = addressId;
    }
    public String getStreet() {
        return street;
    }
    public void setStreet(String street) {
        this.street = street;
    }
     public String getProvince() {
        return Province;
    }
    public void setProvince(String Province) {
        this.Province = Province;
    }
    public String getCountry() {
        return Country;
    }
    public void setCountry(String Country) {
        this.Country = Country;
    }
    public String getZip() {
        return zip;
    }
    public void setZip(String zip) {
        this.zip = zip;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
   
}