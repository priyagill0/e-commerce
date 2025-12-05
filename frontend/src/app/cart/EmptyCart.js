import { useRouter } from "next/navigation";

export default function EmptyCart() { 
    const router = useRouter(); 

return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // stack items vertically
        alignItems: "center",    // center horizontally
        justifyContent: "center", // center vertically
        height: "80vh",          // take most of the viewport height
        textAlign: "center",      // center text
        gap: "1rem",             // spacing between elements
        padding: "2rem",
      }}
    >
      <img
        src="assets/empty-cart.jpg"
        alt="Empty Cart"
        style={{ width: "200px" }}
      />
      <h2>Your Cart is Empty.</h2>
      <button
        onClick={() => router.push("/")}
        style={{ padding: "0.5rem 1rem", cursor: "pointer", color: "white", backgroundColor: "#0070f3", border: "none", borderRadius: "4px" }}
      >
        Go Shopping
      </button>
    </div>
  );
    }