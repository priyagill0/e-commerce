"use client";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
    const [form, setForm] = useState({
        firstName: "",
        lasName: "",
        email: "",
        password: "",
        address: {
            street: "",
            province: "",
            country: "",
            zip: "",
            phone: ""
        }
    });
    const [message, setMessage] = useState("");

    const handleSubmit = async() => {
        const res = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form)
        });

        if (res.ok) setMessage("Account created sucessfully!");
        else setMessage("Something went wrong.");
    };

    return (
        <div style={{padding: 40, display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1 style={{marginBottom: 20}}>Create Account</h1>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {/* Left Column */}
            <div style={{ flex: 1, minWidth: "300px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <input className="border p-3 rounded"  placeholder="First Name" onChange={(e) => setForm({ ...form, firstName: e.target.value })}/>
                <input className="border p-3 rounded"  placeholder="Last Name"  onChange={(e) => setForm({ ...form, lastName: e.target.value })}/>
                <input className="border p-3 rounded"  placeholder="Email"  onChange={(e) => setForm({ ...form, email: e.target.value })}/>
                <input className="border p-3 rounded"  type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })}/>
            </div>

            {/* Right Column */}
            <div style={{ flex: 1, minWidth: "300px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <input className="border p-3 rounded" placeholder="Street" onChange={(e) => setForm({ ...form, address: { ...form.address, street: e.target.value } })}/>
                <input className="border p-3 rounded" placeholder="Province" onChange={(e) => setForm({ ...form, address: { ...form.address, province: e.target.value } })} />
                <input className="border p-3 rounded" placeholder="Country" onChange={(e) => setForm({ ...form, address: { ...form.address, country: e.target.value } })}/>
                <input className="border p-3 rounded" placeholder="Zip" onChange={(e) => setForm({ ...form, address: { ...form.address, zip: e.target.value } })} />
                <input className="border p-3 rounded" placeholder="Phone" onChange={(e) => setForm({ ...form, address: { ...form.address, phone: e.target.value } }) } />
            </div>
            </div>
            <br></br>
            <button className="bg-gray-800 text-white p-3 rounded hover:bg-black" onClick={handleSubmit}>Sign Up</button>
            <p style={{color:"red"}}>{message}</p>
            <p style={{marginTop: 20}}>or</p>
            <Link href="/login"><button className="w-full mt-5 border border-gray-800 text-gray-900 p-3 rounded hover:bg-gray-100">Already have an account? Login</button></Link>
        </div>
    );
}