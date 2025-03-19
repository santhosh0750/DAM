"use client";

import { useTheme } from "@mui/material/styles";

export default function useThemeColor() {
  const theme = useTheme();
  return {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    text: theme.palette.text.primary,
    textsecondary: theme.palette.text.secondary,
    optional: theme.palette.text.optional,
  };
}
