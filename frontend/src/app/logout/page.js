"use client";

import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    const logout = async () => {
      try {
        // Backend logout, this invalidates the session and starts a new one to ensure user is removed.
        await fetch("http://localhost:8080/api/auth/logout", {
          method: "POST",
          credentials: "include", 
        });
      } catch (err) {
        console.error("Logout failed:", err);
      }

      // Clear frontend user data
      localStorage.removeItem("user");

      // Redirect to home page 
      window.location.href = "/";
    };

    logout();
  }, []);

  return <p>Logging out...</p>;
}
