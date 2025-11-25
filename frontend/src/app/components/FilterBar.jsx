"use client";

import { useState } from "react";

export default function FilterBar({ onChange }) {
    const [filters, setFilters] = useState({
        type: "",
        price: "",
        sort: "",
    });

    function updateFilter(key, value) {
        const updated = { ...filters, [key]: value };
        setFilters(updated);
        onChange(updated);
    }

    return (
        <div className="flex flex-wrap gap-6 mt-6 mb-10 justify-center w-full">

            {/* Sort */}
            <select
                className="border px-3 py-2 rounded-md w-[180px]"
                onChange={(e) => updateFilter("sort", e.target.value)}
            >
                <option value="">Sort</option>
                <option value="az">A–Z</option>
                <option value="low">Price: Low → High</option>
                <option value="high">Price: High → Low</option>
            </select>

            {/* Product Type */}
            <select
                className="border px-3 py-2 rounded-md w-[180px]"
                onChange={(e) => updateFilter("type", e.target.value)}
            >
                <option value="">Product Type</option>
                <option value="FACE_WASH">Face Wash</option>
                <option value="TONER">Toner</option>
                <option value="SERUM">Serum</option>
                <option value="MASKS">Masks</option>
                <option value="CREAM">Moisturizer</option>
                <option value="TOOLS">Tools</option>
            </select>

            {/* Price */}
            <select
                className="border px-3 py-2 rounded-md w-[180px]"
                onChange={(e) => updateFilter("price", e.target.value)}
            >
                <option value="">Price</option>
                <option value="0-15">Under $15</option>
                <option value="15-30">$15–30</option>
                <option value="30-50">$30–50</option>
                <option value="50+">$50+</option>
            </select>

        </div>
    );
}
