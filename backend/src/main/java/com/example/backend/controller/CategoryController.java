package com.example.backend.controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Category;
import com.example.backend.service.CategoryService;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    // Get all categories
    @GetMapping
    public List<Category> getAll() {
        return service.getAllCategories();
    }

    // Get category by id    
    @GetMapping("/{categoryId}")
    public Category getById(@RequestBody String categoryId) {
        return service.getCategoryById(categoryId);
    }


    @PostMapping
    public Category add(@RequestBody Category category) {
        return service.addCategory(category);
    }
}
