package com.example.backend.service;

import java.util.List;

public class ProductWithVariantDto {
    public String name;
    public String description;
    public String brand;
    public String type; // <-- THIS MUST BE STRING, not ProductType
    public List<String> categories;
    public VariantDto variant;
    public ImageDto image;

    public static class VariantDto {
        public String size;
        public Double price;
        public Integer qty;
    }

    public static class ImageDto {
        // public String imageId;
        public String imageUrl;
    }
}
