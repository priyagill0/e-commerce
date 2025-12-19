"use client";

import { useEffect, useState } from "react";
import AdminTable from "./Table";
import Link from "next/link";


export default function SalesPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [customerFilter, setCustomerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [customerOptions, setCustomerOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  
  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("http://localhost:8080/api/order/admin");
        const data = await res.json();

        if (Array.isArray(data)) {
          const mappedRows = data.map(o => ({
            id: o.orderId,
            ...o,
            billingAddress: `${o.billingStreet}, ${o.billingCity}, ${o.billingState} ${o.billingZip}, ${o.billingCountry}`,
            shippingAddress: `${o.shippingStreet}, ${o.shippingCity}, ${o.shippingState} ${o.shippingZip}, ${o.shippingCountry}`,
          }));

          setRows(mappedRows);
          setCustomerOptions([...new Set(mappedRows.map(r => r.customerEmail))]);
          setStatusOptions([...new Set(mappedRows.map(r => r.status))]);
        }
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  // Function to update order status
  const handleStatusChange = async (orderId, newStatus) => {
    const prevRows = [...rows];

    // Optimistic update
    setRows(prev =>
      prev.map(row => (row.id === orderId ? { ...row, status: newStatus } : row))
    );

    try {
      await fetch(`http://localhost:8080/api/order/admin/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStatus),
      });
    } catch (err) {
      console.error("Failed to update status:", err);
      setRows(prevRows); // rollback on error
    }
  };

  // Filter rows
  const filteredRows = rows.filter(row => {
    const placedAt = new Date(row.placedAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const customerMatch = customerFilter === "" || row.customerEmail === customerFilter;
    const statusMatch = statusFilter === "" || row.status === statusFilter;
    const dateMatch = (!start || placedAt >= start) && (!end || placedAt <= end);

    return customerMatch && statusMatch && dateMatch;
  });

  const filteredTotalSales = filteredRows.reduce((sum, row) => sum + row.subtotal, 0);

  // Table columns
  const columns = [
    { id: "orderId", label: "Order ID", minWidth: 120, 
    render: row => (
        <Link
          href={`/checkout/order-confirmation/${row.id}`}
          style={{ color: "#1976d2", textDecoration: "underline" }}
        >
          {row.orderId}
        </Link>)
        },
    { id: "customerEmail", label: "Customer Email", minWidth: 180 },
    {
      id: "status",
      label: "Status",
      minWidth: 120,
      render: row => (
        <select
          value={row.status}
          onChange={e => handleStatusChange(row.id, e.target.value)}
        >
          {statusOptions.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      ),
    },
    { id: "subtotal", label: "Subtotal", format: v => `$${v.toFixed(2)}` },
    { id: "tax", label: "Tax", format: v => `$${v.toFixed(2)}` },
    { id: "shipping", label: "Shipping", format: v => `$${v.toFixed(2)}` },
    { id: "total", label: "Total", format: v => `$${v.toFixed(2)}` },
    { id: "placedAt", label: "Placed At", minWidth: 160, format: v => new Date(v).toLocaleString() },
    { id: "billingAddress", label: "Billing Address", minWidth: 250 },
    { id: "shippingAddress", label: "Shipping Address", minWidth: 250 },
  ];

  if (loading) return <div style={{ padding: 30 }}>Loading sales data...</div>;

  return (
    <div style={{ padding: "50px 30px 30px 30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: 30 }}>Order Management</h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <label>
          Customer:{" "}
          <select value={customerFilter} onChange={e => setCustomerFilter(e.target.value)}>
            <option value="">All</option>
            {customerOptions.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <label>
          Status:{" "}
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>

        <label>
          Start Date:{" "}
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </label>

        <label>
          End Date:{" "}
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </label>
      </div>

      {/* Total Sales */}
      <h3 style={{ marginBottom: 20 }}>Total Sales: ${filteredTotalSales.toFixed(2)}</h3>

      {/* Admin Table */}
      <AdminTable columns={columns} rows={filteredRows} />
    </div>
  );
}

