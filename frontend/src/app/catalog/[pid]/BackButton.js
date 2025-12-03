"use client";

import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTheme } from "@mui/material/styles";

export default function BackButton() {
  const router = useRouter();
  const theme = useTheme(); // get MUI theme

  return (
    <IconButton
      onClick={() => router.back()}
      sx={{
        position: "absolute",
        top: "10px",
        left: "18px",
        backgroundColor: "#f5f5f5",
        "&:hover": { backgroundColor: "#e0e0e0" },
      }}
    >
      <ArrowBackIosNewIcon sx={{ color: theme.palette.primary.dark}} /> {/* arrow color */}
    </IconButton>
  );
}
