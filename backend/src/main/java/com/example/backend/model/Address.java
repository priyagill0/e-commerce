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
    private String city;
    private String province;
    private String country;
    private String zip ;
    private String phone;


    public Address() {}

    public Address(String addressId, String street, String province, String country, String zip, String phone, String city ) {
        this.addressId = addressId;
        this.street = street;
        this.province = province;
        this.country = country;
        this.zip  = zip ;
        this.phone  = phone;
        this.city  = city;
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
        return province;
    }
    public void setProvince(String province) {
        this.province = province;
    }
    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
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
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
   
}