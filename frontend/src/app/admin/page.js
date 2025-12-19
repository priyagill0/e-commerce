"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// not actually used!
export default function Admin() {
  const router = useRouter();
  // only allow acces to ADMIN
  useEffect(() => {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;

    if (!user || user.adminRole !== true) {
      // Redirect non-admins
      router.replace("/"); 
    }
  }, [router]);
  return (
    <div style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ marginBottom: 20 }}>Admin Page</h1>
      <p>Welcome to the admin dashboard.</p>

      <div style={{
        marginTop: 30,
        display: "flex",
        gap: 20
      }}>
        <Link href="/admin/accounts">Customer Accounts</Link>
        <Link href="/admin/inventory">Product Inventory</Link>
        <Link href="/admin/sales">Sales History</Link>
        <Link href="/admin/orders">Order Management</Link>
      </div>
    </div>
  );
}
