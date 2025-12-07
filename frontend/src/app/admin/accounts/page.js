"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountManagement() {
    return (
        <div style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 style={{ marginBottom: 20 }}>Account Management</h1>
        <p>Manage customer accounts here.</p>
        </div>
    );
}