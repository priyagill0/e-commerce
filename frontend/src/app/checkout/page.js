"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import OrderSummary from "./OrderSummary";
import CartItem from "./CartItem";

export default function CheckoutPage() {
  const router = useRouter();

  const [cart, setCart] = useState(null);

  // Shipping form state
  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  // Billing form state
  const [billingStreet, setBillingStreet] = useState("");
  const [billingProvince, setBillingProvince] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [billingPhone, setBillingPhone] = useState("");

  // Checkbox state
  const [sameAsShipping, setSameAsShipping] = useState(false);

  // Payment form state
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const [productImages, setProductImages] = useState([]);

   // Load cart
   useEffect(() => {
    fetch("http://localhost:8080/api/cart", { credentials: "include" })
      .then(async (res) => {
        const text = await res.text();
        if (!text) return { items: [] };
        return JSON.parse(text);
      })
      .then((data) => setCart(data))
      .catch((err) => console.error(err));
  }, []);

  // Load product images
  useEffect(() => {
    fetch("http://localhost:8080/api/product_image")
      .then((res) => res.json())
      .then((data) => setProductImages(data))
      .catch((err) => console.error("Error loading images:", err));
  }, []);


  // Sync billing fields when checkbox is toggled
  useEffect(() => {
    if (sameAsShipping) {
      setBillingStreet(street);
      setBillingProvince(province);
      setBillingCountry(country);
      setBillingZip(zip);
      setBillingPhone(phone);
    }
  }, [sameAsShipping, street, province, country, zip, phone]);

  useEffect(() => {
    console.log("Cart at checkout:", cart);
  }, [cart]);
  

  const handleCheckout = async () => {
    setLoading(true);
    setPaymentError("");

    try {
      // Save Shipping Info
      const shippingRes = await fetch("http://localhost:8080/api/checkout/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ street, province, country, zip, phone }),
      });
      const shippingAddressId = await shippingRes.text();

      // Billing: If same as shipping, use shipping values
      const billingRes = await fetch("http://localhost:8080/api/checkout/billing", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        street: sameAsShipping ? street : billingStreet,
        province: sameAsShipping ? province : billingProvince,
        country: sameAsShipping ? country : billingCountry,
        zip: sameAsShipping ? zip : billingZip,
        phone: sameAsShipping ? phone : billingPhone
      }),
    });

      const billingAddressId = await billingRes.text();

      // Validate payment
      if (creditCardNumber.length !== 16) {
        setPaymentError("Credit Card Authorization Failed.");
        setLoading(false);
        return;
      }

      // Process Payment
      const paymentRes = await fetch("http://localhost:8080/api/checkout/payment", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ creditCardNumber, name, expiryDate, cvc }),
      });
      const approved = await paymentRes.json();

      if (!approved) {
        setPaymentError("Credit Card Authorization Failed.");
        setLoading(false);
        return;
      }

      router.push(`/order-confirmation/${cart.cartId}`);
    } catch (err) {
      console.error(err);
      setPaymentError("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  if (!cart) {
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={70} />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "3rem",
        margin: "5rem 15rem 3rem",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1.5, minWidth: "300px" }}>
        {/* Shipping */}
        <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 2 }}>
          Shipping Information
        </Typography>
        <TextField fullWidth label="Street" value={street} onChange={(e) => setStreet(e.target.value)} margin="normal" />
        <TextField fullWidth label="Province" value={province} onChange={(e) => setProvince(e.target.value)} margin="normal" />
        <TextField fullWidth label="Country" value={country} onChange={(e) => setCountry(e.target.value)} margin="normal" />
        <TextField fullWidth label="Zip/Postal Code" value={zip} onChange={(e) => setZip(e.target.value)} margin="normal" />
        <TextField fullWidth label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} margin="normal" />

        {/* Billing Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={sameAsShipping}
              onChange={(e) => setSameAsShipping(e.target.checked)}
            />
          }
          label="Billing address same as shipping"
          sx={{ mt: 3 }}
        />

        {/* Billing Form (hidden when checkbox checked) */}
        {!sameAsShipping && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, marginTop: 4, marginBottom: 2 }}>
              Billing Information
            </Typography>
            <TextField fullWidth label="Street" value={billingStreet} onChange={(e) => setBillingStreet(e.target.value)} margin="normal" />
       
            <TextField fullWidth label="Province" value={billingProvince} onChange={(e) => setBillingProvince(e.target.value)} margin="normal" />
            <TextField fullWidth label="Country" value={billingCountry} onChange={(e) => setBillingCountry(e.target.value)} margin="normal" />
            <TextField fullWidth label="Zip/Postal Code" value={billingZip} onChange={(e) => setBillingZip(e.target.value)} margin="normal" />
            <TextField fullWidth label="Phone" value={billingPhone} onChange={(e) => setBillingPhone(e.target.value)} margin="normal" />
          </>
        )}

        {/* Payment */}
        <Typography variant="h5" sx={{ fontWeight: 700, marginTop: 4, marginBottom: 2 }}>
          Payment Information
        </Typography>
        <TextField fullWidth label="Card Number" value={creditCardNumber} onChange={(e) => setCreditCardNumber(e.target.value)} margin="normal" />
        <TextField fullWidth label="Name on Card" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
        <TextField fullWidth label="Expiry Date (MM/YY)" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} margin="normal" />
        <TextField fullWidth label="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} margin="normal" />

        {paymentError && <Typography color="error" sx={{ mt: 2 }}>{paymentError}</Typography>}

        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? "Processing..." : "Place Order"}
        </Button>
      </div>

      <div style={{ flex: 1, minWidth: "300px", padding: "1rem", borderRadius: "8px", height: "fit-content" }}>
        <OrderSummary
          subtotal={cart.subtotal}
          tax={cart.tax}
          shipping={cart.shipping}
          total={cart.total}
          
          itemCount={cart.totalCartItems}
        />
        <div
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            maxWidth: "420px",
            width: "100%",
            backgroundColor: "#fff",
            marginBottom: "2rem",
            marginTop: "3rem"
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: "1rem" }}>
            In your cart
          </Typography>
          {/* CART ITEMS DISPLAY */}
          
        
          {cart.items.map((cartItem) => {
            const relatedImages = productImages.filter(
              (img) =>
                img.product.productId ===
                cartItem.productVariant.product.productId
            );
            const firstImage = relatedImages.length > 0 ? relatedImages[0] : null;

            return (
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                productImages={productImages}
                productImage={firstImage}
                
              />
            );
          })}
      </div>  
    </div>
    </div>
  );
  
}
