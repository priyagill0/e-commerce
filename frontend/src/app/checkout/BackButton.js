"use client";

import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function BackButton() {
  const router = useRouter();

  return (
    <IconButton
      onClick={() => router.back()}
      sx={{
        position: "absolute",
        top: "10px",
        left: "10px",
        backgroundColor: "#f5f5f5",
        "&:hover": { backgroundColor: "#e0e0e0" },
      }}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
}
