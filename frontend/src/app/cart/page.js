"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import OrderSummary from "./OrderSummary";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import Typography from "@mui/material/Typography";

export default function Cart() {

const [cart, setCart] = useState(null);

const [productImages, setProductImages] = useState([]);
const router = useRouter(); 

const deleteCartItem = async (itemId) => {
  try {
    const res = await fetch(
      `http://localhost:8080/api/cart/item/${itemId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const text = await res.text();
    const data = text ? JSON.parse(text) : { items: [] };
    console.log("Updated Cart Object after deletion:", data);
    setCart(data);
  }
  catch (err) {
    console.error("Error deleting item from cart:", err);
  }
};

const updateQuantity = async (itemId, newQuantity) => {
  if (newQuantity < 1) newQuantity = 1; // prevent 0 or negative

  try {
    const res = await fetch(
      `http://localhost:8080/api/cart/item/${itemId}?quantity=${newQuantity}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );
    const text = await res.text();
    const data = text ? JSON.parse(text) : { items: [] };

    console.log("Updated Cart Object:", data);
    setCart(data);
  } catch (err) {
    console.error("Error updating cart:", err);
  }
};

// loading cart
useEffect(() => {
  fetch(`http://localhost:8080/api/cart`, 
        {credentials: "include"}) // "include": browser sends the JSESSIONID cookie to backend
    .then(async (res) => {
      // If backend returned empty body
      const text = await res.text();
      if (!text) return { items: [] }; // safe fallback
      return JSON.parse(text);
    })
    .then((data) => { 
      console.log("Cart Object:", data);
      setCart(data);
    })
    .catch((err) => console.error("Error fetching cart:", err));
}, []);

useEffect(() => {
  fetch("http://localhost:8080/api/product_image")
  .then((res) => res.json())
    .then((data) => {-
      console.log("Product Images:", data);
      setProductImages(data);
    })
    .catch((err) => console.error("Error fetching products:", err));
}, []);


// If cart is still loading or, show a loading spinner
if (cart === null) {
  return (
    <div style={{
      height: "80vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <CircularProgress size={70} />
    </div>
  );
}

// If cart is empty, render an empty page 
if (cart.items.length === 0)  return <EmptyCart />;


// Non-empty cart layout
return (
  <div
    style={{
      display: "flex",
      gap: "3rem",
      marginTop: "5rem",
      marginBottom: "3rem",
      marginLeft: "15rem",
      marginRight: "15rem",
      flexWrap: "wrap",
    }}
  >
    {/* Left Column: Cart Items */}
    <div style={{ flex: 1.5, minWidth: "300px" }}>
    
    {/*  Cart heading with number of items */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "" }}>
          {/* <h1 >Your Cart</h1> */}
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700, fontSize: "1.5rem",letterSpacing: "0.5px",color: "text.primary", }}>
            Your Cart
          </Typography> 
          
          <Typography variant="h5"  component="h2" sx={{ fontWeight: 300, fontSize: "1.3rem", letterSpacing: "0.5px", color: "text.primary", }}>
          {cart.totalCartItems} {cart.totalCartItems === 1 ? "Item" : "Items"}
          </Typography>
      </div>

      {cart.items.map((cartItem) => {
        const relatedImages = productImages.filter(
          (img) =>
            img.product.productId ===
            cartItem.productVariant.product.productId
        );
        const firstImage = relatedImages.length > 0 ? relatedImages[0] : null;

        return (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            productImages={productImages}
            updateQuantity={updateQuantity}
            deleteCartItem={deleteCartItem}
          />
        );

})}
  </div>

    {/* Right Column: Order Summary */}

   <div
      style={{
        flex: 1,
        minWidth: "300px",
        padding: "1rem",
        borderRadius: "8px",
        height: "fit-content",
      }}
    >
      <OrderSummary
        subtotal={cart.subtotal}
        tax={cart.tax}
        shipping={cart.shipping}
        total={cart.total}
        itemCount={cart.totalCartItems}
        onCheckout={() => router.push("/checkout")}
      />

  </div>

  </div>
);
}