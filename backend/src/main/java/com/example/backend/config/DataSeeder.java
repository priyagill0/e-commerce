package com.example.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.backend.model.Product;
import com.example.backend.model.ProductType;
import com.example.backend.model.ProductVariant;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.ProductVariantRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductVariantRepository variantRepository;

    @Override
    public void run(String... args) throws Exception {

        // Prevent duplicate seeding
        if (productRepository.count() > 0) {
            return;
        }

        // ============================================================
        // PRODUCT 1: Exfoliating Toner
        // ============================================================

        Product toner = new Product();
        toner.setProductId("85e49839-6a46-4324-af8a-e0fbe0387a9a");
        toner.setName("Exfoliating Toner");
        toner.setDescription("A gentle exfoliating toner that removes dead skin cells and promotes a radiant complexion.");
        toner.setProductType(ProductType.TONER);
        toner.setBrand("The Ordinary");
        productRepository.save(toner); // UUID auto-generated



        ProductVariant tonerVariant1 = new ProductVariant(toner.getProductId(), "240 mL", 12.99, 30, 0);
        tonerVariant1.setVariantId("b1c2d3e4-f5a6-7890-b1c2-d3e4f5a67890");
        variantRepository.save(tonerVariant1);

        ProductVariant tonerVariant2 = new ProductVariant(toner.getProductId(), "100 mL (Travel Size)", 6.99, 15, 1);
        tonerVariant2.setVariantId("c2d3e4f5-a678-90b1-c2d3-e4f5a67890b1");
        variantRepository.save(tonerVariant2);



        // ============================================================
        // PRODUCT 2: Gentle Face Wash
        // ============================================================

        Product faceWash = new Product();
        faceWash.setProductId("d4e5f6a7-b8c9-1234-d5e6-f7a8b9c01234");
        faceWash.setName("Gentle Face Wash");
        faceWash.setDescription("A gentle face wash suitable for all skin types.");
        faceWash.setProductType(ProductType.FACE_WASH);
        faceWash.setBrand("CeraVe");
        productRepository.save(faceWash);

        // Variants
        ProductVariant faceWashVariant1 = new ProductVariant(faceWash.getProductId(), "200 mL", 10.99, 25, 0);
        faceWashVariant1.setVariantId("f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67890");
        variantRepository.save(faceWashVariant1);

        ProductVariant faceWashVariant2 = new ProductVariant(faceWash.getProductId(), "100 mL Travel Size", 6.49, 10, 1);
        faceWashVariant2.setVariantId("a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890");
        variantRepository.save(faceWashVariant2);
        
    }
}
