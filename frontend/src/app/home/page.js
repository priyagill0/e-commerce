"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [productImages, setProductImages] = useState([]);


  useEffect(() => {
    fetch("http://localhost:8080/api/product")
      .then((res) => res.json())
      .then((data) => {
        console.log("Products:", data);
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/product_variant")
      .then((res) => res.json())
      .then((data) => {
        console.log("Product Variants:", data);
        setProductVariants(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/product_image")
    .then((res) => res.json())
      .then((data) => {-
        console.log("Product Image:", data);
        setProductImages(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to My E-Commerce Store!</h1>
      <h2>Here are the products we have:</h2>

        {products.map((product) => {
          // filter variants for this product
          const variantsForProduct = productVariants.filter(
            (v) => v.product.productId === product.productId
          );
        
          return (
            <div key={product.productId} className="mb-8 p-4 border rounded-lg">
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="text-gray-600">Brand: {product.brand}</p>
              <p className="text-gray-600">Type: {product.productType}</p>
        
              <h4 className="font-semibold">Available Sizes:</h4>
              <ul>
                {variantsForProduct.map((variant) => (
                  <li key={variant.variantId}>
                    {variant.size} – ${variant.price} ({variant.quantity} in stock)
                  </li>
                ))}
                {variantsForProduct.length === 0 && <li>No variants found</li>}
              </ul>


              {/* Images */}
              <div className="flex gap-2 mt-2">
                {productImages
                  .filter((img) => img.product.productId === product.productId)
                  .map((img) => (
                    <img
                      key={img.imageId}
                      src={img.imageUrl}
                      alt={product.name}
                      style={{ width: "120px", borderRadius: "8px" }}
                    />
                  ))}

                {productImages.filter((img) => img.product.productId === product.productId).length === 0 && (
                  <p>No images</p>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
