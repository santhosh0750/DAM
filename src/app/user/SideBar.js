"use client";
import useThemeColor from "@/hooks/useThemeColor";
import { Box, Grid2, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

export default function SideBar({ children }) {
  const { primary, secondary, text } = useThemeColor();
  const [Selected, setSelected] = useState("Dashboard");
  const sidebarlist = [
    {
      Activeicons: "./assets/Sidebar/Dashboardactive.svg",
      inactiveicon: "./assets/Sidebar/dashboardinactive.svg",
      name: "Dashboard",
      route: "",
    },
    {
      Activeicons: "./assets/Sidebar/Assetsactive.svg",
      inactiveicon: "./assets/Sidebar/Assetsinactive.svg",
      name: "Assets",
      route: "",
    },
    {
      Activeicons: "./assets/Sidebar/Collectionactive.svg",
      inactiveicon: "./assets/Sidebar/Collectioninactive.svg",
      name: "Collection",
      route: "",
    },
    {
      Activeicons: "./assets/Sidebar/Teamactive.svg",
      inactiveicon: "./assets/Sidebar/Teaminactive.svg",
      name: "Team",
      route: "",
    },
    {
      Activeicons: "./assets/Sidebar/NotificationActive.svg",
      inactiveicon: "./assets/Sidebar/Notificationinactive.svg",
      name: "Notification",
      route: "",
    },

    ,
  ];
  const activestyle = {
    display: "flex",
    alignItems: "center",
    p: 1,
    cursor: "pointer",
    background: secondary,
    m: 0.5,
    borderRadius: 2,
  };
  const inactivestyle = {
    display: "flex",
    alignItems: "center",
    p: 1,
    cursor: "pointer",
    m: 0.5,
    borderRadius: 2,
    "&:hover": { bgcolor: secondary },
  };

  const selectroute = (value) => {
    setSelected(value.name);
  };

  return (
    <Grid2 container spacing={0.5} sx={{ p: 1 }}>
      <Grid2 size={2}>
        <Box
          sx={{
            height: "97vh",
            background: "#fff",
            border: 1,
            borderColor: "#BBBBBB",
            borderRadius: 3,
            p: 0.5,
          }}
        >
          <Grid2 size={12} sx={{ height: "69vh" }}>
            <Grid2
              container
              gap={1}
              size={12}
              sx={{ display: "flex", alignItems: "center", px: 1 }}
            >
              <Image
                src={"./assets/Sidebar/mainicondashboard.svg"}
                width={30}
                height={30}
                alt="Main Image"
                priority
              />
              <Typography sx={{ color: text, fontWeight: 700 }} variant="h6">
                {" "}
                DAM
              </Typography>
            </Grid2>
            <Grid2 sx={{ mt: 2, overflowY: "auto" }}>
              <div style={{ position: "absolute", left: "15.4%", top: "50%" }}>
                <IconButton size="small">
                  <ArrowLeftIcon
                    sx={{
                      background: secondary,
                      borderRadius: 5,
                    }}
                  />
                </IconButton>
              </div>
              {sidebarlist.map((x) => {
                return (
                  <Grid2
                    key={x.name}
                    container
                    gap={1}
                    sx={Selected == x.name ? activestyle : inactivestyle}
                    onClick={() => selectroute(x)}
                  >
                    <Image
                      src={Selected == x.name ? x.Activeicons : x.inactiveicon}
                      width={Selected == x.name ? 25 : 24}
                      height={Selected == x.name ? 25 : 24}
                      alt={x.name}
                      priority
                    />
                    <Typography sx={{ color: text, font: 14 }}>
                      {x.name}{" "}
                      {x.name == "Notification" && (
                        <span
                          style={{
                            background:
                              Selected == x.name ? primary : secondary,
                            color: Selected == x.name ? secondary : primary,
                            borderRadius: "10px",
                            padding: "2px",
                            font: 10,
                          }}
                        >
                          12
                        </span>
                      )}
                    </Typography>
                  </Grid2>
                );
              })}
            </Grid2>
          </Grid2>
          <Grid2 sx={{ height: "25vh", background: "yellow" }}></Grid2>
        </Box>
      </Grid2>
      <Grid2 size={10}>{children}</Grid2>
    </Grid2>
  );
}
