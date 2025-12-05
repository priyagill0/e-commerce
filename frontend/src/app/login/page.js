"use client";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        sessionId: localStorage.getItem("sessionId")
    });

    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
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
            address: user.address // trying to save the entire address as one object
        }));

        setMessage("Login successful!");

        // Redirect to homepage
        window.location.href = "/";
    };

    return (
        <div style={{padding: 40, display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1 style={{marginBottom: 20}}>Login</h1>
            <input className="full border p-3 rounded mb-3" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
            <input type="password" className="full border p-3 rounded mb-3" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
            <button className="bg-gray-800 text-white p-3 rounded hover:bg-black" onClick={handleLogin}>Login</button>
            <p style={{color:"red"}}>{message}</p>
            <p style={{marginTop: 20}}>or</p>
            <Link href="/signup"><button className="w-full mt-5 border border-gray-800 text-gray-900 p-3 rounded hover:bg-gray-100">Create an Account</button></Link>
        </div>
    );
}