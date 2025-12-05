"use client";

import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    localStorage.removeItem("user");
    window.location.href = "/";
  }, []);

  return <p>Logging out...</p>;
}
