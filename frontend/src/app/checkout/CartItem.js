"use client";

import React from "react";
import Typography from "@mui/material/Typography";

export default function CartItem({ cartItem, productImages, hideActions = true }) {
  const relatedImages = productImages.filter(
    (img) => img.product.productId === cartItem.productVariant.product.productId
  );
  const firstImage = relatedImages.length > 0 ? relatedImages[0] : null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "1px solid #ccc",
        padding: "0.5rem 0.5rem",
        gap: "0.5rem",
      }}
    >
      {/* Product Image */}
      {firstImage ? (
        <img
          key={firstImage.imageId}
          src={firstImage.imageUrl}
          alt={cartItem.productVariant.product.name}
          style={{ width: "60px", height: "60px", borderRadius: "6px" }}
        />
      ) : (
        <div
          style={{
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
            borderRadius: "6px",
            color: "#888",
            fontSize: "0.7rem",
          }}
        >
          No Image
        </div>
      )}

      {/* Product Name and Info */}
      <div style={{ flex: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          {cartItem.productVariant.product.name}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
          Size: {cartItem.productVariant.size}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
          Qty: {cartItem.quantityInCart}
        </Typography>
      </div>

      {/* Price */}
      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.85rem" }}>
        {/* ${cartItem.productVariant.price.toFixed(2)} */}
        ${(cartItem.productVariant.price*cartItem.quantityInCart).toFixed(2)}
      </Typography>
    </div>
  );
}
