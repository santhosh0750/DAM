import { Avatar, Box, Button, Grid2, IconButton, Menu, MenuItem } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useThemeColor from "@/hooks/useThemeColor";
import Menucomponents from "./Menucomponents";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
export default function Filesmallcard() {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();
  const[OpenMenu,setOpenMenu]=useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
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
            <Grid2 container size={9}>
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
            <Grid2 size={3} sx={{display:"flex",alignItems:"center"}}>
              <BookmarkBorderIcon/>
            <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <MoreVertIcon />
      </IconButton>
      {open&& <Menucomponents open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />}
      {/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu> */}

              {/* <IconButton size="medium" onClick={()=> setOpenMenu(!OpenMenu)} >
              </IconButton> */}
            </Grid2>
          </Grid2>
        </Grid2>
      </Box>
    </Grid2>
  );
}
