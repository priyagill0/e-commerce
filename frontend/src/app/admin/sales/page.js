"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SalesHistory() {
    return (
        <div style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 style={{ marginBottom: 20 }}>Sales History</h1>
        <p>View sales history here.</p>
        </div>
    );
}