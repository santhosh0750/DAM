import { Grid2, IconButton } from "@mui/material";
import React from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListAltIcon from "@mui/icons-material/ListAlt";
import useThemeColor from "@/hooks/useThemeColor";
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';

export default function Tabbutton({FFView,setFFView}) {
  console.log("FFview",FFView)
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();

  return (
    <>
      <Grid2
        container
        sx={{
          justifyContent: "center",
          background: secondary,
          borderRadius: 2,
          alignItems: "center",
          my: 1,
        }}
      >
        {FFView}
        <IconButton onClick={()=> setFFView(!FFView)}>
          {FFView ? <ListAltIcon /> : <PhotoSizeSelectActualIcon/>}
        </IconButton>
      </Grid2>
      <Grid2
        container
        sx={{
          justifyContent: "center",
          background: secondary,
          borderRadius: 2,
          alignItems: "center",
          my: 1,
        }}
      >
        <IconButton>
          <AccountBoxIcon />
        </IconButton>
      </Grid2>
      <Grid2
        container
        sx={{
          justifyContent: "center",
          background: secondary,
          borderRadius: 2,
          alignItems: "center",
          my: 1,
        }}
      >
        <IconButton>
          <CalendarMonthIcon />
        </IconButton>
      </Grid2>
      <Grid2
        container
        sx={{
          justifyContent: "center",
          background: secondary,
          borderRadius: 2,
          alignItems: "center",
          my: 1,
        }}
      >
        <IconButton>
          <FilterAltIcon />
        </IconButton>
      </Grid2>
    </>
  );
}
