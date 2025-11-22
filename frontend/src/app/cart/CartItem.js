"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

export default function CartItem({ cartItem, productImages, updateQuantity, deleteCartItem }) {
  // Find first image for the product
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
        borderTop: "3px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
        gap: "1rem",
      }}
    >
      {/* Product Image */}
      {firstImage ? (
        <img
          key={firstImage.imageId}
          src={firstImage.imageUrl}
          alt={cartItem.productVariant.product.name}
          style={{ width: "120px", borderRadius: "8px" }}
        />
      ) : (
        <div
          style={{
            width: "120px",
            height: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            color: "#888",
          }}
        >
          No Image
        </div>
      )}

      {/* Product Name and Price */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>{cartItem.productVariant.product.name}</h3>
          <p style={{ margin: 0, fontWeight: "bold" }}>
            ${cartItem.productVariant.price.toFixed(2)}
          </p>
        </div>

        <h4>Size: {cartItem.productVariant.size}</h4>

        {/* Quantity + and - buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            marginTop: "0.5rem",
          }}
        >
          <IconButton
            onClick={() => {
              if (cartItem.quantityInCart <= 1) {
                deleteCartItem(cartItem.id);
              } else {
                updateQuantity(cartItem.id, cartItem.quantityInCart - 1);
              }
            }}
            size="small"
            sx={{
              width: 28,
              height: 28,
              border: "1px solid #ccc",
              borderRadius: "50%",
              color: "primary.main",
            }}
          >
            {cartItem.quantityInCart <= 1 ? <DeleteIcon fontSize="small" /> : <RemoveIcon fontSize="small" />}
          </IconButton>

          <span style={{ minWidth: "20px", textAlign: "center" }}>{cartItem.quantityInCart}</span>

          <IconButton
            onClick={() => updateQuantity(cartItem.id, cartItem.quantityInCart + 1)}
            size="small"
            disabled={cartItem.quantityInCart >= cartItem.productVariant.quantity} // disable if at max stock
            sx={{
              width: 28,
              height: 28,
              border: "1px solid #ccc",
              borderRadius: "50%",
              color: "primary.main",
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </div>
        
        {/* Warning message if quantity >= stock */}
        {cartItem.quantityInCart >= cartItem.productVariant.quantity && (
          <Typography variant="caption" color="error" sx={{ display: "block", mt: 0.5 }}>
            No more stock is available for this item.
          </Typography>
        )}

        {/* Remove item button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
          <button
            onClick={() => deleteCartItem(cartItem.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.9rem",
              textDecoration: "underline",
              padding: 0,
              color: "primary.main",
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
