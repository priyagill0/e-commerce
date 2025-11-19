package com.example.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.backend.model.Product;
import com.example.backend.model.ProductImage;
import com.example.backend.model.ProductType;
import com.example.backend.model.ProductVariant;
import com.example.backend.repository.ProductImageRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.ProductVariantRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductVariantRepository variantRepository;

    @Autowired
    private ProductImageRepository imageRepository;

    @Override
    public void run(String... args) throws Exception {

        // Prevent duplicate seeding
        if (productRepository.count() > 0) {
            return;
        }

        // ============================================================
        // PRODUCT 1: Exfoliating Toner
        // ============================================================

        Product exfoliatingToner = new Product();
        exfoliatingToner.setProductId("85e49839-6a46-4324-af8a-e0fbe0387a9a");
        exfoliatingToner.setName("Exfoliating Toner");
        exfoliatingToner.setDescription("A gentle exfoliating toner (7% Glycolic Acid) that removes dead skin cells and promotes a radiant complexion.");
        exfoliatingToner.setProductType(ProductType.TONER);
        exfoliatingToner.setBrand("The Ordinary");
        productRepository.save(exfoliatingToner); // UUID auto-generated

        // Variants
        ProductVariant exfoliatingTonerVariant1 = new ProductVariant(exfoliatingToner, "240 mL", 12.99, 30, 0);
        exfoliatingTonerVariant1.setVariantId("b1c2d3e4-f5a6-7890-b1c2-d3e4f5a67890");
        variantRepository.save(exfoliatingTonerVariant1);

        ProductVariant exfoliatingTonerVariant2 = new ProductVariant(exfoliatingToner, "100 mL (Travel Size)", 6.99, 15, 1);
        exfoliatingTonerVariant2.setVariantId("c2d3e4f5-a678-90b1-c2d3-e4f5a67890b1");
        variantRepository.save(exfoliatingTonerVariant2);

        // images
        ProductImage exfoliatingTonerImage1 = new ProductImage(exfoliatingToner, exfoliatingTonerVariant1);
        exfoliatingTonerImage1.setImageId("11b2056a");
        exfoliatingTonerImage1.setImageUrl("/assets/products/"+ exfoliatingToner.getProductId()+ "/11b2056a.jpg");

        ProductImage exfoliatingTonerImage2 = new ProductImage(exfoliatingToner, exfoliatingTonerVariant1);
        exfoliatingTonerImage2.setImageId("4921635c");
        exfoliatingTonerImage2.setImageUrl("/assets/products/"+ exfoliatingToner.getProductId()+ "/4921635c.jpg");

        ProductImage exfoliatingTonerImage3 = new ProductImage(exfoliatingToner, exfoliatingTonerVariant1);
        exfoliatingTonerImage3.setImageId("c5ffe4dd");
        exfoliatingTonerImage3.setImageUrl("/assets/products/"+ exfoliatingToner.getProductId()+ "/c5ffe4dd.jpg");
        imageRepository.save(exfoliatingTonerImage1);
        imageRepository.save(exfoliatingTonerImage2);
        imageRepository.save(exfoliatingTonerImage3);


        // ============================================================
        // PRODUCT 2: Foaming Facial Cleanser
        // ============================================================

        Product foamingFaceWash = new Product();
        foamingFaceWash.setProductId("d4e5f6a7-b8c9-1234-d5e6-f7a8b9c01234");
        foamingFaceWash.setName("Foaming Facial Cleanser");
        foamingFaceWash.setDescription("A foaming face wash that is suitable for normal to oily skin types, effectively removing dirt and excess oil.");
        foamingFaceWash.setProductType(ProductType.FACE_WASH);
        foamingFaceWash.setBrand("CeraVe");
        productRepository.save(foamingFaceWash);

        // Variants
        ProductVariant foamingFaceWashVariant1 = new ProductVariant(foamingFaceWash, "355 mL", 10.99, 25, 0);
        foamingFaceWashVariant1.setVariantId("f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67890");
        variantRepository.save(foamingFaceWashVariant1);

        ProductVariant foamingFaceWashVariant2 = new ProductVariant(foamingFaceWash, "100 mL Travel Size", 6.49, 10, 1);
        foamingFaceWashVariant2.setVariantId("a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890");
        variantRepository.save(foamingFaceWashVariant2);

        // images
        ProductImage foamingFaceWashImage1 = new ProductImage(foamingFaceWash, foamingFaceWashVariant1);
        foamingFaceWashImage1.setImageId("8f2bcf50");
        foamingFaceWashImage1.setImageUrl("/assets/products/"+ foamingFaceWash.getProductId()+ "/8f2bcf50.jpg");

        ProductImage foamingFaceWashImage2 = new ProductImage(foamingFaceWash, foamingFaceWashVariant1);
        foamingFaceWashImage2.setImageId("ed722469");
        foamingFaceWashImage2.setImageUrl("/assets/products/"+ foamingFaceWash.getProductId()+ "/ed722469.jpg");

        ProductImage foamingFaceWashImage3 = new ProductImage(foamingFaceWash, foamingFaceWashVariant1);
        foamingFaceWashImage3.setImageId("f049157c");
        foamingFaceWashImage3.setImageUrl("/assets/products/"+ foamingFaceWash.getProductId()+ "/f049157c.jpg");

        imageRepository.save(foamingFaceWashImage1);
        imageRepository.save(foamingFaceWashImage2);
        imageRepository.save(foamingFaceWashImage3);

        // ============================================================
        // PRODUCT 3: Pimple Patches
        // ============================================================
        Product pimplePatch = new Product();
        pimplePatch.setProductId("a4c1f8e2-3c6b-4c1d-b2e7-0f5486c6c1df");
        pimplePatch.setName("Pimple Patches");
        pimplePatch.setDescription("Salicylic Acid pimple patches that help to absorb excess oil and protect blemishes from external irritants.");
        pimplePatch.setProductType(ProductType.SPOT_TREATMENT);
        pimplePatch.setBrand("Peace Out");
        productRepository.save(pimplePatch);

        // Variants
        ProductVariant pimplePatchSmallPack = new ProductVariant(pimplePatch, "1 pack / 20 dots", 27.00, 30, 0);
        pimplePatchSmallPack.setVariantId("3c2f4b7e-9a41-4c2d-9c34-2be1447fb3aa");
        variantRepository.save(pimplePatchSmallPack);

        ProductVariant pimplePatchBigPack = new ProductVariant(pimplePatch, "1 pack / 40 dots", 45.00, 20, 1);
        pimplePatchBigPack.setVariantId("d9f2bb74-1ee4-4bf0-94c7-2a8a14459e3e");
        variantRepository.save(pimplePatchBigPack);

        // images
        ProductImage pimplePatchSmallPackImg = new ProductImage(pimplePatch, pimplePatchSmallPack);
        pimplePatchSmallPackImg.setImageId("d81ac3f4");
        pimplePatchSmallPackImg.setImageUrl("/assets/products/"+ pimplePatch.getProductId()+ "/d81ac3f4.jpg");

        ProductImage pimplePatchBigPackImg = new ProductImage(pimplePatch, pimplePatchBigPack);
        pimplePatchBigPackImg.setImageId("9eb24d6a");
        pimplePatchBigPackImg.setImageUrl("/assets/products/"+ pimplePatch.getProductId()+ "/9eb24d6a.jpg");
 
        imageRepository.save(pimplePatchSmallPackImg);
        imageRepository.save(pimplePatchBigPackImg); 


        // ============================================================
        // PRODUCT 4:  Watermelon Glow Hydrating & Soothing Jelly Sheet Mask
        // ============================================================
        Product watermelonGlowMask = new Product();
        watermelonGlowMask.setProductId("e1f2a3b4-c5d6-7890-e1f2-a3b4c5d67890");
        watermelonGlowMask.setName("Watermelon Glow Hydrating & Soothing Jelly Sheet Mask");
        watermelonGlowMask.setDescription("A hydrating and soothing sheet mask, infused with watermelon extract to help refresh the skin.");
        watermelonGlowMask.setProductType(ProductType.MASKS);
        watermelonGlowMask.setBrand("Glow Recipe");
        productRepository.save(watermelonGlowMask);

        // Variants (one size)
        ProductVariant watermelonGlowMaskVariant = new ProductVariant(watermelonGlowMask, "1 Mask", 11.00, 50, 0);
        watermelonGlowMaskVariant.setVariantId("b5c6d7e8-f9a0-1234-b5c6-d7e8f9a01234");
        variantRepository.save(watermelonGlowMaskVariant);

        // images
        ProductImage watermelonGlowMaskImage1 = new ProductImage(watermelonGlowMask, watermelonGlowMaskVariant);
        watermelonGlowMaskImage1.setImageId("4a7b3c2d");
        watermelonGlowMaskImage1.setImageUrl("/assets/products/"+ watermelonGlowMask.getProductId()+ "/4a7b3c2d.jpg");
        imageRepository.save(watermelonGlowMaskImage1);
        ProductImage watermelonGlowMaskImage2 = new ProductImage(watermelonGlowMask, watermelonGlowMaskVariant);
        watermelonGlowMaskImage2.setImageId("e2f1a3b4");
        watermelonGlowMaskImage2.setImageUrl("/assets/products/"+ watermelonGlowMask.getProductId()+ "/e2f1a3b4.jpg");
        imageRepository.save(watermelonGlowMaskImage2); 

    }
}
