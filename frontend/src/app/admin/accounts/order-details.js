"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CartItem from "@/app/components/CartItem"; // Reuse your cart item component
import BackButton from "@/app/components/BackButton";

export default function AdminOrderDetails({ params }) {
    const router = useRouter();

    const { orderId } = params;

    
  // Order data
  const [order, setOrder] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Shipping info
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  // Billing info
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [billingStreet, setBillingStreet] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingProvince, setBillingProvince] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [billingPhone, setBillingPhone] = useState("");

  // Payment info
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  // Fetch order details
  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`http://localhost:8080/api/admin/orders/${orderId}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch order");
        const data = await res.json();
        setOrder(data);

        // Set shipping info
        setStreet(data.shippingStreet);
        setCity(data.shippingCity);
        setProvince(data.shippingProvince);
        setCountry(data.shippingCountry);
        setZip(data.shippingZip);
        setPhone(data.shippingPhone);

        // Set billing info
        setSameAsShipping(data.sameAsShipping);
        if (!data.sameAsShipping) {
          setBillingStreet(data.billingStreet);
          setBillingCity(data.billingCity);
          setBillingProvince(data.billingProvince);
          setBillingCountry(data.billingCountry);
          setBillingZip(data.billingZip);
          setBillingPhone(data.billingPhone);
        }

        // Set payment info
        setCardNumber(data.cardNumber || "");
        setName(data.name || "");
        setExpiryDate(data.expiryDate || "");
        setCvc(data.cvc || "");

      } catch (err) {
        console.error(err);
        setMessage("Failed to load order.");
      } finally {
        setLoading(false);
      }
    }

    async function fetchProductImages() {
      try {
        const res = await fetch("http://localhost:8080/api/product_image");
        const data = await res.json();
        setProductImages(data);
      } catch (err) {
        console.error("Error loading images:", err);
      }
    }

    fetchOrder();
    fetchProductImages();
  }, [orderId]);

  // Sync billing fields when checkbox toggled
  useEffect(() => {
    if (sameAsShipping) {
      setBillingStreet(street);
      setBillingCity(city);
      setBillingProvince(province);
      setBillingCountry(country);
      setBillingZip(zip);
      setBillingPhone(phone);
    }
  }, [sameAsShipping, street, city, province, country, zip, phone]);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const updatedOrder = {
        shippingStreet: street,
        shippingCity: city,
        shippingProvince: province,
        shippingCountry: country,
        shippingZip: zip,
        shippingPhone: phone,

        sameAsShipping,
        billingStreet,
        billingCity,
        billingProvince,
        billingCountry,
        billingZip,
        billingPhone,

        cardNumber,
        name,
        expiryDate,
        cvc,

        // Optionally: update cart items
        items: order.items,
      };

      const res = await fetch(`http://localhost:8080/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedOrder),
      });

      if (!res.ok) throw new Error("Failed to save changes");
      const data = await res.json();
      setOrder(data);
      setMessage("Order updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error saving order.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ marginTop: "5rem", textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading order...</Typography>
      </div>
    );
  }

  if (!order) {
    return <Typography sx={{ mt: 5 }}>Order not found.</Typography>;
  }

  return (
    <div style={{ margin: "3rem 10rem", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
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

        {/* Billing */}
        <FormControlLabel
          control={<Checkbox checked={sameAsShipping} onChange={(e) => setSameAsShipping(e.target.checked)} />}
          label="Billing same as shipping"
          sx={{ mt: 3 }}
        />
        {!sameAsShipping && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 3, mb: 2 }}>
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
        <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
          Payment Information
        </Typography>
        <TextField fullWidth label="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} margin="normal" />
        <TextField fullWidth label="Name on Card" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
        <TextField fullWidth label="Expiry Date (MM/YY)" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} margin="normal" />
        <TextField fullWidth label="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} margin="normal" />

        <Button variant="contained" sx={{ mt: 3 }} onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
        {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
      </div>

      {/* Cart Summary */}
      <div style={{ flex: 1, minWidth: "300px", padding: "1rem", borderRadius: "8px", backgroundColor: "#fafafa" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Cart Items
        </Typography>
        {order.items.map((item) => {
          const relatedImages = productImages.filter(img => img.product.productId === item.productVariant.product.productId);
          const firstImage = relatedImages.length > 0 ? relatedImages[0] : null;

          return <CartItem key={item.id} cartItem={item} productImages={productImages} productImage={firstImage} editable />;
        })}
      </div>
    </div>
  );
}
