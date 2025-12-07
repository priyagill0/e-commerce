"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { styled } from '@mui/material/styles'; 
import { useCart } from "./CartContext"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';

export default function Header() {
    // const [cart, setCart] = useState(null);
    const { cart } = useCart();
    const router = useRouter(); 
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check log in status
    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user");
            setIsLoggedIn(!!user);
        }
    }, []);

        
  const goToCart = () => {
    router.push("/cart"); // navigate to cart page
  };


  // User logic
  const handleUserClick = (event) => setAnchorEl(event.currentTarget);

  const closeMenu = () => setAnchorEl(null);

  // Styled Badge for Cart Icon
  const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -4px;
    right: -3px;
  }
  `; 

  // Admin Logic
  const [anchorAdmin, setAnchorAdmin] = useState(null);
  const handleAdminClick = (event) => setAnchorAdmin(event.currentTarget);
  const closeAdminMenu = () => setAnchorAdmin(null);

  
    return (
        <header
            style={{
                position: "sticky",   // makes the header stay when you scroll
                top: 0,              
                zIndex: 1000,         // make sure it's above other content
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 3rem",
                borderBottom: "1px solid #eee",
                backgroundColor: "white",
            }}
        >
            {/* LEFT: LOGO */}
            <Link href="/">
                <h2 style={{ cursor: "pointer", fontWeight: 600 }}>Aura Beauty</h2>
            </Link>

            {/* RIGHT: NAV + CART */}
            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <nav style={{ display: "flex", gap: "2rem" }}>
                    <Link href="/catalog">Catalog</Link>
                    <Link href="/offers">Offers</Link>
                    <Link href="/best-sellers">Best Sellers</Link>
                    {/* <Link href="/admin">Admin</Link> */}
                </nav>

                {/* ADMIN DROPDOWN */}
                <div>
                <Button onClick={handleAdminClick} variant="text" color="inherit"
                        sx={{ textTransform: "none", padding: 0, minWidth: 0, fontWeight: 400,  fontSize: "1rem",  lineHeight: 1.5 }}
                > Admin</Button>
                    <Menu anchorEl={anchorAdmin} open={Boolean(anchorAdmin)} onClose={closeAdminMenu}>
                    <MenuItem onClick={() => { closeAdminMenu(); router.push("/admin/inventory"); }}>Inventory</MenuItem>
                    <MenuItem onClick={() => { closeAdminMenu(); router.push("/admin/sales"); }}>Sales</MenuItem>
                    <MenuItem onClick={() => { closeAdminMenu(); router.push("/admin/accounts"); }}>Accounts</MenuItem>
                </Menu>
                </div>


                {/* USER ICON */}
                <IconButton onClick={handleUserClick}>
                    <AccountCircleIcon fontSize="large" />
                </IconButton>

                {/* DROPDOWN MENU */}
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
                    {/* LOGGED IN MENU */} 

                    {isLoggedIn && <MenuItem onClick={() => {closeMenu(); router.push("/account");}}>My Account</MenuItem>}

                    {isLoggedIn && <MenuItem onClick={() => {closeMenu(); router.push("/orders");}}>Order History</MenuItem>}
                    {isLoggedIn && <MenuItem onClick={() => {closeMenu(); router.push("/logout");}}>Logout</MenuItem>}
                  
               

                    {/* LOGGED OUT MENU */} 
                    {!isLoggedIn &&   <MenuItem onClick={() => {closeMenu(); router.push("/login");}}>Login</MenuItem>}
                    {!isLoggedIn &&    <MenuItem onClick={() => {closeMenu(); router.push("/signup");}}>Create Account</MenuItem>}

                </Menu>

                {/* CART ICON */}
                <IconButton onClick={goToCart}>
                <CartBadge badgeContent={cart?.totalCartItems || 0} color="primary" overlap="circular">
                    <ShoppingCartIcon fontSize="large" />
                </CartBadge>
                </IconButton>
            </div>
        </header>
    );
}
