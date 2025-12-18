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
import BackButton from "./BackButton";
import { useCart} from "@/app/components/CartContext";


export default function CheckoutPage() {

  const router = useRouter();

  const [cart, setCart] = useState(null);
  let billingAddressId = ""
  let shippingAddressId = ""
  // Shipping form state
  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  // Billing form state
  const [billingStreet, setBillingStreet] = useState("");
  const [billingProvince, setBillingProvince] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [billingPhone, setBillingPhone] = useState("");
  const [billingCity, setBillingCity] = useState("");

  // Checkbox state
  const [sameAsShipping, setSameAsShipping] = useState(false);

  // Payment form state
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  // New (manual) payment form state
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [newExpiryDate, setNewExpiryDate] = useState("");
  const [newCvc, setNewCvc] = useState("");

  const [useSavedPayment, setUseSavedPayment] = useState(false);



  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const [productImages, setProductImages] = useState([]);
  const [message, setMessage] = useState("");
  const { fetchCart } = useCart(); // need this to clear cart after checkout

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
      setBillingCity(city);

    }
  }, [sameAsShipping, street, province, country, zip, phone, city]);

  useEffect(() => {
    console.log("Cart at checkout:", cart);
  }, [cart]);
  useEffect(() => {
    async function fetchAddress() {
      try {
        const res = await fetch("http://localhost:8080/api/checkout/address", {
          credentials: "include", // include session cookie
        });
  
        if (!res.ok) return; // user not logged in
  
        const address = await res.json(); // GET returns JSON
        if (!address) return;
  
        setStreet(address.street || "");
        setProvince(address.province || "");
        setCountry(address.country || "");
        setZip(address.zip || "");
        setPhone(address.phone || "");
        setCity(address.city || "");
  
        // Toggle checkbox ON
        setSameAsShipping(true);

      } catch (err) {
        console.error("Failed to load user address", err);
      }
    }
  
    fetchAddress();
  }, []);

  useEffect(() => {
    console.log("Cart at checkout:", cart);
  }, [cart]);
  useEffect(() => {
    async function fetchPayment() {
      try {
        const res = await fetch("http://localhost:8080/api/checkout/getpay", {
          credentials: "include", // include session cookie
        });
  
        if (!res.ok) return; // user not logged in
  
        const payment = await res.json(); // GET returns JSON
        if (!payment) return;
        setCardNumber(payment.cardNumber || "");
        setName(payment.name || "");
        setExpiryDate(payment.expiryDate || "");
        setCvc(payment.cvc || "");


      } catch (err) {
        console.error("Failed to load user payment", err);
      }
    }
  
    fetchPayment();
  }, []);
  useEffect(() => {
    if (cardNumber) {
      setUseSavedPayment(true);
    }
  }, [cardNumber]);
  


  // Build form object for the backend
  
  const handleCheckout = async () => {
    setLoading(true);
    setPaymentError("");

    if (cardNumber.length !== 16) {
      setPaymentError("Credit Card Authorization Failed.");
      setLoading(false);
      return;
    }
  
    const form = {
      cartId: cart.cartId,

      shippingStreet: street,
      shippingProvince: province,
      shippingCountry: country,
      shippingZip: zip,
      shippingPhone: phone,

      sameAsShipping,
      billingStreet,
      billingProvince,
      billingCountry,
      billingZip,
      billingPhone,

      cardNumber: useSavedPayment ? cardNumber : newCardNumber,
      name: useSavedPayment ? name : newName,
      expiryDate: useSavedPayment ? expiryDate : newExpiryDate,
      cvc: useSavedPayment ? cvc : newCvc,
    };
    try {
      const res = await fetch(
        "http://localhost:8080/api/checkout/checkoutconfirm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage("Checkout failed: " + data.error);
        setLoading(false);
        return;
      }

      fetchCart(); // clear cart in context
      
      // Redirect to confirmation
      router.push(`/checkout/order-confirmation/${data.orderId}`);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!cart) {
    return (
      <div style={{ marginTop: "5rem", textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading your cart...</Typography>
      </div>
    );
  }

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     gap: "3rem",
    //     margin: "5rem 15rem 3rem",
    //     flexWrap: "wrap",
    //   }}
    // >
    
    <div
      style={{
        //position: "relative",
        display: "flex",
        gap: "3rem",
        flexWrap: "wrap",
        alignItems: "flex-start",
        
        marginTop: "5rem",
        marginRight: "15rem",
        marginBottom: "2rem",
        marginLeft: "15rem",
        
        
      }}
    >
      <BackButton />

    
      <div style={{ flex: 1.5, minWidth: "300px" }}>
      
        {/* Shipping */}
        <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 2 }}>
          Shipping Information
        </Typography>
        <TextField fullWidth label="Street" value={street} onChange={(e) => setStreet(e.target.value)} margin="normal" />
        <TextField fullWidth label="City" value={city} onChange={(e) => setCity(e.target.value)} margin="normal" />
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
            <TextField fullWidth label="City" value={billingCity} onChange={(e) => setBillingCity(e.target.value)} margin="normal" />
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
        <FormControlLabel
        control={
          <Checkbox
            checked={useSavedPayment}
            onChange={(e) => setUseSavedPayment(e.target.checked)}
          />
        }
        label="Use saved payment"
        sx={{ mb: 2 }}
        />
        {/* Saved payment display */}
        {useSavedPayment ? (
          <div
            style={{
              padding: "1rem",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              background: "#fafafa",
            }}
          >
            <Typography>
              <strong>Card:</strong> **** **** **** {(cardNumber || "").slice(-4)}
            </Typography>
            <Typography>
              <strong>Name:</strong> {name}
            </Typography>
            <Typography>
              <strong>Expiry:</strong> {expiryDate}
            </Typography>
          </div>
        ) : (
          <>
            <TextField
              fullWidth
              label="Card Number"
              value={newCardNumber}
              onChange={(e) => setNewCardNumber(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Name on Card"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Expiry Date (MM/YY)"
              value={newExpiryDate}
              onChange={(e) => setNewExpiryDate(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="CVC"
              value={newCvc}
              onChange={(e) => setNewCvc(e.target.value)}
              margin="normal"
            />
          </>
        )}

        {/* {!useSavedPayment ? (
        <TextField fullWidth label="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} margin="normal" />
        <TextField fullWidth label="Name on Card" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
        <TextField fullWidth label="Expiry Date (MM/YY)" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} margin="normal" />
        <TextField fullWidth label="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} margin="normal" />
        )} */}
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
