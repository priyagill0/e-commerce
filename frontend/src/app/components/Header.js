// "use client";

// import Link from "next/link";

// export default function Header() {
//     return (
//         <header
//             style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "1rem 3rem",
//                 borderBottom: "1px solid #eee",
//                 backgroundColor: "white",
//             }}
//         >
//             <Link href="/">
//                 <h2 style={{ cursor: "pointer", fontWeight: 600 }}>Aura Beauty</h2>
//             </Link>

//             <nav style={{ display: "flex", gap: "2rem" }}>
//                 <Link href="/catalog">Catalog</Link>
//                 <Link href="/offers">Offers</Link>
//                 <Link href="/best-sellers">Best Sellers</Link>
//             </nav>

//             <Link href="/cart">🛒</Link>
//         </header>
//     );
// }
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from '@mui/material/styles'; 
import { useCart } from "./CartContext";
import { useState, useEffect } from "react";

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

  const goToCart = () => router.push("/cart"); // navigate to cart page

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
  
    return (
        <header
            style={{
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
                </nav>

                {/* USER ICON */}
                <IconButton onClick={handleUserClick}>
                    <AccountCircleIcon fontSize="large" />
                </IconButton>

                {/* DROPDOWN MENU */}
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
                    {/* LOGGED IN MENU */}
                    {isLoggedIn && (
                        <>
                            <MenuItem onClick={() => {closeMenu(); router.push("/account");}}>My Account</MenuItem>
                            <MenuItem onClick={() => {closeMenu(); router.push("/orders");}}>Order History</MenuItem>
                            <MenuItem onClick={() => {closeMenu(); router.push("/logout");}}>Logout</MenuItem>
                        </>
                    )}

                    {/* LOGGED OUT MENU */}
                    {!isLoggedIn && (
                        <>
                            <MenuItem onClick={() => {closeMenu(); router.push("/login");}}>Login</MenuItem>
                            <MenuItem onClick={() => {closeMenu(); router.push("/signup");}}>Create Account</MenuItem>
                        </>
                    )}
                </Menu>

                {/* <Link href="/cart">🛒</Link> */}
                <IconButton onClick={goToCart}>
                    <CartBadge badgeContent={cart?.totalCartItems || 0} color="primary" overlap="circular">
                        <ShoppingCartIcon fontSize="large" />
                    </CartBadge>
                </IconButton>
            </div>
        </header>
    );
}
