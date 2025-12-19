"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button } from "@mui/material";

export default function Account() {
    const router = useRouter();
    const [user, setUser] = useState(null); // Editable values
    const [originalUser, setOriginalUser] = useState(null); // For change detection
    const [newPassword, setNewPassword] = useState("");  // Temporary plaintext
    const [editing, setEditing] = useState(false);

    // Load user info from LocalStorage
    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (!stored) return router.replace("/login");

        const parsed = JSON.parse(stored);
        console.log("Parsed user:", parsed);

        setUser(parsed);
        console.log("Parsed id:", parsed.id);
        setOriginalUser(JSON.parse(JSON.stringify(parsed))); // Deep clone
    }, [router]);

    if (!user) return <p>Loading...</p>;

    // Handle input changes
    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
    const handleAddress = (e) => setUser({ ...user, address: { ...user.address, [e.target.name]: e.target.value } });
    const handlePayment = (e) => setUser({ ...user, payment: { ...user.payment, [e.target.name]: e.target.value } });

    // Compare current user vs originalUser
    const userChanged = () => JSON.stringify(user) !== JSON.stringify(originalUser) || newPassword.trim() !== "";

    // Reset user view when Cancel is pressed
    const handleCancel = () => {
        setUser(JSON.parse(JSON.stringify(originalUser))); // Deep restore
        setNewPassword("");
        setEditing(false);
    };

    // Save changes to backend
    const handleSave = async () => {
        if (!userChanged()) return alert("No changes to save.");
        const payload = { ...user };
        if (newPassword.trim()) payload.password = newPassword;

        console.log("Payload being sent:", payload); // Debug JSON

        try {
            const res = await fetch(`http://localhost:8080/api/customers/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error(`Update failed: ${res.status}`);
            const updated = await res.json();

            setUser(updated);
            setOriginalUser(JSON.parse(JSON.stringify(updated)));
            localStorage.setItem("user", JSON.stringify(updated));

            setNewPassword("");
            setEditing(false);
            alert("Account updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Error updating account.");
        }
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
            <h1>My Account</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
                <TextField label="First Name" name="firstName" value={user.firstName} onChange={handleChange} disabled={!editing} />
                <TextField label="Last Name" name="lastName" value={user.lastName} onChange={handleChange} disabled={!editing} />
                <TextField label="Email" name="email" value={user.email} onChange={handleChange} disabled={!editing} />
                <TextField
                    label="Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={!editing}
                    placeholder="Enter only if changing password"
                />

                <h2 style={{ marginTop: "2rem" }}>Address Info</h2>
                <TextField label="Street" name="street" value={user.address.street} onChange={handleAddress} disabled={!editing} />
                <TextField label="City" name="city" value={user.address.city} onChange={handleAddress} disabled={!editing} />
                <TextField label="Province" name="province" value={user.address.province} onChange={handleAddress} disabled={!editing} />
                <TextField label="Country" name="country" value={user.address.country} onChange={handleAddress} disabled={!editing} />
                <TextField label="Postal Code" name="zip" value={user.address.zip} onChange={handleAddress} disabled={!editing} />
                <TextField label="Phone Number" name="phone" value={user.address.phone} onChange={handleAddress} disabled={!editing} />

                <h2 style={{ marginTop: "2rem" }}>Payment Info</h2>
                <TextField label="Card Number" name="cardNumber" value={user.payment.cardNumber} onChange={handlePayment} disabled={!editing} />
                <TextField label="Name on Card" name="name" value={user.payment.name} onChange={handlePayment} disabled={!editing} />
                <TextField label="Expiration Date" name="expiryDate" value={user.payment.expiryDate} onChange={handlePayment} disabled={!editing} />
                <TextField label="CVC" name="cvc" value={user.payment.cvc} onChange={handlePayment} disabled={!editing} />

                {editing ? (
                    <>
                        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
                    </>
                ) : (
                    <Button variant="outlined" color="primary" onClick={() => setEditing(true)}>Edit</Button>
                )}
                <Button variant="text" color="secondary" onClick={() => router.push("/")}>Back to Home</Button>
            </div>
        </div>
    );
}