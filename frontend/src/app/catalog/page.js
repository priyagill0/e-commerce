
// "use client";

// import { imageMap } from "@/lib/imageMap";
// import Link from "next/link";
// import FilterBar from "@/app/components/FilterBar";


// async function getProducts() {
//     const res = await fetch("http://localhost:8080/api/product", { cache: "no-store" });
//     if (!res.ok) throw new Error("Failed to fetch products");
//     return res.json();
// }

// async function getVariants() {
//     const res = await fetch("http://localhost:8080/api/product_variant", { cache: "no-store" });
//     if (!res.ok) throw new Error("Failed to fetch variants");
//     return res.json();
// }

// export default async function CatalogPage() {
//     const [products, variants] = await Promise.all([
//         getProducts(),
//         getVariants(),
//     ]);

//     return (
//         <div className="max-w-6xl mx-auto px-6 py-10">
//             <h1 className="text-3xl font-light mb-6">All Products</h1>
//             <FilterBar onChange={(filters) => console.log(filters)} />

//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                 {products
//                     .filter((p) => imageMap[p.productId])   // 🧼 remove any broken/corrupted product IDs
//                     .map((p) => {
//                         console.log("VALID product loaded:", p.productId);

//                         const productVariants = variants.filter(
//                             (v) => v.product.productId === p.productId
//                         );

//                         const price = productVariants[0]?.price ?? "N/A";

//                         return (
//                             <Link
//                                 key={p.productId}
//                                 href={`/catalog/${p.productId}`}
//                                 className="border p-4 rounded shadow-sm hover:shadow-md transition block"
//                             >
//                                 <img
//                                     src={`/assets/products/${p.productId}/${imageMap[p.productId]}`}
//                                     alt={p.name}
//                                     className="w-full h-48 object-cover"
//                                 />

//                                 <h2 className="mt-3 font-medium">{p.name}</h2>
//                                 <p className="text-gray-500">${price}</p>
//                             </Link>
//                         );
//                     })}
//             </div>
//         </div>
//     );
// }
"use client";

import { useEffect, useState } from "react";
import { imageMap } from "@/lib/imageMap";
import Link from "next/link";
import FilterBar from "@/app/components/FilterBar";

export default function CatalogPage() {
    const [products, setProducts] = useState([]);
    const [variants, setVariants] = useState([]);
    const [filters, setFilters] = useState({
        type: "",
        price: "",
        sort: "",
    });

    // Fetch products + variants once
    useEffect(() => {
        async function fetchData() {
            const pRes = await fetch("http://localhost:8080/api/product", { cache: "no-store" });
            const vRes = await fetch("http://localhost:8080/api/product_variant", { cache: "no-store" });

            setProducts(await pRes.json());
            setVariants(await vRes.json());
        }
        fetchData();
    }, []);

    // Apply filtering logic
    const filteredProducts = products
        .filter((p) => imageMap[p.productId]) // only valid images
        .filter((p) => {
            // Product Type filter
            if (filters.type && p.productType !== filters.type) return false;

            return true;
        })
        .filter((p) => {
            // Price filter
            if (!filters.price) return true;

            const productVariants = variants.filter(v => v.product.productId === p.productId);
            const price = productVariants[0]?.price ?? 0;

            if (filters.price === "50+") return price >= 50;

            const [min, max] = filters.price.split("-").map(Number);
            return price >= min && price <= max;
        })
        .sort((a, b) => {
            if (!filters.sort) return 0;

            const aVariants = variants.filter(v => v.product.productId === a.productId);
            const bVariants = variants.filter(v => v.product.productId === b.productId);

            const aPrice = aVariants[0]?.price ?? 0;
            const bPrice = bVariants[0]?.price ?? 0;

            if (filters.sort === "az") {
                return a.name.localeCompare(b.name);
            }
            if (filters.sort === "low") {
                return aPrice - bPrice;
            }
            if (filters.sort === "high") {
                return bPrice - aPrice;
            }

            return 0;
        });

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-light mb-6">All Products</h1>

            {/* Filters */}
            <FilterBar onChange={(f) => setFilters(f)} />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
                {filteredProducts.map((p) => {
                    const productVariants = variants.filter(
                        (v) => v.product.productId === p.productId
                    );
                    const price = productVariants[0]?.price ?? "N/A";

                    return (
                        <Link
                            key={p.productId}
                            href={`/catalog/${p.productId}`}
                            className="border p-4 rounded shadow-sm hover:shadow-md transition block"
                        >
                            <img
                                src={`/assets/products/${p.productId}/${imageMap[p.productId]}`}
                                alt={p.name}
                                className="w-full h-48 object-cover"
                            />

                            <h2 className="mt-3 font-medium">{p.name}</h2>
                            <p className="text-gray-500">${price}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
