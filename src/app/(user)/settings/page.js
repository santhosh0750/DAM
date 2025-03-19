"use client";
import useThemeColor from "@/hooks/useThemeColor";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import UserMaster from "./componets/UserMaster";
import Usergroup from "./componets/Usergroup";
import Customer from "./componets/Customer";
import Customergroup from "./componets/Customergroup";
import Collection from "./componets/Collection";
import Team from "./componets/Team";
import Role from "./componets/Role";

export default function page() {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();
  const router = useRouter();
  return (
    <Grid2 container>
      <Grid2 container size={12}>
        <Typography
          sx={{
            color: textsecondary,
            fontSize: "16px",
            fontWeight: 500,
            pb: 0.2,
          }}
        >
          Settings
        </Typography>
      </Grid2>
      <Grid2 container spacing={2} size={12} sx={{ mt: 1 }}>
        <UserMaster />
        <Usergroup />
        <Customer />
        <Customergroup />
        <Collection />
        <Team />
        <Role />
      </Grid2>
    </Grid2>
  );
}
