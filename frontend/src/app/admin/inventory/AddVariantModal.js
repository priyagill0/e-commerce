"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function AddVariantModal({ open, onClose, onAdd }) {
  const initialVariant = {
    product: { productId: "" },
    size: "",
    price: 0,
    quantity: 0
  };

  const [newVariant, setNewVariant] = useState(initialVariant);

  const handleAdd = () => {
    onAdd(newVariant);
    setNewVariant(initialVariant);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Product Variant</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: 400 }}>
        <TextField
          label="Product ID"
          value={newVariant.product.productId}
          onChange={(e) =>
            setNewVariant({ ...newVariant, product: { productId: e.target.value } })
          }
        />
        <TextField
          label="Size"
          value={newVariant.size}
          onChange={(e) =>
            setNewVariant({ ...newVariant, size: e.target.value })
          }
        />
        <TextField
          label="Price"
          type="number"
          value={newVariant.price}
          onChange={(e) =>
            setNewVariant({ ...newVariant, price: Number(e.target.value) })
          }
        />
        <TextField
          label="Quantity"
          type="number"
          value={newVariant.quantity}
          onChange={(e) =>
            setNewVariant({ ...newVariant, quantity: Number(e.target.value) })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ textTransform: "none"}} >Cancel</Button>
        <Button variant="contained" onClick={handleAdd} sx={{ textTransform: "none"}}>
          Add Variant
        </Button>
      </DialogActions>
    </Dialog>
  );
}
