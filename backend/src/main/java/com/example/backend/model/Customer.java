package com.example.backend.model;

import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @Column(name = "user_id", nullable = false, unique = true)
    private String userId = UUID.randomUUID().toString();

    private String firstName;
    private String lastName;
    private String email; 
    private String password;

    @ManyToOne(cascade = CascadeType.ALL) // address is always saved/updated along with customer.
    @JoinColumn(name = "address_id", nullable = true) // foreign key, many to one
    private Address address;



    public Customer() {}

    public Customer(String userId,String firstName, String lastName, String email , String password, Address address ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName= lastName;
        this.email = email;
        this.password= password;
        this.address = address;

    }
    public String getUserId(){
        return userId;
    }

   
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
     public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Address getAddress() {
        return address;
    }
    public void setAddress(Address address) {
        this.address = address;
    }
   
}