package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Category;

public interface CategoryRepository extends JpaRepository<Category, String> {
 
        Optional<Category> findByName(String name);
    
}
