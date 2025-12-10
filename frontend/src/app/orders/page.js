"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

export default function Orders() {
    const router = useRouter();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedOrders = localStorage.getItem("orders");
            if (storedOrders) setOrders(JSON.parse(storedOrders));
        }
    }, []);

    const handleClick = (orderId) => router.push(`/orders/${orderId}`);

    return (
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
            <h1>Order History</h1>
            {orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                <Grid container spacing={3}>
                    {orders.map((order) => (
                        <Grid item xs={12} sm={6} md={4} key={order.id}>
                            <Card
                                onClick={() => handleOrderClick(order.id)}
                                style={{ cursor: "pointer", transition: "0.3s", height: "100%" }}
                                variant="outlined"
                            >
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Order #{order.id}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Date: {order.date}
                                    </Typography>
                                    <Typography variant="body1" style={{ marginTop: "0.5rem" }}>
                                        Total: ${order.total}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Status: {order.status}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            <Button variant="text" color="secondary" style={{ marginTop: "1rem" }} onClick={() => router.push("/")} >
                Back to Home
            </Button>
        </div>
    );
}
