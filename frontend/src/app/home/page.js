"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from "../components/CartContext"; // adjust path if needed

export default function HomePage() {
  const { cart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem("user");
    if (stored) {
      setIsLoggedIn(true);
      const userObj = JSON.parse(stored);
      setUserName(userObj.firstName || (userObj.email?.split("@")[0] || ""));
    }
  }, []);

  if (!isClient) return null; // prevent server/client mismatch

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 3,
        mt: 4,
        px: 2,
      }}
    >
      {/* Banner */}
      <Box
        component="img"
        src="/banner.png"
        alt="Banner"
        sx={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 2,
          boxShadow: 3,
        }}
      />

      {/* Slogan */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 500,
          color: "#7E3DD1",
          lineHeight: 1.3,
        }}
      >
        Everyday Care, Effortless Glow.
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
     
        {/* Go Shopping Button */}
        <Link href="/catalog" passHref>
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCartIcon />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: "#1976d2",          // primary blue
              color: "#fff",
              "&:hover": { bgcolor: "#1565c0" }, // slightly darker on hover
              px: 4,
              py: 1.5, 
            }}
          >
            Go Shopping
          </Button>
        </Link>

        {/* Login / My Account */}
        <Link href={isLoggedIn ? "/account" : "/login"} passHref>
          <Button
            variant="contained"
            size="large"
            startIcon={<AccountCircleIcon />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: "#1976d2",          // primary blue
              color: "#fff",               // white text
              "&:hover": { bgcolor: "#1565c0" }, // slightly darker on hover
              px: 4,
              py: 1.5,
            }}
          >
            {isLoggedIn ? "My Account" : "Login"}
          </Button>
        </Link>

      </Box>
    </Box>
  );
}
