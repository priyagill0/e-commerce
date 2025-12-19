
"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/app/admin/inventory/Table";
import Button from "@mui/material/Button";
import AddProductModal from "./AddProductModal";
import AddVariantModal from "./AddVariantModal";
import { useRouter } from "next/navigation";

export default function InventoryPage() {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openAddVariant, setOpenAddVariant] = useState(false);

  // only allow acces to ADMIN
  useEffect(() => {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;

    if (!user || user.adminRole !== true) {
      // Redirect non-admins
      router.replace("/"); 
    }
  }, [router]);

  const handleAddNewProduct = async (productData) => {
    try {
      const res = await fetch("http://localhost:8080/api/product/addProductWithVariant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
  
      if (!res.ok) throw new Error("Failed to add product");
   
      // Refetch full table to include new product + variant
      const updatedRes = await fetch("http://localhost:8080/api/product_variant/sorted");
      const updatedData = await updatedRes.json();
  
      const mappedData = updatedData.map((v) => ({
        product_id: v.product.productId,
        brand: v.product.brand,
        name: v.product.name,
        description: v.product.description,
        type: v.product.productType,
        variant_id: v.variantId,
        size: v.size,
        price: Number(v.price),
        quantity: v.quantity,
        categories: v.product.categories.map((c) => c.name).join(", "),
      }));
  
      setRows(mappedData); // update table
      setOpenAddProduct(false);
    } catch (err) {
      console.error(err);
    }
  }; 

    const handleAddNewVariant = async (variantData) => {
        try {
        const res = await fetch("http://localhost:8080/api/product_variant", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(variantData),
        });
        if (!res.ok) throw new Error("Failed to add variant");
    
        // Refetch the full table
        const updatedRes = await fetch("http://localhost:8080/api/product_variant/sorted");
        const updatedData = await updatedRes.json();
    
        const mappedData = updatedData.map((v) => ({
            product_id: v.product.productId,
            brand: v.product.brand,
            name: v.product.name,
            description: v.product.description,
            type: v.product.productType,
            variant_id: v.variantId,
            size: v.size,
            price: Number(v.price),
            quantity: v.quantity,
            categories: v.product.categories.map((c) => c.name).join(", "),
        }));
    
        setRows(mappedData);
        setOpenAddVariant(false);
        } catch (err) {
        console.error(err);
        }
    };
  

  const handleEdit = async (variantId, field, value) => {
    try {
      const res = await fetch(`http://localhost:8080/api/product_variant/${variantId}/qty`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Number(value)),
      });

      if (!res.ok) throw new Error("Failed to update quantity");

      setRows((prev) =>
        prev.map((row) =>
          row.variant_id === variantId ? { ...row, quantity: Number(value) } : row
        )
      );
    } catch (err) {
      console.error("Error saving quantity:", err);
    }
  };

  const columns = [
    { id: "product_id", label: "Product ID", minWidth: 80 },
    { id: "brand", label: "Brand", minWidth: 80 },
    { id: "name", label: "Name", minWidth: 150 },
    { id: "description", label: "Description", minWidth: 150 },
    { id: "type", label: "Product Type", minWidth: 80 },
    { id: "variant_id", label: "Variant ID", minWidth: 90 },
    { id: "size", label: "Size", minWidth: 80 },
    { id: "price", label: "Price", minWidth: 100, format: (v) => `$${v.toFixed(2)}` },
    { id: "categories", label: "Categories", minWidth: 100 },
    { id: "quantity", label: "Quantity", minWidth: 50, editable: true },
    {
      id: "stockStatus",
      label: "Stock",
      minWidth: 100,
      render: (row) => {
        if (row.quantity === 0) {
          return (
            <span style={{ color: "RED", fontWeight: "bold", fontSize: "15px" }} title="Sold Out">
              SOLD OUT
            </span>
          );
        }
      
        let color = "green";
        let title = `Qty: ${row.quantity}`;
      
        if (row.quantity <= 5) {
          color = "red";
          title = `Critically Low (${row.quantity} left)`;
        } else if (row.quantity <= 15) {
          color = "orange";
          title = `Low (${row.quantity} left)`;
        }
      
        return (
          <span
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: color,
            }}
            title={title}
          />
        );
      }      
    },
    { id: "update", label: "Update", minWidth: 50 },
  ];

  useEffect(() => {
    async function load() {
      const res = await fetch("http://localhost:8080/api/product_variant/sorted");
      const data = await res.json();

      const mappedData = data.map((v) => ({
        product_id: v.product.productId,
        brand: v.product.brand,
        name: v.product.name,
        description: v.product.description,
        type: v.product.productType,
        variant_id: v.variantId,
        size: v.size,
        price: Number(v.price),
        quantity: v.quantity,
        categories: v.product.categories.map((c) => c.name).join(", "),
        lowStock: v.quantity <= 5, // low stock indicator
      }));

      setRows(mappedData);
    }

    load();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ textAlign: "center" }}>Product Inventory</h2>

      <div style={{ display: "flex", gap: "12px", marginBottom: 15, justifyContent: "flex-end"}}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenAddProduct(true)}
                sx={{ textTransform: "none"}} 
            >
                Add New Product
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenAddVariant(true)}
                sx={{ textTransform: "none"}} 
            >
                Add Product Variant
            </Button>
      </div>

      <AdminTable columns={columns} rows={rows} onEdit={handleEdit} />

      <AddProductModal
        open={openAddProduct}
        onClose={() => setOpenAddProduct(false)}
        onAdd={handleAddNewProduct}
      />

      <AddVariantModal
        open={openAddVariant}
        onClose={() => setOpenAddVariant(false)}
        onAdd={handleAddNewVariant}
      />
    </div>
  );
}
