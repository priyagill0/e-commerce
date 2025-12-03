"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { styled } from '@mui/material/styles'; 
import { useCart } from "./CartContext"

export default function Header() {
    // const [cart, setCart] = useState(null);
    const { cart } = useCart();
    const router = useRouter(); 

  const goToCart = () => {
    router.push("/cart"); // navigate to cart page
  };

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
                </nav>

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
