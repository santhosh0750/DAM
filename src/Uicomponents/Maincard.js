import { Avatar, Grid2, IconButton, Typography } from "@mui/material";
import React from "react";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import useThemeColor from "@/hooks/useThemeColor";

export default function Maincard() {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();

  return (
    <Grid2
      size={{ md: 2, xs: 12 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 1,
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <img
        srcSet={`${"https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"}?w=164&h=114&fit=crop&auto=format&dpr=2 2x`}
        src={`${"https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"}?w=164&h=114&fit=crop&auto=format`}
        alt={"test"}
        loading="lazy"
        style={{ borderRadius: "20px" }}
      />

      <Grid2 size={12}>
        <Typography
          variant="subtitle1"
          sx={{
            color: text,
            overflow: "hidden",
            textOverflow: "ellipsis",
            textWrap: "nowrap",
          }}
        >
          Pura Creative English
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Typography variant="body2" sx={{ color: primary, fontSize: 12 }}>
          Pura Creative
        </Typography>
      </Grid2>
      <Grid2 container size={12} sx={{ py: 0.2, alignItems: "center", px: 1 }}>
        <Grid2 size={2}>
          <Avatar sx={{ width: 24, height: 24 }}>H</Avatar>
        </Grid2>
        <Grid2
          container
          size={8}
          sx={{
            display: "flex",
            alignItems: "center",
            px: 1,
          }}
        >
          <Grid2 size={12}>
            <div style={{ color: text, fontSize: 12, width: "100%" }}>
              Deepa
            </div>
            <span style={{ color: optional, fontSize: 10 }}>20 Jan 2025</span>
          </Grid2>
        </Grid2>
        <Grid2 size={2}>
          <IconButton size="medium">
            <MoreVertRoundedIcon />
          </IconButton>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
