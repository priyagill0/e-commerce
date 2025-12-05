"use client";

export default function ClientButton() {
    return (
        <button
            onClick={() => alert("Add to cart coming soon!")}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
            Add to Cart
        </button>
    );
}
