import { Avatar, Box, Grid2, IconButton } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useThemeColor from "@/hooks/useThemeColor";

export default function Filesmallcard() {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();

  return (
    <Grid2 container size={{ md: 3, xs: 12 }}>
      <Box sx={{ boxShadow: 1, width: "100%", p: 1, borderRadius: 2 }}>
        <Grid2 container size={12} sx={{ alignItems: "center" }}>
          <Grid2 size={1.8}>
            <Avatar
              sx={{ bgcolor: green[500], borderRadius: 1 }}
              variant="square"
            >
              Sm
            </Avatar>
          </Grid2>
          <Grid2
            container
            size={10.2}
            sx={{
              display: "flex",
              flexDirection: "row",
              px: 1,
            }}
          >
            <Grid2 container size={10}>
              <Grid2
                size={12}
                sx={{
                  textOverflow: "ellipsis",
                  textWrap: "nowrap",
                  color: text,
                  fontSize: 14,
                  overflow: "hidden",
                }}
              >
                Pura Creative PNG
              </Grid2>
              <Grid2 size={12} sx={{ fontSize: 10, color: optional }}>
                Pura Creative PNG
              </Grid2>
            </Grid2>
            <Grid2 size={2}>
              <IconButton size="medium">
                <MoreVertIcon />
              </IconButton>
            </Grid2>
          </Grid2>
        </Grid2>
      </Box>
    </Grid2>
  );
}
