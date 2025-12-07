
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from '@mui/material/styles';
import dynamic from "next/dynamic";
import Button from "@mui/material/Button";
import { ShoppingCartRounded } from "@mui/icons-material";
import { useCart } from "@/app/components/CartContext";

const FilterBar = dynamic(() => import("@/app/components/FilterBar"), {
    ssr: false,
  });

// setting the height for select menu items
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};


export default function CatalogPage() {
    const [products, setProducts] = useState([]);
    const [variants, setVariants] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(null);

    const [filters, setFilters] = useState({
        type: "",
        price: "",
        sort: "",
        categories: [],   
        search: "",
    });
    const theme = useTheme();
    const [selectedSizes, setSelectedSizes] = useState({});
    const { fetchCart } = useCart();

    function updateSize(productId, size) {
        setSelectedSizes(prev => ({
          ...prev,
          [productId]: size
        }));
      }

    function updateFilter(key, value) {
        const updated = { ...filters, [key]: value };
        setFilters(updated);
    } 

    // Fetch products + variants once
    useEffect(() => {
        async function fetchData() {
            const pRes = await fetch("http://localhost:8080/api/product", { cache: "no-store" });
            const vRes = await fetch("http://localhost:8080/api/product_variant", { cache: "no-store" });
            const images = await fetch("http://localhost:8080/api/product_image", { cache: "no-store" });

            setProducts(await pRes.json());
            setVariants(await vRes.json());
            setProductImages(await images.json());
            setLoading(false);
        }
        fetchData();
    }, []);

    const addToCart = async (variantId, quantity = 1) => {
        try {
          const res = await fetch(
            `http://localhost:8080/api/cart/add?variantId=${variantId}&quantity=${quantity}`,
            { method: "POST", credentials: "include", } //the browser sends the JSESSIONID cookie to backend to save the sessionId.
          ); 
    
          // Throw and error if user tries to add more than the in stock amount.
          if (!res.ok) {
            // Use the selectedVariant quantity to create a user-friendly message
            const variant = variants.find(v => v.variantId === variantId);
            const errorMessage = `Only ${variant?.quantity || 0} items are currently in stock.`;
            throw new Error(errorMessage);
          }
    
          // Fetch the updated cart from backend, this will update the cart item badge count
          const cartRes = await fetch("http://localhost:8080/api/cart", { credentials: "include" });
          const updatedCart = await cartRes.json();
          setCart(updatedCart);
          fetchCart();
    
          console.log("Added to cart!");
        } catch (error) {
          console.error("Error adding item:", error);
          setErrorMessage(error.message);
          setShowError(true);
        }
      };

    // Apply filtering logic
    const filteredProducts = products
        // .filter((p) =>
        //     productImages.some((img) => img.product.productId === p.productId)
        // )        
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
        .filter((p) => {
            // category filter
            const selected = filters.categories;
            if (!selected || selected.length === 0) return true;
        
            const productCategoryIds = p.categories?.map(c => c.categoryId) || [];
        
            // Product matches if ANY category ID overlaps
            return productCategoryIds.some((id) => selected.includes(id));
        })
        .filter((p) => {
            // Search filter
            if (!filters.search) return true;
        
            const query = filters.search.toLowerCase();
        
            // Check if search matches to product names or brands
            return (
                p.name.toLowerCase().includes(query) ||
                p.brand?.toLowerCase().includes(query)  
            );
        })
        .sort((a, b) => {
            if (!filters.sort) return 0;
            // get variants for both products
            const aVariants = variants.filter(v => v.product.productId === a.productId);
            const bVariants = variants.filter(v => v.product.productId === b.productId);
        
            // get the selected sizes, or fall back to the default size
            const aSelected = selectedSizes[a.productId] ?? aVariants[0]?.size;
            const bSelected = selectedSizes[b.productId] ?? bVariants[0]?.size;
        
            // find the variant that matches the selected size, and get its price
            const aPrice = aVariants.find(v => v.size === aSelected)?.price ?? 0;
            const bPrice = bVariants.find(v => v.size === bSelected)?.price ?? 0;
        
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

    if (loading) {
        return <div className="text-center py-20">Loading products...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-light mb-6">All Products</h1>

            {/* Filters */}
            <FilterBar onChange={(f) => setFilters(f)} />       

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
                {filteredProducts.map((p) => { 
 
                    const productVariants = variants
                    .filter(v => v.product.productId === p.productId)
                    .sort((a, b) => a.index - b.index);   // sort by index to show travel size first
                    
                    const defaultSize = productVariants[0]?.size || "";
                    console.log("trying to find img:");
                    const img = productImages.find(
                        (img) => img.product.productId === p.productId
                      ) 
                      
                    const imageUrl = img?.imageUrl || "/assets/default.jpg";  // fallback image

                    return (
                        <div key={p.productId} className="border p-4 rounded shadow-sm hover:shadow-md transition">
                            {/* CLICKABLE PRODUCT CARD */}
                            <Link
                                href={`/catalog/${p.productId}`}
                                className="block"
                            >
                                <img
                                    src={`${imageUrl}`}
                                    alt={p.name}
                                    className="w-full h-55 object-cover"             
                                />
                    
                                <h2 className="mt-3 font-medium">{p.name}</h2>
                                <p className="text-gray-500">{p.brand}</p>
                            </Link>
                         
                            {/* PRICE  */}
                            <h3 className="text-gray-700 mt-2 text-lg font-medium">
                                        ${productVariants
                                    .find(v => v.size === (selectedSizes[p.productId] ?? defaultSize))
                                    ?.price
                                    .toFixed(2)}
                            </h3>

                            {/* SIZE DROPDOWN INSIDE CARD */}
                            <FormControl fullWidth sx={{ mt: 1.5 }}>
                                <InputLabel id={`size-label-${p.productId}`}>Size</InputLabel>
                                <Select
                                    labelId={`size-label-${p.productId}`}
                                    value={selectedSizes[p.productId] ?? defaultSize}
                                    onChange={(e) => updateSize(p.productId, e.target.value)}
                                    input={<OutlinedInput label="Size" />}
                                    MenuProps={MenuProps}
                                >
                                    {productVariants.map((variant) => (
                                        <MenuItem key={variant.variantId} value={variant.size}>
                                            {variant.size}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl> 
{/* Add to Cart */}
<div style={{ marginTop: "25px" }}>
    <Button
        variant="contained"
        onClick={() => {
            const selectedSize = selectedSizes[p.productId] ?? defaultSize;

            const selectedVariant = productVariants.find(
                (v) => v.size === selectedSize
            );

            addToCart(selectedVariant.variantId, 1);
        }}
        startIcon={<ShoppingCartRounded />}
        sx={{ height: "38px", width: "100%" }}
    >
        Add To Cart
    </Button>
</div>


                        </div>
                    );
                })}
            </div>
        </div>
    );
}
