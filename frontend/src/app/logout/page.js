<<<<<<< Updated upstream
"use client";

import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    localStorage.removeItem("user");
    window.location.href = "/";
  }, []);

  return <p>Logging out...</p>;
}
=======
"use client";

import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("customerId");
    window.location.href = "/";
  }, []);

  return <p>Logging out...</p>;
}
>>>>>>> Stashed changes
