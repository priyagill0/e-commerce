"use client";

import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";


export default function OrderSummary({
  subtotal = 0,
  tax = 0,
  shipping = 0,
  total = 0,
  itemCount = 0,
  onCheckout = () => alert("Checkout not implemented"),
}) { 

  return (
    <div> 
   
    <Box
    sx={{
        border: "1px solid #e0e0e0",
        birderWeight: 5,
        borderRadius: 2,
        p: 3,
        width: "100%",
        maxWidth: 420,
        boxShadow: 0,
        backgroundColor: "#fff",
    }}
    >

    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography
            variant="h5"
            component="h2"
            sx={{
            fontWeight: 700,
            fontSize: "1.5rem",
            letterSpacing: "0.5px",
            color: "text.primary",
            }}
        >
            Order Summary
        </Typography>

        <Typography  variant="h5" component="h2" sx={{ fontWeight: 300, fontSize: "1.3rem", letterSpacing: "0.5px", color: "text.primary",}} >
            {itemCount} {itemCount === 1 ? "Item" : "Items"}
        </Typography>
    </Box>



        <Divider sx={{ my: 2, borderBottomWidth: 2, borderColor: "primary.main" }} />

        {/* Subtotal, Shipping, Tax */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontSize: "1.15rem" }}>Subtotal</Typography>
            <Typography variant="subtitle1" sx={{ fontSize: "1.15rem" }}>${subtotal.toFixed(2)}</Typography>
        </Box>

    
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontSize: "1.15rem" }}>Shipping</Typography>
            <Typography 
                variant="subtitle1" 
                sx={{ fontSize: "1.15rem", fontWeight: shipping === 0 ? "bold" : "normal", color: shipping === 0 ? "success.main" : "text.primary" }}
            >
                {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </Typography>
        </Box>
 
        {/* Free shipping message */}
        {subtotal < 100 && ( 
        <Typography variant="caption" sx={{ display: "block", mb: 1, fontSize: "0.85rem", }} >
                Add{" "}
            <Box component="span" sx={{ fontWeight: "bold"}}> 
                ${ (100 - subtotal).toFixed(2) }
            </Box>{" more to get "}
            <Box sx={{  color: "success.main" }} component="span">
                free shipping!
            </Box>
        </Typography> 
        )}
    
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontSize: "1.15rem" }}>Tax</Typography>
            <Typography variant="subtitle1" sx={{ fontSize: "1.15rem" }}>${tax.toFixed(2)}</Typography>
        </Box>

        <Divider sx={{ my: 2, borderBottomWidth: 2, borderColor: "primary.main" }} />

        {/* Total */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.3rem" }}>Total</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.3rem" }}>${total.toFixed(2)}</Typography>
        </Box>

        {/* Checkout Button
        <Button
            fullWidth
            variant="contained"
            color="primary"
            endIcon={<LockIcon />}
            onClick={onCheckout}
            sx={{
            mt: 1,
            py: 1.5,
            fontSize: "1.15rem",
            fontWeight: 700,
            textTransform: "none",
            borderRadius: 1,
            }}
            aria-label="Checkout - secure checkout"
        >Checkout
        </Button> */}

    </Box>
    </div>
  );
}
