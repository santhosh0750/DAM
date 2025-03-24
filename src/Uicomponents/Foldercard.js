import { Avatar, Box, Grid2, IconButton } from "@mui/material";
import React, { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menucomponents from "./Menucomponents";
import useThemeColor from "@/hooks/useThemeColor";
import FolderIcon from "@mui/icons-material/Folder";

export default function Foldercard() {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();
  const [OpenMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid2 container size={{ md: 3, xs: 12 }}>
      <Box sx={{ boxShadow: 1, width: "100%", p: 1, borderRadius: 2 }}>
        <Grid2 container size={12} sx={{ alignItems: "center" }}>
          <Grid2 size={1.8}>
            <FolderIcon sx={{ fontSize: 36, color: "#ffb300" }} />
          </Grid2>
          <Grid2
            container
            size={10.2}
            sx={{
              px: 1,
              alignItems: "center",
            }}
          >
            <Grid2
              size={10}
              sx={{
                color: text,
                fontSize: 14,
                overflow: "hidden",
              }}
            >
              Pura Creative PNG
            </Grid2>
            <Grid2 size={2} sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              {open && (
                <Menucomponents
                  open={open}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                />
              )}
            </Grid2>
          </Grid2>
        </Grid2>
      </Box>
    </Grid2>
  );
}
