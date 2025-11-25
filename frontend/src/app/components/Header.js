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

export default function Header() {
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

                <Link href="/cart">🛒</Link>
            </div>
        </header>
    );
}
