"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from '@mui/material/Button';

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        sessionId: null
    });

    const [redirect, setRedirect] = useState(null);
    const [message, setMessage] = useState("");

    // Load session ID from local storage and URL parameters
    useEffect(() => {
        const id = localStorage.getItem("sessionId");
        setForm(prev => ({ ...prev, sessionId: id }));

        const params = new URLSearchParams(window.location.search);
        setRedirect(params.get("redirect"));
    }, []);

    const handleLogin = async () => {
        const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
            credentials: "include"
        });

        if (res.status === 404) return setMessage("Email does not exist. Please sign up first.");
        if (res.status === 400) return setMessage("Incorrect password. Please try again.");
        if (!res.ok) return setMessage("Login failed. Please try again.");

        const user = await res.json();

        localStorage.setItem("user", JSON.stringify({
            id: user.userId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            payment: user.payment,
            adminRole: user.adminRole
        }));

        if (redirect === "checkout") {
            window.location.href = "/checkout";
        } else {
            window.location.href = "/";
        }
    };

    return (
        <div style={{padding: 40, display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1 style={{marginBottom: 20}}>Login</h1>
            <input className="full border p-3 rounded mb-3" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
            <input type="password" className="full border p-3 rounded mb-3" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />

            <Button 
                variant="contained"  // gives a filled blue button
                color="primary"
                onClick={handleLogin}
                sx={{ textTransform: "none"}}
                >
                Login
            </Button>           
            <p style={{color:"red"}}>{message}</p>
            <p style={{marginTop: 20}}>or</p> 
            <Link href={`/signup?redirect=${redirect || ""}`} passHref>
            <Button variant="contained" fullWidth
                sx={{
                mt: 2,
                backgroundColor: '#ffffff',       // white by default
                color: '#1976d2',                 // blue text
                border: '1px solid #1976d2',     // optional blue border
                '&:hover': {
                    backgroundColor: '#e3f2fd',    // light blue on hover
                },
                textTransform: "none"
                }}
            >
                Create an Account
            </Button>
            </Link>
        </div>
    );
}