"use client";
import Link from "next/link";

// not actually used!
export default function Admin() {
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
      </div>
    </div>
  );
}
