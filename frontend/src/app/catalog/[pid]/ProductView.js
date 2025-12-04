"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Grid from '@mui/material/Grid';
import ImageCarousel from "./ImageCarousel";
import { Typography } from "@mui/material";
import { Button, Stack, Chip } from "@mui/material";
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useCart } from "@/app/components/CartContext";
import BackButton from "./BackButton"; 

// passing product id
export default function ProductView({ productId }) {
    const [product, setProduct] = useState(null);
    const [productVariants, setProductVariants] = useState(null);
    const [sizes, setSizes] = useState(null);
    const [price, setPrice] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);

    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState(null);

    const [productImages, setProductImages] = useState([]);
    const router = useRouter(); 
    // const productId = "d4e5f6a7-b8c9-1234-d5e6-f7a8b9c01234";
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);
    const { fetchCart } = useCart();

    const goToCart = () => {
      router.push("/cart"); // navigate to cart page
    };
  

  const addToCart = async (variantId, quantity = 1) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/cart/add?variantId=${variantId}&quantity=${quantity}`,
        { method: "POST", credentials: "include", } //the browser sends the JSESSIONID cookie to backend to save the sessionId.
      ); 

      // Throw and error if user tries to add more than the in stock amount.
      if (!res.ok) {
        // Use the selectedVariant quantity to create a user-friendly message
        const variant = productVariants.find(v => v.variantId === variantId);
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

  // Get the product object
    useEffect(() => {
        if (!productId) return;
        fetch(`http://localhost:8080/api/product/${productId}`)
        .then((res) => res.json())
          .then((data) => {-
            console.log("Product:", data);
            setProduct(data);
          })
          .catch((err) => console.error("Error fetching products:", err));
      }, [productId]);

    // Pass the product id and get all of its variants.
    useEffect(() => {
        if (!productId) return;

        fetch(`http://localhost:8080/api/product_variant/${productId}`)
        .then((res) => res.json())
          .then((data) => {
            console.log("Product Variants:", data);
            setProductVariants(data);
          })
          .catch((err) => console.error("Error fetching product variants:", err));
      }, [productId]);

      // get all images for the selected product
      useEffect(() => {
        if (!productId) return;

        fetch(`http://localhost:8080/api/product_image/${productId}`)
          .then(res => res.json())
          .then((data) => {
            const urls = data.map(img => img.imageUrl);
            setProductImages(urls); // extract only the image
          });
      }, [productId]);
      
    // This selects the default size for the product variant (select the first IN STOCK size)
    useEffect(() => {
        if (!productVariants) return;
        // sort variants by index to maintain consistent order
        const sortedVariants = [...productVariants].sort((a, b) => a.index - b.index);
         // find first in-stock variant
        const firstAvailable = sortedVariants.find(v => v.quantity > 0);
        setSelectedVariant(firstAvailable);
      }, [productVariants]);

    //  Prevent null errors
    if (!product || !productVariants) {
        return <div>Loading product...</div>;
    }

    return (
        <div>
          <br></br>
          <Grid container spacing={2}>

          <div style={{ position: "sticky", zIndex: 10 }}>
            <BackButton />
          </div>

           {/* ImageCarousel on left side */}
            <Grid item xs={12} sm={12} md={6} lg={5}>
              <div>
                <ImageCarousel images={productImages} />
              </div>
            </Grid> 

            {/* Product details on right side */}
            <Grid item xs={12} sm={12} md={6} lg={5}>
                <div>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600, fontSize: "1.5rem",letterSpacing: "0.5px",color: "text.primary", }}>
                    {product.name}
                  </Typography> 
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 300, fontSize: "1.2rem",letterSpacing: "0.5px",color: "text.primary", }}>
                     Brand: {product.brand}
                  </Typography>  
                  <hr />
                </div>
                <br></br>

                {/* stack so that sizes are side by side */}
                <Stack direction="row" spacing={1}>
                  {productVariants && productVariants.length > 0 ? (
                    productVariants.map((variant, index) => (
                    <div key={index} style={{ textAlign: "center" }}>
                    {/* a button for each sizes avilable */}
                    <Button
                        variant={selectedVariant === variant ? "contained" : "outlined"}
                        disabled={variant.quantity <= 0}

                        onClick={() => {
                            if (variant.quantity > 0) {   // prevents the selection of sold out sizes 
                            setSelectedVariant(variant);
                            setQuantity(1);
                            }
                        }}
                        sx={{
                            textDecoration: variant.quantity <= 0 ? "line-through" : "none", //for sold out sizes, show a cross

                            minWidth: "40px",
                            minHeight: "40px",
                            padding: 1,
                            borderRadius: "4px",
                            fontWeight: 600,
                            textTransform: "none",

                            backgroundColor:
                            selectedVariant === variant ?  "rgba(142, 36, 170, 0.2)" : "transparent",
                            color: "black",
                            borderColor: "#8e24aa",

                            "&:hover": {
                            backgroundColor: selectedVariant === variant
                                ? "" // same colour on selected hover
                                : "rgba(142, 36, 170, 0.1)", // unselected hover
                            borderColor: "#8e24aa",
                            },
                        }}
                    >
                        {variant.size}
                    </Button>
                    </div>
                    ))
                  ) : (
                    <span>No sizes available</span>
                  )}

                </Stack>

                {/* andrade-pro-fallback is a nice font */} 

                {/* Show Price for the selected variant*/}
                {selectedVariant && (
                  <Typography sx={{ fontSize: "1.3rem", marginTop: 2, fontWeight: 550, }}>
                        ${Number(selectedVariant.price).toFixed(2)}
                  </Typography>
                )}

                <br></br>
              
                <Stack direction="row" spacing={1}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    {/* Quantity Label */}
                    <span style={{ fontSize: "0.9rem", fontWeight: 500, marginBottom: "4px" }}>
                        Quantity
                    </span>

                    {/* Quantity Selector Box */}
                    <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        width: "80px",
                        justifyContent: "space-between",
                        padding: "3px 6px", 
                    }}
                    >
                        <Button
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            disabled={!selectedVariant || quantity <= 1} // disable (-) button if <= 1

                            sx={{
                            minWidth: "0",
                            padding: "0",
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "text.primary",
                            boxShadow: "none",
                            "&:hover": { background: "transparent" },
                            }}
                        >
                            –
                        </Button>

                        <span style={{ fontSize: "1rem", fontWeight: 600 }}>{quantity}</span>

                        <Button
                            onClick={() => setQuantity((q) => q + 1)}
                            disabled={!selectedVariant || quantity >= selectedVariant.quantity} // disable (+) button if >= quantity available
                            sx={{
                            minWidth: "0",
                            padding: "0",
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "text.primary",
                            boxShadow: "none",
                            "&:hover": { background: "transparent" },
                            }}
                        >
                            +
                        </Button>

                    </div>
                </div>
                <br></br>

                  {/* Add to Cart Button */}
                    <div style={{ marginTop: "25px"}}>
                    <Button 
                        variant="contained"   
                        disabled={!selectedVariant}
                        onClick={() => addToCart(selectedVariant.variantId, quantity)} 
                        startIcon={<ShoppingCartRounded />}
                        sx={{
                            height:"38px" 
                        }}
                    >
                        Add To Cart
                    </Button>
                    </div> 

                </Stack>
                <br></br>
                <hr></hr>          
                <br></br>   

                {/* Product Description */}
                <Typography variant="h5" component="h2" sx={{ fontWeight: 400, fontSize: "1.3rem",letterSpacing: "0.5px",color: "text.primary", }}>
                    Description:
                </Typography> 
                <Typography variant="h5" component="h2" sx={{ fontWeight: 300, fontSize: "1rem",letterSpacing: "0.5px",color: "text.primary", marginTop:"8px" }}>
                  {product.description}
                </Typography> 
                <br></br>
                <hr></hr> 


            {/* Categories/Suitable For Section */}
            {product.categories && product.categories.length > 0 && ( // only print if categories exist
            <div style={{ marginTop: "12px" }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 400, fontSize: "1.3rem",letterSpacing: "0.5px",color: "text.primary", }}>
                    Suitable For:
                </Typography> 
                <Stack direction="row" spacing={1} flexWrap="wrap" marginTop={"10px"}>
                {product.categories.map((category) => ( // get categories for the given product
                    // this component shows all the "Tags"
                    <Chip
                    key={category.categoryId}  
                    label={category.name} // get category name
                    size="small"
                    sx={{
                        backgroundColor: "#F3E5F5",
                        color: "#6A1B9A",
                        fontWeight: 500,
                    }}
                    />
                ))}
                </Stack>
            </div>
            )}

            </Grid>
                
            {/* these snackbar and alert components help display errors to the user for trying to add ro cart when no more stock available. */}
            <Snackbar 
                open={showError}
                autoHideDuration={3000}
                onClose={() => setShowError(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MuiAlert severity="error" variant="filled" sx={{ width: '100%' }}>
                    {errorMessage}
                </MuiAlert>
            </Snackbar>
        
        </Grid>
        </div>
    ); 
}


  