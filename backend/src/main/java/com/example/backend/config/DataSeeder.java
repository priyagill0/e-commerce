package com.example.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.backend.model.Category;
import com.example.backend.model.Product;
import com.example.backend.model.ProductImage;
import com.example.backend.model.ProductType;
import com.example.backend.model.ProductVariant;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductImageRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.ProductVariantRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    // Repositories
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductVariantRepository variantRepository;

    @Autowired
    private ProductImageRepository imageRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {

        // Prevent duplicate seeding
        if (productRepository.count() > 0) {
            return;
        }

        //Creating Categories:

        Category exfoliating = new Category("Exfoliating");
        Category acneProne= new Category("Acne Prone Skin");

        // Save categories
        categoryRepository.save(exfoliating);
        categoryRepository.save(acneProne);

        // ============================================================
        // PRODUCT 1: Exfoliating Toner
        // ============================================================

        Product exfoliatingToner = new Product();
        exfoliatingToner.setProductId("85e49839-6a46-4324-af8a-e0fbe0387a9a");
        exfoliatingToner.setName("Exfoliating Toner");
        exfoliatingToner.setDescription("A gentle exfoliating toner (7% Glycolic Acid) that removes dead skin cells and promotes a radiant complexion.");
        exfoliatingToner.setProductType(ProductType.TONER);
        exfoliatingToner.setBrand("The Ordinary");
        exfoliatingToner.getCategories().add(exfoliating); //testing many-to-many product-category relationship
        exfoliatingToner.getCategories().add(acneProne); 
        productRepository.save(exfoliatingToner); // UUID auto-generated

        // Variants

        // smaller size first to order by price ascending
        ProductVariant exfoliatingTonerVariant1 = new ProductVariant(exfoliatingToner, "100 mL (Travel Size)", 6.99, 15, 0);
        exfoliatingTonerVariant1.setVariantId("c2d3e4f5-a678-90b1-c2d3-e4f5a67890b1");
        variantRepository.save(exfoliatingTonerVariant1);

        ProductVariant exfoliatingTonerVariant2 = new ProductVariant(exfoliatingToner, "240 mL", 12.99, 30, 1);
        exfoliatingTonerVariant2.setVariantId("b1c2d3e4-f5a6-7890-b1c2-d3e4f5a67890");
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
        foamingFaceWash.getCategories().add(acneProne);
        productRepository.save(foamingFaceWash);

        // Variants
        ProductVariant foamingFaceWashVariant2 = new ProductVariant(foamingFaceWash, "100 mL Travel Size", 6.49, 10, 0);
        foamingFaceWashVariant2.setVariantId("a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890");
        variantRepository.save(foamingFaceWashVariant2);

        ProductVariant foamingFaceWashVariant1 = new ProductVariant(foamingFaceWash, "355 mL", 10.99, 25, 1);
        foamingFaceWashVariant1.setVariantId("f1a2b3c4-d5e6-7890-f1a2-b3c4d5e67890");
        variantRepository.save(foamingFaceWashVariant1);


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
        ProductVariant pimplePatchSmallPack = new ProductVariant(pimplePatch, "1 pack / 20 dots", 27.00, 0, 0); //this is our SOLD OUT product!!
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
        watermelonGlowMask.setName("Watermelon Glow Jelly Sheet Mask");
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



        // ============================================================
        // PRODUCT 5:  Rose Quartz Gua Sha
        // ============================================================
        Product guaSha = new Product();
        guaSha.setProductId("f3e4d5c6-b7a8-9012-f3e4-d5c6b7a89012");
        guaSha.setName("Rose Quartz Gua Sha");
        guaSha.setDescription("A facial gua sha made from rose quartz stone to massage and visibly sculpt your face and neck.");
        guaSha.setProductType(ProductType.TOOLS);
        guaSha.setBrand("Sephora Collection");
        productRepository.save(guaSha);
        // Variants (one size)
        ProductVariant guaShaVariant = new ProductVariant(guaSha, "One Size", 22.00, 30, 0);
        guaShaVariant.setVariantId("c3d4e5f6-a7b8-9012-c3d4-e5f6a7b89012");
        variantRepository.save(guaShaVariant);
        // images
        ProductImage guaShaImage1 = new ProductImage(guaSha, guaShaVariant);
        guaShaImage1.setImageId("5d6e7f8a");
        guaShaImage1.setImageUrl("/assets/products/"+ guaSha.getProductId()+ "/5d6e7f8a.jpg");
        imageRepository.save(guaShaImage1);
        // ============================================================
        // ADDITIONAL CATEGORIES
        // ============================================================
        Category hydrating = new Category("Hydrating");
        Category antiAging = new Category("Anti-Aging");
        Category brightening = new Category("Brightening");
        Category sensitiveSkin = new Category("Sensitive Skin");
        Category drySkin = new Category("Dry Skin");
        Category oilySkin = new Category("Oily Skin");
        Category sunProtection = new Category("Sun Protection");
        Category poreCare = new Category("Pore Care");
        Category lipCare = new Category("Lip Care");
        Category rednessRelief = new Category("Redness Relief");

        categoryRepository.save(hydrating);
        categoryRepository.save(antiAging);
        categoryRepository.save(brightening);
        categoryRepository.save(sensitiveSkin);
        categoryRepository.save(drySkin);
        categoryRepository.save(oilySkin);
        categoryRepository.save(sunProtection);
        categoryRepository.save(poreCare);
        categoryRepository.save(lipCare);
        categoryRepository.save(rednessRelief);


        // ============================================================
        // PRODUCT 6: Hydrating Facial Cleanser
        // ============================================================
        Product hydratingCleanser = new Product();
        hydratingCleanser.setProductId("1aa2bb3c-4dd5-6ee7-8899-aabbccddeeff");
        hydratingCleanser.setName("Hydrating Facial Cleanser");
        hydratingCleanser.setDescription("A gentle, non-foaming hydrating face wash enriched with ceramides and hyaluronic acid.");
        hydratingCleanser.setProductType(ProductType.FACE_WASH);
        hydratingCleanser.setBrand("CeraVe");
        hydratingCleanser.getCategories().add(hydrating);
        hydratingCleanser.getCategories().add(drySkin);
        productRepository.save(hydratingCleanser);

        ProductVariant hydratingCleanserV1 = new ProductVariant(hydratingCleanser, "237 mL", 13.99, 35, 0);
        hydratingCleanserV1.setVariantId("aa11bb22-cc33-dd44-ee55-ff6677889900");
        variantRepository.save(hydratingCleanserV1);

        ProductImage hydratingCleanserImg1 = new ProductImage(hydratingCleanser, hydratingCleanserV1);
        hydratingCleanserImg1.setImageId("abc12345");
        hydratingCleanserImg1.setImageUrl("/assets/products/" + hydratingCleanser.getProductId() + "/abc12345.jpg");
        imageRepository.save(hydratingCleanserImg1);

        ProductImage hydratingCleanserImg2 = new ProductImage(hydratingCleanser, hydratingCleanserV1);
        hydratingCleanserImg2.setImageId("abc12346");
        hydratingCleanserImg2.setImageUrl("/assets/products/" + hydratingCleanser.getProductId() + "/abc12346.jpg");
        imageRepository.save(hydratingCleanserImg2);

        ProductImage hydratingCleanserImg3 = new ProductImage(hydratingCleanser, hydratingCleanserV1);
        hydratingCleanserImg3.setImageId("abc12347");
        hydratingCleanserImg3.setImageUrl("/assets/products/" + hydratingCleanser.getProductId() + "/abc12347.jpg");
        imageRepository.save(hydratingCleanserImg3);


        // ============================================================
        // PRODUCT 7: Niacinamide Brightening Serum
        // ============================================================
        Product niacinamideSerum = new Product();
        niacinamideSerum.setProductId("22bb33cc-44dd-55ee-66ff-77889900aabb");
        niacinamideSerum.setName("Niacinamide 10% + Zinc 1% Serum");
        niacinamideSerum.setDescription("A brightening serum that visibly reduces dark spots and balances excess oil.");
        niacinamideSerum.setProductType(ProductType.SERUM);
        niacinamideSerum.setBrand("The Ordinary");
        niacinamideSerum.getCategories().add(brightening);
        niacinamideSerum.getCategories().add(oilySkin);
        productRepository.save(niacinamideSerum);

        ProductVariant niacinamideSerumV1 = new ProductVariant(niacinamideSerum, "30 mL", 8.90, 40, 0);
        niacinamideSerumV1.setVariantId("1122aabb-3344-ccdd-5566-eeff77889900");
        variantRepository.save(niacinamideSerumV1);

        ProductImage niacinamideSerumImg1 = new ProductImage(niacinamideSerum, niacinamideSerumV1);
        niacinamideSerumImg1.setImageId("ff12aa34");
        niacinamideSerumImg1.setImageUrl("/assets/products/" + niacinamideSerum.getProductId() + "/ff12aa34.jpg");
        imageRepository.save(niacinamideSerumImg1);

        ProductImage niacinamideSerumImg2 = new ProductImage(niacinamideSerum, niacinamideSerumV1);
        niacinamideSerumImg2.setImageId("ff12aa35");
        niacinamideSerumImg2.setImageUrl("/assets/products/" + niacinamideSerum.getProductId() + "/ff12aa35.jpg");
        imageRepository.save(niacinamideSerumImg2);


        // ============================================================
        // PRODUCT 8: Hyaluronic Acid Hydrating Serum
        // ============================================================
        Product haSerum = new Product();
        haSerum.setProductId("aa55ff66-7788-9900-aabb-ccddeeff1122");
        haSerum.setName("Hyaluronic Acid 2% + B5");
        haSerum.setDescription("A deeply hydrating serum that plumps the skin and improves moisture retention.");
        haSerum.setProductType(ProductType.SERUM);
        haSerum.setBrand("The Ordinary");
        haSerum.getCategories().add(hydrating);
        haSerum.getCategories().add(drySkin);
        productRepository.save(haSerum);

        ProductVariant haSerumV1 = new ProductVariant(haSerum, "30 mL", 9.90, 50, 0);
        haSerumV1.setVariantId("55bb66cc-77dd-88ee-99ff-001122334455");
        variantRepository.save(haSerumV1);

        ProductImage haSerumImg1 = new ProductImage(haSerum, haSerumV1);
        haSerumImg1.setImageId("bb44cc22");
        haSerumImg1.setImageUrl("/assets/products/" + haSerum.getProductId() + "/bb44cc22.jpg");
        imageRepository.save(haSerumImg1);

        ProductImage haSerumImg2 = new ProductImage(haSerum, haSerumV1);
        haSerumImg2.setImageId("bb44cc23");
        haSerumImg2.setImageUrl("/assets/products/" + haSerum.getProductId() + "/bb44cc23.jpg");
        imageRepository.save(haSerumImg2);

        ProductImage haSerumImg3 = new ProductImage(haSerum, haSerumV1);
        haSerumImg3.setImageId("bb44cc24");
        haSerumImg3.setImageUrl("/assets/products/" + haSerum.getProductId() + "/bb44cc24.jpg");
        imageRepository.save(haSerumImg3);

        // ============================================================
        // PRODUCT 9: Snail 96 Mucin
        // ============================================================
        Product calmingToner = new Product();
        calmingToner.setProductId("ccee2211-3344-5566-7788-99aabbccdd11");
        calmingToner.setName("Advanced Snail 96 Mucin Power Essence");
        calmingToner.setDescription("A repairing essence with 96% snail secretion filtrate to hydrate, soothe, and help skin recovery.");
        calmingToner.setProductType(ProductType.TONER);
        calmingToner.setBrand("COSRX");
        calmingToner.getCategories().add(sensitiveSkin);
        calmingToner.getCategories().add(rednessRelief);
        productRepository.save(calmingToner);

        ProductVariant calmingTonerV1 = new ProductVariant(calmingToner, "150 mL", 17.99, 30, 0);
        calmingTonerV1.setVariantId("99aa00bb-11cc-22dd-33ee-44ff55667788");
        variantRepository.save(calmingTonerV1);

        ProductImage calmingTonerImg1 = new ProductImage(calmingToner, calmingTonerV1);
        calmingTonerImg1.setImageId("aa99bb77a");
        calmingTonerImg1.setImageUrl("/assets/products/" + calmingToner.getProductId() + "/aa99bb77a.jpg");
        imageRepository.save(calmingTonerImg1);

        ProductImage calmingTonerImg2 = new ProductImage(calmingToner, calmingTonerV1);
        calmingTonerImg2.setImageId("aa99bb77b");
        calmingTonerImg2.setImageUrl("/assets/products/" + calmingToner.getProductId() + "/aa99bb77b.jpg");
        imageRepository.save(calmingTonerImg2);

        ProductImage calmingTonerImg3 = new ProductImage(calmingToner, calmingTonerV1);
        calmingTonerImg3.setImageId("aa99bb77c");
        calmingTonerImg3.setImageUrl("/assets/products/" + calmingToner.getProductId() + "/aa99bb77c.jpg");
        imageRepository.save(calmingTonerImg3);
        


        // ============================================================
        // PRODUCT 10: Watermelon Glow PHA + BHA Toner
        // ============================================================
        Product watermelonToner = new Product();
        watermelonToner.setProductId("dd44ee55-6677-8899-aabb-ccddeeff3344");
        watermelonToner.setName("Watermelon Glow PHA + BHA Toner");
        watermelonToner.setDescription("A pore-tightening toner infused with watermelon extract for smooth, glowing skin.");
        watermelonToner.setProductType(ProductType.TONER);
        watermelonToner.setBrand("Glow Recipe");
        watermelonToner.getCategories().add(brightening);
        watermelonToner.getCategories().add(poreCare);
        productRepository.save(watermelonToner);

        ProductVariant watermelonTonerV1 = new ProductVariant(watermelonToner, "150 mL", 29.00, 25, 0);
        watermelonTonerV1.setVariantId("ccaabb11-2233-4455-6677-8899aabbccdd");
        variantRepository.save(watermelonTonerV1);

        ProductImage watermelonTonerImg1 = new ProductImage(watermelonToner, watermelonTonerV1);
        watermelonTonerImg1.setImageId("db33ab44a");
        watermelonTonerImg1.setImageUrl("/assets/products/" + watermelonToner.getProductId() + "/db33ab44a.jpg");
        imageRepository.save(watermelonTonerImg1);

        ProductImage watermelonTonerImg2 = new ProductImage(watermelonToner, watermelonTonerV1);
        watermelonTonerImg2.setImageId("db33ab44b");
        watermelonTonerImg2.setImageUrl("/assets/products/" + watermelonToner.getProductId() + "/db33ab44b.jpg");
        imageRepository.save(watermelonTonerImg2);

        // ============================================================
        // PRODUCT 11: Retinol Anti-Aging Serum
        // ============================================================
        Product retinolSerum = new Product();
        retinolSerum.setProductId("ffee1122-3344-5566-7788-99aabbccddee");
        retinolSerum.setName("1% Retinol Treatment");
        retinolSerum.setDescription("A high-strength retinol serum designed to reduce wrinkles and improve skin texture.");
        retinolSerum.setProductType(ProductType.SERUM);
        retinolSerum.setBrand("Paula's Choice");
        retinolSerum.getCategories().add(antiAging);
        retinolSerum.getCategories().add(brightening);
        productRepository.save(retinolSerum);

        ProductVariant retinolSerumV1 = new ProductVariant(retinolSerum, "30 mL", 55.00, 20, 0);
        retinolSerumV1.setVariantId("11dd22ee-33ff-4455-6677-8899aabbcc44");
        variantRepository.save(retinolSerumV1);

        ProductImage retinolSerumImg1 = new ProductImage(retinolSerum, retinolSerumV1);
        retinolSerumImg1.setImageId("9812ab56a");
        retinolSerumImg1.setImageUrl("/assets/products/" + retinolSerum.getProductId() + "/9812ab56a.jpg");
        imageRepository.save(retinolSerumImg1);

        ProductImage retinolSerumImg2 = new ProductImage(retinolSerum, retinolSerumV1);
        retinolSerumImg2.setImageId("9812ab56b");
        retinolSerumImg2.setImageUrl("/assets/products/" + retinolSerum.getProductId() + "/9812ab56b.jpg");
        imageRepository.save(retinolSerumImg2);

        ProductImage retinolSerumImg3 = new ProductImage(retinolSerum, retinolSerumV1);
        retinolSerumImg3.setImageId("9812ab56c");
        retinolSerumImg3.setImageUrl("/assets/products/" + retinolSerum.getProductId() + "/9812ab56c.jpg");
        imageRepository.save(retinolSerumImg3);


        // ============================================================
        // PRODUCT 12: Ultra Repair Cream
        // ============================================================
        Product ultraRepairCream = new Product();
        ultraRepairCream.setProductId("abcd9988-7766-5544-3322-1100ffeeccbb");
        ultraRepairCream.setName("Ultra Repair Cream");
        ultraRepairCream.setDescription("A rich, whipped moisturizer for dry and distressed skin, suitable for sensitive skin.");
        ultraRepairCream.setProductType(ProductType.CREAM);
        ultraRepairCream.setBrand("First Aid Beauty");
        ultraRepairCream.getCategories().add(hydrating);
        ultraRepairCream.getCategories().add(sensitiveSkin);
        ultraRepairCream.getCategories().add(drySkin);
        productRepository.save(ultraRepairCream);

        ProductVariant ultraRepairCreamV2 = new ProductVariant(ultraRepairCream, "56 g", 29.00, 15, 0);
        ultraRepairCreamV2.setVariantId("bb33cc55-dd66-ee77-ff88-001122334455");
        variantRepository.save(ultraRepairCreamV2);

        ProductVariant ultraRepairCreamV1 = new ProductVariant(ultraRepairCream, "170 g", 58.00, 30, 1);
        ultraRepairCreamV1.setVariantId("aa22bb44-cc55-dd66-ee77-ff8899001122");
        variantRepository.save(ultraRepairCreamV1);

        // 3 images
        ProductImage ultraRepairCreamImg1 = new ProductImage(ultraRepairCream, ultraRepairCreamV1);
        ultraRepairCreamImg1.setImageId("aa55bbaa");
        ultraRepairCreamImg1.setImageUrl("/assets/products/" + ultraRepairCream.getProductId() + "/aa55bbaa.jpg");
        imageRepository.save(ultraRepairCreamImg1);

        ProductImage ultraRepairCreamImg2 = new ProductImage(ultraRepairCream, ultraRepairCreamV1);
        ultraRepairCreamImg2.setImageId("aa55bbab");
        ultraRepairCreamImg2.setImageUrl("/assets/products/" + ultraRepairCream.getProductId() + "/aa55bbab.jpg");
        imageRepository.save(ultraRepairCreamImg2);


        // ============================================================
        // PRODUCT 13: Vitamin C Brightening Serum
        // ============================================================
        Product vitaminCSerum = new Product();
        vitaminCSerum.setProductId("8899aabb-ccdd-eeff-1122-334455667788");
        vitaminCSerum.setName("Vitamin C Glow Serum");
        vitaminCSerum.setDescription("A stabilized vitamin C serum that brightens dull skin and boosts radiance.");
        vitaminCSerum.setProductType(ProductType.SERUM);
        vitaminCSerum.setBrand("Glow Recipe");
        vitaminCSerum.getCategories().add(brightening);
        productRepository.save(vitaminCSerum);

        ProductVariant vitaminCSerumV1 = new ProductVariant(vitaminCSerum, "30 mL", 45.00, 22, 0);
        vitaminCSerumV1.setVariantId("cc11dd22-ee33-ff44-5566-77889900aaff");
        variantRepository.save(vitaminCSerumV1);

        ProductImage vitaminCSerumImg1 = new ProductImage(vitaminCSerum, vitaminCSerumV1);
        vitaminCSerumImg1.setImageId("f0aa12ba");
        vitaminCSerumImg1.setImageUrl("/assets/products/" + vitaminCSerum.getProductId() + "/f0aa12ba.jpg");
        imageRepository.save(vitaminCSerumImg1);

        ProductImage vitaminCSerumImg2 = new ProductImage(vitaminCSerum, vitaminCSerumV1);
        vitaminCSerumImg2.setImageId("f0aa12bb");
        vitaminCSerumImg2.setImageUrl("/assets/products/" + vitaminCSerum.getProductId() + "/f0aa12bb.jpg");
        imageRepository.save(vitaminCSerumImg2);

        ProductImage vitaminCSerumImg3 = new ProductImage(vitaminCSerum, vitaminCSerumV1);
        vitaminCSerumImg3.setImageId("f0aa12bc");
        vitaminCSerumImg3.setImageUrl("/assets/products/" + vitaminCSerum.getProductId() + "/f0aa12bc.jpg");
        imageRepository.save(vitaminCSerumImg3);


        // ============================================================
        // PRODUCT 14: Overnight Lip Mask
        // ============================================================
        Product lipMask = new Product();
        lipMask.setProductId("bbccddaa-1122-3344-5566-77889900aabb");
        lipMask.setName("Overnight Lip Sleeping Mask");
        lipMask.setDescription("A nourishing overnight lip treatment that deeply hydrates and smooths chapped lips.");
        lipMask.setProductType(ProductType.LIP);
        lipMask.setBrand("LANEIGE");
        lipMask.getCategories().add(lipCare);
        productRepository.save(lipMask);

        ProductVariant lipMaskV1 = new ProductVariant(lipMask, "20 g", 24.00, 35, 0);
        lipMaskV1.setVariantId("aa33bb44-cc55-dd66-ee77-8899aabbccdd");
        variantRepository.save(lipMaskV1);

        ProductImage lipMaskImg1 = new ProductImage(lipMask, lipMaskV1);
        lipMaskImg1.setImageId("dd7788cc");
        lipMaskImg1.setImageUrl("/assets/products/" + lipMask.getProductId() + "/dd7788cc.jpg");
        imageRepository.save(lipMaskImg1);


        // ============================================================
        // PRODUCT 15: Green Tea Foaming Cleanser
        // ============================================================
        Product greenTeaCleanser = new Product();
        greenTeaCleanser.setProductId("11aa22bb-33cc-44dd-55ee-66ff77889900");
        greenTeaCleanser.setName("Green Tea Foaming Cleanser");
        greenTeaCleanser.setDescription("A refreshing foaming wash with green tea extract to reduce oil and soothe skin.");
        greenTeaCleanser.setProductType(ProductType.FACE_WASH);
        greenTeaCleanser.setBrand("Innisfree");
        greenTeaCleanser.getCategories().add(oilySkin);
        greenTeaCleanser.getCategories().add(acneProne);
        productRepository.save(greenTeaCleanser);

        ProductVariant greenTeaCleanserV1 = new ProductVariant(greenTeaCleanser, "150 mL", 12.00, 40, 0);
        greenTeaCleanserV1.setVariantId("4455cc66-7788-99aa-bbcc-ddee11223344");
        variantRepository.save(greenTeaCleanserV1);
        
        ProductImage greenTeaCleanserImg1 = new ProductImage(greenTeaCleanser, greenTeaCleanserV1);
        greenTeaCleanserImg1.setImageId("bb6612ee");
        greenTeaCleanserImg1.setImageUrl("/assets/products/" + greenTeaCleanser.getProductId() + "/bb6612ee.jpg");
        imageRepository.save(greenTeaCleanserImg1);

        ProductImage greenTeaCleanserImg2 = new ProductImage(greenTeaCleanser, greenTeaCleanserV1);
        greenTeaCleanserImg2.setImageId("bb6612ef");
        greenTeaCleanserImg2.setImageUrl("/assets/products/" + greenTeaCleanser.getProductId() + "/bb6612ef.jpg");
        imageRepository.save(greenTeaCleanserImg2);


        // ============================================================
        // PRODUCT 16: Avocado Melt Retinol Eye Mask
        // ============================================================
        Product avocadoEyeMask = new Product();
        avocadoEyeMask.setProductId("9988aabb-ccdd-eeff-0011-223344556677");
        avocadoEyeMask.setName("Avocado Melt Retinol Eye Sleeping Mask");
        avocadoEyeMask.setDescription("A retinol-infused overnight eye treatment that firms and smooths the under-eye area.");
        avocadoEyeMask.setProductType(ProductType.MASKS);
        avocadoEyeMask.setBrand("Glow Recipe");
        avocadoEyeMask.getCategories().add(antiAging);
        avocadoEyeMask.getCategories().add(hydrating);
        productRepository.save(avocadoEyeMask);

        ProductVariant avocadoEyeMaskV1 = new ProductVariant(avocadoEyeMask, "15 mL", 42.00, 18, 0);
        avocadoEyeMaskV1.setVariantId("ee9988bb-cc77-dd55-ee44-112233445566");
        variantRepository.save(avocadoEyeMaskV1);


        ProductImage avocadoEyeMaskImg1 = new ProductImage(avocadoEyeMask, avocadoEyeMaskV1);
        avocadoEyeMaskImg1.setImageId("faf133ad");
        avocadoEyeMaskImg1.setImageUrl("/assets/products/" + avocadoEyeMask.getProductId() + "/faf133ad.jpg");
        imageRepository.save(avocadoEyeMaskImg1);

        ProductImage avocadoEyeMaskImg2 = new ProductImage(avocadoEyeMask, avocadoEyeMaskV1);
        avocadoEyeMaskImg2.setImageId("faf133ae");
        avocadoEyeMaskImg2.setImageUrl("/assets/products/" + avocadoEyeMask.getProductId() + "/faf133ae.jpg");
        imageRepository.save(avocadoEyeMaskImg2);

        ProductImage avocadoEyeMaskImg3 = new ProductImage(avocadoEyeMask, avocadoEyeMaskV1);
        avocadoEyeMaskImg3.setImageId("faf133af");
        avocadoEyeMaskImg3.setImageUrl("/assets/products/" + avocadoEyeMask.getProductId() + "/faf133af.jpg");
        imageRepository.save(avocadoEyeMaskImg3);


        // ============================================================
        // PRODUCT 17: Sunscreen SPF 50+
        // ============================================================
        Product sunscreen50 = new Product();
        sunscreen50.setProductId("abcd1122-eeff-3344-5566-778899aabbcc");
        sunscreen50.setName("SPF 50+ Play Everyday Lotion Sunscreen");
        sunscreen50.setDescription("A lightweight sunscreen providing broad-spectrum UVA/UVB protection.");
        sunscreen50.setProductType(ProductType.CREAM);
        sunscreen50.setBrand("Supergoop!");
        sunscreen50.getCategories().add(sunProtection);
        sunscreen50.getCategories().add(hydrating);
        productRepository.save(sunscreen50);

        ProductVariant sunscreen50V1 = new ProductVariant(sunscreen50, "50 mL", 38.00, 25, 0);
        sunscreen50V1.setVariantId("aa55bb66-cc77-dd88-ee99-001122334455");
        variantRepository.save(sunscreen50V1);

        ProductImage sunscreen50Img1 = new ProductImage(sunscreen50, sunscreen50V1);
        sunscreen50Img1.setImageId("cd11ef22");
        sunscreen50Img1.setImageUrl("/assets/products/" + sunscreen50.getProductId() + "/cd11ef22.jpg");
        imageRepository.save(sunscreen50Img1);


        // ============================================================
        // PRODUCT 18: BHA Liquid Exfoliant
        // ============================================================
        Product bhaExfoliant = new Product();
        bhaExfoliant.setProductId("5522aabb-3344-55cc-66dd-77889900eeff");
        bhaExfoliant.setName("2% BHA Liquid Exfoliant");
        bhaExfoliant.setDescription("A leave-on chemical exfoliant that unclogs pores and smooths texture.");
        bhaExfoliant.setProductType(ProductType.TONER);
        bhaExfoliant.setBrand("Paula's Choice");
        bhaExfoliant.getCategories().add(exfoliating);
        bhaExfoliant.getCategories().add(acneProne);
        bhaExfoliant.getCategories().add(poreCare);
        productRepository.save(bhaExfoliant);

        ProductVariant bhaExfoliantV1 = new ProductVariant(bhaExfoliant, "118 mL", 34.00, 22, 0);
        bhaExfoliantV1.setVariantId("7899aabb-ccdd-eeff-0011-223344556688");
        variantRepository.save(bhaExfoliantV1);

        ProductImage bhaExfoliantImg1 = new ProductImage(bhaExfoliant, bhaExfoliantV1);
        bhaExfoliantImg1.setImageId("bf23aa93");
        bhaExfoliantImg1.setImageUrl("/assets/products/" + bhaExfoliant.getProductId() + "/bf23aa93.jpg");
        imageRepository.save(bhaExfoliantImg1);


        // ============================================================
        // PRODUCT 19: Clarifying Clay Mask
        // ============================================================
        Product clayMask = new Product();
        clayMask.setProductId("11ff22ee-33dd-44cc-55bb-66778899aacc");
        clayMask.setName("Clarifying Clay Mask");
        clayMask.setDescription("A purifying clay mask that draws out impurities and minimizes the look of pores.");
        clayMask.setProductType(ProductType.MASKS);
        clayMask.setBrand("Tatcha");
        clayMask.getCategories().add(poreCare);
        clayMask.getCategories().add(oilySkin);
        productRepository.save(clayMask);

        ProductVariant clayMaskV1 = new ProductVariant(clayMask, "75 mL", 139.00, 20, 0);
        clayMaskV1.setVariantId("9911aa22-bb33-cc44-dd55-ee6677889900");
        variantRepository.save(clayMaskV1);

        ProductImage clayMaskImg1 = new ProductImage(clayMask, clayMaskV1);
        clayMaskImg1.setImageId("ca9922db");
        clayMaskImg1.setImageUrl("/assets/products/" + clayMask.getProductId() + "/ca9922db.jpg");
        imageRepository.save(clayMaskImg1);


        // ============================================================
        // PRODUCT 20: Lip Balm
        // ============================================================
        Product lipPlumper = new Product();
        lipPlumper.setProductId("77aa66bb-55cc-44dd-33ee-22119900aabb");
        lipPlumper.setName("Peptide Lip Tint");
        lipPlumper.setDescription("A high-shine plumping gloss that hydrates while visibly enhancing lip volume.");
        lipPlumper.setProductType(ProductType.LIP);
        lipPlumper.setBrand("Rhode");
        lipPlumper.getCategories().add(lipCare);
        productRepository.save(lipPlumper);

        ProductVariant lipPlumperV1 = new ProductVariant(lipPlumper, "4 mL", 30.00, 40, 0);
        lipPlumperV1.setVariantId("aaff3344-bbcc-ddee-ff00-112233445566");
        variantRepository.save(lipPlumperV1);

        // add zoom in photo first
        ProductImage lipPlumperImg2 = new ProductImage(lipPlumper, lipPlumperV1);
        lipPlumperImg2.setImageId("ab7865df");
        lipPlumperImg2.setImageUrl("/assets/products/" + lipPlumper.getProductId() + "/ab7865df.jpg");
        imageRepository.save(lipPlumperImg2);

        ProductImage lipPlumperImg1 = new ProductImage(lipPlumper, lipPlumperV1);
        lipPlumperImg1.setImageId("ab7865de");
        lipPlumperImg1.setImageUrl("/assets/products/" + lipPlumper.getProductId() + "/ab7865de.jpg");
        imageRepository.save(lipPlumperImg1); 

        // ============================================================
        // PRODUCT 21: Charcoal Detox Face Wash
        // ============================================================
        Product charcoalCleanser = new Product();
        charcoalCleanser.setProductId("aa8899bb-77cc-55dd-33ee-11ff22334455");
        charcoalCleanser.setName("Clear Improvement Cleanser");
        charcoalCleanser.setDescription("A deep-cleaning face wash with activated charcoal to detoxify pores.");
        charcoalCleanser.setProductType(ProductType.FACE_WASH);
        charcoalCleanser.setBrand("Origins");
        charcoalCleanser.getCategories().add(oilySkin);
        charcoalCleanser.getCategories().add(poreCare);
        productRepository.save(charcoalCleanser);

        ProductVariant charcoalCleanserV1 = new ProductVariant(charcoalCleanser, "150 mL", 28.00, 30, 0);
        charcoalCleanserV1.setVariantId("4466bb55-ff77-ee88-dd99-00aa11223344");
        variantRepository.save(charcoalCleanserV1);

        ProductImage charcoalCleanserImg1 = new ProductImage(charcoalCleanser, charcoalCleanserV1);
        charcoalCleanserImg1.setImageId("efab0044");
        charcoalCleanserImg1.setImageUrl("/assets/products/" + charcoalCleanser.getProductId() + "/efab0044.jpg");
        imageRepository.save(charcoalCleanserImg1);


        // ============================================================
        // PRODUCT 22: Peptide Moisturizing Cream
        // ============================================================
        Product peptideCream = new Product();
        peptideCream.setProductId("ccaa33bb-44dd-55ee-66ff-77889900aacc");
        peptideCream.setName("Peptide Moisturizer");
        peptideCream.setDescription("A plumping peptide-infused cream that improves firmness and hydration.");
        peptideCream.setProductType(ProductType.CREAM);
        peptideCream.setBrand("Drunk Elephant");
        peptideCream.getCategories().add(antiAging);
        peptideCream.getCategories().add(hydrating);
        productRepository.save(peptideCream);

        ProductVariant peptideCreamV1 = new ProductVariant(peptideCream, "50 mL", 68.00, 15, 0);
        peptideCreamV1.setVariantId("aa00bb11-cc22-dd33-ee44-ff5566778899");
        variantRepository.save(peptideCreamV1);

        ProductImage peptideCreamImg1 = new ProductImage(peptideCream, peptideCreamV1);
        peptideCreamImg1.setImageId("efbc1122");
        peptideCreamImg1.setImageUrl("/assets/products/" + peptideCream.getProductId() + "/efbc1122.jpg");
        imageRepository.save(peptideCreamImg1);

        ProductImage peptideCreamImg2 = new ProductImage(peptideCream, peptideCreamV1);
        peptideCreamImg2.setImageId("efbc1123");
        peptideCreamImg2.setImageUrl("/assets/products/" + peptideCream.getProductId() + "/efbc1123.jpg");
        imageRepository.save(peptideCreamImg2);


        // ============================================================
        // PRODUCT 23: Aloe Soothing Gel Mask
        // ============================================================
        Product aloeMask = new Product();
        aloeMask.setProductId("9977aabb-55cc-33dd-11ee-00ff22334455");
        aloeMask.setName("Aloe Vera Soothing Gel Mask");
        aloeMask.setDescription("A cooling gel mask that hydrates and soothes irritated or sunburned skin.");
        aloeMask.setProductType(ProductType.MASKS);
        aloeMask.setBrand("Holika Holika");
        aloeMask.getCategories().add(sensitiveSkin);
        aloeMask.getCategories().add(hydrating);
        productRepository.save(aloeMask);

        ProductVariant aloeMaskV1 = new ProductVariant(aloeMask, "100 mL", 14.00, 35, 0);
        aloeMaskV1.setVariantId("aa334455-bb66-cc77-dd88-ee9900112233");
        variantRepository.save(aloeMaskV1);

        ProductImage aloeMaskImg1 = new ProductImage(aloeMask, aloeMaskV1);
        aloeMaskImg1.setImageId("ab9911cc");
        aloeMaskImg1.setImageUrl("/assets/products/" + aloeMask.getProductId() + "/ab9911cc.jpg");
        imageRepository.save(aloeMaskImg1);


        // ============================================================
        // PRODUCT 24: Precision Pimple Extractor Tool
        // ============================================================
        Product extractorTool = new Product();
        extractorTool.setProductId("aa11bb22-cc33-dd44-ee55-ff6677889900");
        extractorTool.setName("Precision Pimple Extractor Tool");
        extractorTool.setDescription("A stainless steel extractor tool designed to safely remove blackheads and whiteheads.");
        extractorTool.setProductType(ProductType.TOOLS);
        extractorTool.setBrand("Sephora Collection");
        extractorTool.getCategories().add(poreCare);
        productRepository.save(extractorTool);

        ProductVariant extractorToolV1 = new ProductVariant(extractorTool, "One Size", 16.00, 50, 0);
        extractorToolV1.setVariantId("bb22cc33-dd44-ee55-ff66-77889900aabb");
        variantRepository.save(extractorToolV1);

        ProductImage extractorToolImg1 = new ProductImage(extractorTool, extractorToolV1);
        extractorToolImg1.setImageId("ee7711aa");
        extractorToolImg1.setImageUrl("/assets/products/" + extractorTool.getProductId() + "/ee7711aa.jpg");
        imageRepository.save(extractorToolImg1);





    }
}
