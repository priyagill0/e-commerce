package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.Category;
import com.example.backend.repository.CategoryRepository;

@Service
public class CategoryService {
    private final CategoryRepository repo;

    public CategoryService(CategoryRepository repo) {
        this.repo = repo;
    }

    public List<Category> getAllCategories() {
        return repo.findAll();
    }

    public Category getCategoryById(String categoryId) {
        return repo.findById(categoryId)
        .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public Category addCategory(Category category) {
        return repo.save(category);
    }

    public void deleteCategory(String categoryId) {
        repo.deleteById(categoryId);
    }
}
