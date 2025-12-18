package com.example.backend.controller;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Product;
import com.example.backend.model.ProductType;
import com.example.backend.model.ProductVariant;
import com.example.backend.service.ProductService;
import com.example.backend.service.ProductVariantService;
import com.example.backend.service.ProductWithVariantDto;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService service;
    private final ProductVariantService variantService;

    public ProductController(ProductService service, ProductVariantService variantService) {
        this.service = service;
        this.variantService = variantService;
    }

    // Get all products
    @GetMapping
    public List<Product> getAll() {
        return service.getAllProducts();
    }

    // get all product types and labels
    @GetMapping("/types")
    public List<Map<String, String>> getProductTypes() {
        return Arrays.stream(ProductType.values())
                .map(t -> Map.of("value", t.name(), "label", t.getLabel()))
                .toList();
    }

    // Get product by id    
    @GetMapping("/{productId}")
    public Product getById(@PathVariable String productId) {
        return service.getProductById(productId);
    }


    @PostMapping
    public Product add(@RequestBody Product product) {
        return service.addProduct(product);
    }

    @PostMapping("/addProductWithVariant")
    public ProductVariant addProductWithVariant(@RequestBody ProductWithVariantDto dto) {
        return variantService.addProductWithVariant(dto);
    }

    // get related products for a given product id 
    @GetMapping("/related/{productId}")
    public List<Product> getRelatedProducts(@PathVariable String productId) {
        return service.getRelatedProducts(productId);
    }

    // delete product (uncomment if needed, it deletes all its variants and images too !! )
    // @DeleteMapping("/{productId}")
    // public Product delete(@PathVariable String productId) {
    //     return service.deleteProductById(productId);
    // }


}
