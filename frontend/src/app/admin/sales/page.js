"use client";

import { useEffect, useState } from "react";
import AdminTable from "./Table";
import { useRouter } from "next/navigation";

export default function SalesPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [customerFilter, setCustomerFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [customerOptions, setCustomerOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  
    // only allow acces to ADMIN
    useEffect(() => {
      const stored = localStorage.getItem("user");
      const user = stored ? JSON.parse(stored) : null;
  
      if (!user || user.adminRole !== true) {
        // Redirect non-admins
        router.replace("/"); 
      }
    }, [router]);

  useEffect(() => {
    async function loadSales() {
      try {
        const res = await fetch("http://localhost:8080/api/order-item/sales-history");
        const data = await res.json();

        const rowsData = Array.isArray(data) ? data : data.salesHistory || [];
        setRows(rowsData);

        const uniqueCustomers = [...new Set(rowsData.map(row => row.customerName))];
        const uniqueProducts = [...new Set(rowsData.map(row => row.productName))];
        setCustomerOptions(uniqueCustomers);
        setProductOptions(uniqueProducts);

        const total = rowsData.reduce((sum, row) => sum + row.total, 0);
        setTotalSales(total);
      } catch (err) {
        console.error("Failed to load sales:", err);
        setRows([]);
        setTotalSales(0);
      } finally {
        setLoading(false);
      }
    }

    loadSales();
  }, []);

  const filteredRows = rows.filter(row => {
    const placedAt = new Date(row.placedAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const customerMatch = customerFilter === "" || row.customerName === customerFilter;
    const productMatch = productFilter === "" || row.productName === productFilter;
    const dateMatch = (!start || placedAt >= start) && (!end || placedAt <= end);

    return customerMatch && productMatch && dateMatch;
  });

  const filteredTotalSales = filteredRows.reduce((sum, row) => sum + row.total, 0);

  const columns = [
    { id: "orderId", label: "Order ID", minWidth: 100 },
    { id: "customerName", label: "Customer", minWidth: 120 },
    { id: "productName", label: "Product", minWidth: 120 },
    { id: "variantSize", label: "Variant", minWidth: 80 },
    { id: "quantity", label: "Quantity", minWidth: 60 },
    { id: "productPrice", label: "Price", minWidth: 80, format: (v) => `$${v.toFixed(2)}` },
    { id: "total", label: "Total", minWidth: 100, format: (v) => `$${v.toFixed(2)}` },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "placedAt", label: "Placed At", minWidth: 140, format: (v) => new Date(v).toLocaleString() },
  ];

  if (loading) {
    return <div style={{ padding: 30 }}>Loading sales data...</div>;
  }

  return (
    <div style={{ padding: "50px 30px 30px 30px" }}> {/* Added top padding */}
      <h2 style={{ textAlign: "center", marginBottom: 30 }}>Sales History</h2>

      {/* Filter Heading */}
      <h4 style={{ marginBottom: 10 }}>Filter by:</h4>

      {/* Filters */}
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <label>
          Customer:{" "}
          <select value={customerFilter} onChange={(e) => setCustomerFilter(e.target.value)}>
            <option value="">All</option>
            {customerOptions.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <label>
          Product:{" "}
          <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
            <option value="">All</option>
            {productOptions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>

        <label>
          Start Date:{" "}
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>

        <label>
          End Date:{" "}
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
      </div>

      {/* Total Sales */}
      <h3 style={{ marginBottom: 20 }}>Total Sales: ${filteredTotalSales.toFixed(2)}</h3>

      {/* Admin Table */}
      <AdminTable columns={columns} rows={filteredRows} />
    </div>
  );
}
