package com.example.backend.controller;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Product;
import com.example.backend.service.ProductService;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = "*") // needed to connect frontend
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // get all products
    @GetMapping
    public List<Product> getAll() {
        return service.getAllProducts();
    }

    // get product by id    
    @GetMapping("/{productId}")
    public Product getById(@RequestBody String productId) {
        return service.getProductById(productId);
    }


    @PostMapping
    public Product add(@RequestBody Product product) {
        return service.addProduct(product);
    }

    // delete product (uncomment if needed, it deletes all its variants and images too !! )
    // @DeleteMapping("/{productId}")
    // public Product delete(@PathVariable String productId) {
    //     return service.deleteProductById(productId);
    // }


}
