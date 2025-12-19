"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";
import CartItem from "@/app/checkout/CartItem"; // adjust path if needed

export default function PastOrders({ productImages }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // Load user info from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return router.replace("/login");

    const parsed = JSON.parse(stored);
    setUser(parsed);
  }, [router]);

  // Fetch orders for the user
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/order/user/${user.id}`
        );
        const data = await res.json();

        // Ensure it’s an array
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) return <p>Loading user...</p>;
  if (!orders) return <p>Loading orders...</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h5" sx={{ marginBottom: "1rem", fontSize: '1.9rem', fontWeight: 600 }}>
        Past Orders
      </Typography>

      {orders.length === 0 ? (
        <p>No past orders.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.orderId}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "2rem",
            }}
          >
            {/* Order Header */}
            <Typography variant="subtitle1" sx={{fontWeight: 700}}>
              Placed At:{" "}
              <span style={{ fontWeight: 400}}>
                {new Date(order.placedAt).toLocaleString(undefined, { hour12: false })}
              </span>
            </Typography>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700}}> 
                Order ID: 
                <span style={{ fontWeight: 400}}>
                   {order.orderId}
                </span>
              </Typography>
              <Typography variant="subtitle1" sx={{fontWeight: 510}}>
                Total: ${order.total.toFixed(2)}
              </Typography>
            </div>

            {/* View Order Button */}
            <div
            style={{
              marginTop: "1rem",
              display: "flex",            // add this
              justifyContent: "space-between",
              alignItems: "center",       // optional, vertically center
            }}
          >
            <Button
              variant="outlined"
              onClick={() =>
                router.push(`/checkout/order-confirmation/${order.orderId}`)
              }
            >
              View Order Details
            </Button>
            <div
              style={{
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
        ))
      )}
    </div>
  );
}
