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
import { Box } from "@mui/material";

export default function Header() {
    // const [cart, setCart] = useState(null);
    const { cart } = useCart();
    const router = useRouter(); 
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Check log in status
    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user");
            setIsLoggedIn(!!user);
        }
    }, []);

    const [userName, setUserName] = useState("");

    // Check log in status + user name
    useEffect(() => {
        const loadUser = () => {
            const stored = localStorage.getItem("user");
            if (!stored) {
                setIsLoggedIn(false);
                setUserName("");
                return;
            }

            const userObj = JSON.parse(stored);
            setIsLoggedIn(true);

            // Check admin role
            setIsAdmin(userObj.adminRole === true);

            // Use firstName if stored, fallback to email prefix
            const display =
                userObj.firstName ||
                (userObj.email ? userObj.email.split("@")[0] : "");

            setUserName(display);
        };

        loadUser();
        window.addEventListener("storage", loadUser);
        return () => window.removeEventListener("storage", loadUser);
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
                <Box
                    component="img"
                    src="/logo.png"  
                    alt="Aura Beauty"
                    sx={{
                    height: 70,       // adjust logo height
                    cursor: "pointer",
                    }}
                />
            </Link>

            {/* RIGHT: NAV + CART */}
            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <nav style={{ display: "flex", gap: "2rem" }}>
                    <Link href="/">Home</Link>
                    <Link href="/catalog">Catalog</Link>
                    {/* <Link href="/offers">Offers</Link>
                    <Link href="/best-sellers">Best Sellers</Link> */}
                </nav>

                {/* ADMIN DROPDOWN */}
                {isAdmin && (
                <div>

                <Button onClick={handleAdminClick} variant="text" color="inherit"
                        sx={{ textTransform: "none", padding: 0, minWidth: 0, fontWeight: 400,  fontSize: "1rem",  lineHeight: 1.5 }}
                > Admin</Button>
                <Menu anchorEl={anchorAdmin} open={Boolean(anchorAdmin)} onClose={closeAdminMenu}>
                    <MenuItem onClick={() => { closeAdminMenu(); router.push("/admin/inventory"); }}>Inventory</MenuItem>
                    <MenuItem onClick={() => { closeAdminMenu(); router.push("/admin/sales"); }}>Sales</MenuItem>
                    <MenuItem onClick={() => { closeAdminMenu(); router.push("/admin/orders"); }}>Orders</MenuItem>
                    <MenuItem onClick={() => { closeAdminMenu(); router.push("/admin/accounts"); }}>Accounts</MenuItem>
                </Menu>
                </div>
)}
  
                {/* USER ICON + NAME */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <IconButton onClick={handleUserClick}>
                        <AccountCircleIcon fontSize="large" sx={{ color: "#1976d2" }} />
                    </IconButton>

                    {isLoggedIn && (
                        <span style={{ fontSize: "0.75rem", marginTop: "-6px", color: "#1976d2" }}>
                            {userName}
                        </span>
                    )}
                </div>

                {/* DROPDOWN MENU */}
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
                    {/* LOGGED IN MENU */} 

                    {isLoggedIn && <MenuItem onClick={() => {closeMenu(); router.push("/account");}}>My Account</MenuItem>}
                    {isLoggedIn && <MenuItem onClick={() => {closeMenu(); router.push("/orders");}}>Past Orders</MenuItem>}
                    {isLoggedIn && <MenuItem onClick={() => {closeMenu(); router.push("/logout");}}>Logout</MenuItem>}
                  
               

                    {/* LOGGED OUT MENU */} 
                    {!isLoggedIn &&   <MenuItem onClick={() => {closeMenu(); router.push("/login");}}>Login</MenuItem>}
                    {!isLoggedIn &&    <MenuItem onClick={() => {closeMenu(); router.push("/signup");}}>Create Account</MenuItem>}

                </Menu>

                {/* CART ICON */}
                <IconButton onClick={goToCart}>
                <CartBadge badgeContent={cart?.totalCartItems || 0} color="primary" overlap="circular">
                    <ShoppingCartIcon fontSize="large" sx={{ color: "#1976d2" }} />
                </CartBadge>
                </IconButton>
            </div>
        </header>
    );
}
