"use client";

import { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from '@mui/material/styles';


// setting the height for select menu items
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

export default function FilterBar({ onChange }) {
    const theme = useTheme();

    const [filters, setFilters] = useState({
        type: "",
        price: "",
        sort: "",
        categories: [], 
        search: "",
    });

    const [productTypes, setTypes] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Fetch all product types from backend
    useEffect(() => {
        fetch("http://localhost:8080/api/product/types")
          .then(res => res.json())
          .then(data => {
            console.log("types from backend:", data);
            setTypes(data);
          });
      }, []);

    // Fetch all categories from backend
    useEffect(() => {
    fetch("http://localhost:8080/api/category")
        .then((res) => res.json())
        .then((data) => setCategories(data));
    }, []);


    // Fetch all products from backend
    useEffect(() => {
        fetch("http://localhost:8080/api/product")
            .then((res) => res.json())
            .then((data) => setProducts(data));
        }, []);

    // Update filter and notify the parent component (Catalog Page)
    function updateFilter(key, value) {
        const updated = { ...filters, [key]: value };
        setFilters(updated);
        onChange(updated);
    }
      
    return (
        <div className="flex flex-wrap gap-6 mt-3 mb-5 justify-center w-full">

            {/* Sort */}
            <FormControl sx={{ m: 0.8, width: 160 }}>
                <InputLabel id="sort-select-label">Sort</InputLabel>
                <Select
                    labelId="sort-select-label"
                    id="sort-select"
                    value={filters.sort} //not sure about this one
                    onChange={(e) => updateFilter("sort", e.target.value)}
                    input={<OutlinedInput label="Sort" />}
                    MenuProps={MenuProps}
                >
                    <MenuItem value="">Sort</MenuItem>
                    <MenuItem value="az">Name: A → Z</MenuItem>
                    <MenuItem value="low">Price: Low → High</MenuItem>
                    <MenuItem value="high">Price: High → Low</MenuItem>
                </Select>
            </FormControl>  


            {/* Product Type Select */}
            <FormControl sx={{ m: 0.8, width: 155 }}>
                <InputLabel id="product-type-select-label">Product Type</InputLabel>
                <Select
                    labelId="product-type-select-label"
                    id="demo-multiple-name"
                    value={filters.type}
                    onChange={(e) => updateFilter("type", e.target.value)}
                    input={<OutlinedInput label="Product Type" />}
                    MenuProps={MenuProps}
                >

                    <MenuItem  key="AllTypes"  value="">
                        Product Type
                    </MenuItem>

                    {productTypes.map((type) => (
                        <MenuItem
                        key={type.value}
                        value={type.value} 
                        >
                        {type.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
     

            {/* Price */} 
            <FormControl sx={{ m: 0.8, width: 150 }}>
                <InputLabel id="price-select-label">Price</InputLabel>
                <Select
                    labelId="price-select-label"
                    id="price-select"
                    value={filters.price} //not sure about this one
                    onChange={(e) => updateFilter("price", e.target.value)}
                    input={<OutlinedInput label="Price" />}
                    MenuProps={MenuProps}
                >
                    <MenuItem value="">Price</MenuItem>
                    <MenuItem value="0-15">Under $15</MenuItem>
                    <MenuItem value="15-30">$15 – $30</MenuItem>
                    <MenuItem value="30-50">$30 – $50</MenuItem>
                    <MenuItem value="50+">$50+</MenuItem>
                </Select>
            </FormControl>  

            {/* Categories Multi-Select */}
            <FormControl sx={{ m: 0.8, width: 220 }}>
                <InputLabel id="category-select-label">Categories</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category-select"
                    multiple
                    value={filters.categories}
                    onChange={(e) => updateFilter("categories", e.target.value)}
                    input={<OutlinedInput label="Categories" />}
                    // shows the number of category filters selected
                    renderValue={(selected) => `${selected.length} selected`}
                    MenuProps={MenuProps}
                >
                {categories.map((c) => (
                    <MenuItem key={c.categoryId} value={c.categoryId}>
                    <Checkbox checked={filters.categories.includes(c.categoryId)} />
                    <ListItemText primary={c.name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>   

            {/* Search Bar For Products and Brands */}
            <TextField      
                sx={{ m: 0.8, width: 255 }}
                placeholder="Search products or brands"
                variant="outlined"
                value={filters.search || ""}
                onChange={(e) => updateFilter("search", e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                        ),
                        
                        endAdornment: filters.search ? (
                            <InputAdornment position="end">
                            <IconButton
                                onClick={() => updateFilter("search", "")}
                                edge="end"
                                size="small"
                            >
                                <ClearIcon fontSize="small" />
                            </IconButton>
                            </InputAdornment>
                        ) : null,
                    }
                }}
            />


            {/* Clear All Filters Link */}
            <div style={{ width: "100%", textAlign: "right"  }}>
            <button
                onClick={() => {
                const reset = {
                    type: "",
                    price: "",
                    sort: "",
                    categories: [],
                    search: ""
                };
                setFilters(reset);
                onChange(reset);
                }}
                style={{ color: theme.palette.primary.main, cursor: 'pointer', border: 'none', background: 'none' }}
                onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
                Clear All Filters
            </button>
            </div>
        </div>
    );
}
