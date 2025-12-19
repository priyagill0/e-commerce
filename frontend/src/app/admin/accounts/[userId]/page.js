"use client";

import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";

export default function AdminUserEditPage() {
  const router = useRouter();
  const { userId } = useParams(); 

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingCard, setEditingCard] = useState(false);
  const [editingCVC, setEditingCVC] = useState(false);

    /* helper for Card masking */
    const maskCard = (num = "") =>
    num.length >= 4 ? `**** **** **** ${num.slice(-4)}` : "";

    /* helper for CVC masking */
    const maskCVC = (num = "") =>`***`;

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: {
      street: "",
      city: "",
      province: "",
      country: "",
      zip: "",
      phone: "",
    },
    payment: {
      cardNumber: "",
      name: "",
      expiryDate: "",
      cvc: "",
    },
  });

    // only allow acces to ADMIN
    useEffect(() => {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;

    if (!user || user.adminRole !== true) {
        // Redirect non-admins
        router.replace("/"); 
    }
    }, [router]); 
    
  /* ---------------- FETCH USER ---------------- */
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/customers/${userId}`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error();
        setUser(await res.json());
      } catch {
        setMessage("Failed to load user");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId]);

  /* ---------------- SAVE USER ---------------- */
  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(
        `http://localhost:8080/api/customers/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(user),
        }
      );

      if (!res.ok) throw new Error();
      setMessage("User updated successfully");
      router.back()
    } catch {
      setMessage("Error saving user");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div style={{ marginTop: "5rem", textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading user...</Typography>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <Paper sx={{ padding: 4, maxWidth: 900, margin: "3rem auto" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Edit User Account
      </Typography>

      {/* BASIC INFO */}
      <Typography variant="h6">Basic Information</Typography>
      <TextField
        label="First Name"
        fullWidth
        sx={{ mt: 2 }}
        value={user.firstName}
        onChange={(e) =>
          setUser({ ...user, firstName: e.target.value })
        }
      />
      <TextField
        label="Last Name"
        fullWidth
        sx={{ mt: 2 }}
        value={user.lastName}
        onChange={(e) =>
          setUser({ ...user, lastName: e.target.value })
        }
      />
      <TextField
        label="Email"
        fullWidth
        sx={{ mt: 2 }}
        value={user.email}
        onChange={(e) =>
          setUser({ ...user, email: e.target.value })
        }
      />

      {/* PASSWORD (READ ONLY)
      <TextField
        label="Password (hashed)"
        fullWidth
        sx={{ mt: 2 }}
        value={user.password}
        disabled
      />

      <Divider sx={{ my: 4 }} /> */}

          {/* ADDRESS */}
      <Typography variant="h6">Address</Typography>

      <TextField
        label="Street"
        fullWidth
        sx={{ mt: 2 }}
        value={user.address.street}
        onChange={(e) =>
            setUser({
            ...user,
            address: { ...user.address, street: e.target.value },
            })
        }
        />

      <TextField
        label="City"
        fullWidth
        sx={{ mt: 2 }}
        value={user.address.city}
        onChange={(e) =>
            setUser({
            ...user,
            address: { ...user.address, city: e.target.value },
            })
        }
        />

      <TextField
        label="Province"
        fullWidth
        sx={{ mt: 2 }}
        value={user.address.province}
        onChange={(e) =>
            setUser({
            ...user,
            address: { ...user.address, province: e.target.value },
            })
        }
        />

        <TextField
        label="Country"
        fullWidth
        sx={{ mt: 2 }}
        value={user.address.country}
        onChange={(e) =>
            setUser({
            ...user,
            address: { ...user.address, country: e.target.value },
            })
        }
        />

        <TextField
        label="Postal / Zip Code"
        fullWidth
        sx={{ mt: 2 }}
        value={user.address.zip}
        onChange={(e) =>
            setUser({
            ...user,
            address: { ...user.address, zip: e.target.value },
            })
        }
        />

        <TextField
        label="Phone"
        fullWidth
        sx={{ mt: 2 }}
        value={user.address.phone}
        onChange={(e) =>
            setUser({
            ...user,
            address: { ...user.address, phone: e.target.value },
            })
        }
        />

        <Divider sx={{ my: 4 }} />

      {/* PAYMENT */}
      <Typography variant="h6">Payment</Typography>
      {/* <TextField
        label="Card Number"
        fullWidth
        sx={{ mt: 2 }}
        value={user.payment.cardNumber}
        onChange={(e) =>
          setUser({
            ...user,
            payment: { ...user.payment, cardNumber: e.target.value },
          })
        }
      /> */}

{editingCard ? (
  <TextField
    label="Card Number"
    fullWidth
    sx={{ mt: 2 }}
    value={user.payment.cardNumber}
    onChange={(e) =>
      setUser({
        ...user,
        payment: {
          ...user.payment,
          cardNumber: e.target.value,
        },
      })
    }
  />
) : (
  <TextField
    label="Card Number"
    fullWidth
    sx={{ mt: 2 }}
    value={maskCard(user.payment.cardNumber)}
    disabled
  />
)}

<Button
  size="small"
  sx={{ mt: 1 }}
  onClick={() => setEditingCard(!editingCard)}
>
  {editingCard ? "Done" : "Edit Card"}
</Button>
 
      <TextField
        label="Name on Card"
        fullWidth
        sx={{ mt: 2 }}
        value={user.payment.name}
        onChange={(e) =>
          setUser({
            ...user,
            payment: { ...user.payment, name: e.target.value },
          })
        }
      />
      <TextField
        label="Expiry Date"
        fullWidth
        sx={{ mt: 2 }}
        value={user.payment.expiryDate}
        onChange={(e) =>
          setUser({
            ...user,
            payment: { ...user.payment, expiryDate: e.target.value },
          })
        }
      /> 


{editingCVC ? (
  <TextField
    label="CVC"
    fullWidth
    sx={{ mt: 2 }}
    value={user.payment.cvc}
    onChange={(e) =>
      setUser({
        ...user,
        payment: {
          ...user.payment,
          cvc: e.target.value,
        },
      })
    }
  />
) : (
  <TextField
    label="CVC"
    fullWidth
    sx={{ mt: 2 }}
    value={maskCVC(user.payment.cvc)}
    disabled
  />
)}

<Button
  size="small"
  sx={{ mt: 1 }}
  onClick={() => setEditingCVC(!editingCVC)}
>
  {editingCVC ? "Done" : "Edit CVC"}
</Button>

      {/* ACTIONS */}
      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
        <Button variant="outlined" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>

      {message && (
        <Typography sx={{ mt: 2 }} color="primary">
          {message}
        </Typography>
      )}
    </Paper>
  );
}
