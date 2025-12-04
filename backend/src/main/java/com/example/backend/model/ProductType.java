package com.example.backend.model;

public enum ProductType {
    // adding lUI friendly labels for the frontend
    FACE_WASH("Face Wash"),
    CREAM("Cream"),
    TONER("Toner"),
    SERUM("Serum"),
    TOOLS("Tools"),
    LIP("Lip Products"),
    SPOT_TREATMENT("Spot Treatment"),
    MASKS("Masks");

    private final String label;

    ProductType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
