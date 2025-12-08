"use client";

import { use, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import BackButton from "@/app/cart/BackButton"; // same back button
import CircularProgress from "@mui/material/CircularProgress";

export default function OrderConfirmation({ params }) {
  const { orderId } = use(params);

  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const resOrder = await fetch(`http://localhost:8080/api/order/${orderId}`);
        const orderList = await resOrder.json();
        setOrder(orderList[0]);

        const resItems = await fetch(`http://localhost:8080/api/order-item/order/${orderId}`);
        
        const items = await resItems.json();
        console.log("Order Items:", items); //
        setOrderItems(items);
      } catch (err) {
        console.error("Failed to load order data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);
// Load product images
useEffect(() => {
    fetch("http://localhost:8080/api/product_image")
      .then((res) => res.json())
      .then((data) => setProductImages(data))
      .catch((err) => console.error("Error loading images:", err));
  }, []);

  if (loading || !order || !orderItems) {
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={70} />
      </div>
    );
  }

  return (
    <div>
      

      <div
        style={{
          display: "flex",
          gap: "3rem",
          marginTop: "3rem",
          marginBottom: "3rem",
          marginLeft: "15rem",
          marginRight: "15rem",
          flexWrap: "wrap",
        }}
      >
        {/* ---------------- LEFT COLUMN ---------------- */}
        <div style={{ flex: 1.5, minWidth: "300px" }}>
          {/* Header */}
          <div
            style={{
              marginBottom: "2rem",
              borderBottom: "1px solid #e0e0e0",
              paddingBottom: "1rem",
            }}
          >
            <Typography
            variant="h5"
            sx={{
                fontWeight: 700,
                fontSize: "2rem",
                letterSpacing: "0.5px",
                marginBottom: "1rem",
            }}
            >
            Thank you for your order {order.customer.firstName}!
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: "1.5rem",
                letterSpacing: "0.5px",
              }}
            >
              Order Confirmation
            </Typography>

            <Typography sx={{ fontSize: "1.1rem", opacity: 0.8 }}>
              Order ID: {order.orderId}
            </Typography>

            <Typography sx={{ fontSize: "1.1rem", opacity: 0.8 }}>
              Placed At: {new Date(order.placedAt).toLocaleString(undefined, { hour12: false })}
            </Typography>
          </div>

          {/* ADDRESSES */}
          <div style={{ marginBottom: "2rem" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Shipping Address
            </Typography>
            <Typography>{order.shippingAddress.street}</Typography>
            <Typography>
              {order.shippingAddress.province}, {order.shippingAddress.country}{" "}
              {order.shippingAddress.zip}, {order.shippingAddress.phone}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, marginTop: "1.5rem" }}>
              Billing Address
            </Typography>
            <Typography>{order.billingAddress.street}</Typography>
            <Typography>
              {order.billingAddress.province}, {order.billingAddress.country}{" "}
              {order.billingAddress.zip}, {order.shippingAddress.phone}
            </Typography>
          </div>

          {/* PAYMENT INFO */}
          <div style={{ marginBottom: "2rem" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Payment
            </Typography>
            <Typography>Card ending in: •••• {order.payment.cardNumber.slice(-4)}</Typography>
          </div>

    {orderItems.map((item) => {
    const relatedImages = productImages.filter(
        (img) => img.product?.productId === item.productVariant?.product?.productId
    );
    const firstImage = relatedImages.length > 0 ? relatedImages[0] : null;

  return (
    <div
      key={item.orderItemId}
      style={{
        display: "flex",
        gap: "1rem",
        borderBottom: "1px solid #e0e0e0",
        padding: "1rem 0",
        alignItems: "center",
      }}
    >
      {firstImage ? (
        <img
          src={firstImage.imageUrl}
          alt={item.productVariant?.product?.name ?? "Unknown Product"}
          style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
        />
      ) : (
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            color: "#888",
          }}
        >
          No Image
        </div>
      )}

      <div style={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 600 }}>
          {item.productVariant?.product?.name ?? "Unknown Product"}
        </Typography>
        <Typography>Size: {item.productVariant?.size ?? "-"}</Typography>
        <Typography>Qty: {item.qty ?? 0}</Typography>
        <Typography>${(item.productPrice ?? 0).toFixed(2)}</Typography>
      </div>
    </div>
  );
})}


        </div>

        {/* ---------------- RIGHT COLUMN (Order Summary) ---------------- */}
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            padding: "1rem",
            borderRadius: "8px",
            height: "fit-content",
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Order Summary
          </Typography>

          <div style={{ marginTop: "1rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: ".5rem",
              }}
            >
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)?? "0.00"}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: ".5rem",
              }}
            >
              <span>Tax</span>
              <span>${order.tax.toFixed(2)?? "0.00"}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: ".5rem",
              }}
            >
              <span>Shipping</span>
              <span>${order.shipping.toFixed(2)?? "0.00"}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                marginTop: "1rem",
                fontSize: "1.2rem",
              }}
            >
              <span>Total</span>
              <span>${order.total.toFixed(2)?? "0.00"}</span>
            </div>
            {/* Order Status */}
<div
  style={{
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    backgroundColor: "#d4edda",
    color: "#155724",
    fontWeight: 600,
    textAlign: "center",
  }}
>
  {order.status}
</div>

          </div>
        </div>
      </div>
    </div>
  );
}
