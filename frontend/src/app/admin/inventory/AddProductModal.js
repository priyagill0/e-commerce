"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";

export default function AddProductModal({ open, onClose, onAdd }) {
  const initialProduct = {
    name: "",
    brand: "",
    type: "",
    description: "",
    categories: [],
    variant: { size: "", price: 0, qty: 0 },
    image: { imageUrl: "" },
  };

  const [newProduct, setNewProduct] = useState(initialProduct);
  const [productTypes, setTypes] = useState([]);

  const handleAdd = () => {
    onAdd(newProduct);
    setNewProduct(initialProduct);
  };

  // Fetch all product types from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/product/types")
      .then(res => res.json())
      .then(data => {
        console.log("types from backend:", data);
        setTypes(data);
      });
  }, []);


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: 400 }}>
        {/* Name */}
       <TextField
          label="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />

        {/* Brand */}
        <TextField
          label="Brand"
          value={newProduct.brand}
          onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
        />

        {/* Product Type Select */}
        <FormControl fullWidth>
          <InputLabel id="product-type-select-label">Product Type</InputLabel>
          <Select
            labelId="product-type-select-label"
            id="product-type-select"
            value={newProduct.type}
            onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
            label="Product Type"
          >
            {productTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Description */}
        <TextField
          label="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />

        {/* Categories */}
        <TextField
          label="Categories (comma separated)"
          value={newProduct.categories.join(", ")}
          onChange={(e) =>
            setNewProduct({ ...newProduct, categories: e.target.value.split(",").map(c => c.trim()) })
          }
        />

       {/* Image Url */}
        <TextField
          label="Image Url"
          value={newProduct.image.imageUrl}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: { ...newProduct.image, imageUrl: e.target.value } })
          }
        />

        {/* Size */}
        <TextField
          label="Size"
          value={newProduct.variant.size}
          onChange={(e) =>
            setNewProduct({ ...newProduct, variant: { ...newProduct.variant, size: e.target.value } })
          }
        />

       {/* Price */}
        <TextField
          label="Price"
          type="number"
          value={newProduct.variant.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, variant: { ...newProduct.variant, price: Number(e.target.value) } })
          }
        />

       {/* Quantity */}
        <TextField
          label="Quantity"
          type="number"
          value={newProduct.variant.qty}
          onChange={(e) =>
            setNewProduct({ ...newProduct, variant: { ...newProduct.variant, qty: Number(e.target.value) } })
          }
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ textTransform: "none"}}>Cancel</Button>
        <Button variant="contained" onClick={handleAdd} sx={{ textTransform: "none"}}>
          Add Product
        </Button>
      </DialogActions>

    </Dialog>
  );
}
