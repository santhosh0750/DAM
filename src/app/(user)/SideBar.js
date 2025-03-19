"use client";
import useThemeColor from "@/hooks/useThemeColor";
import {
  Avatar,
  Box,
  Grid2,
  IconButton,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

export default function SideBar({ children }) {
  const { primary, secondary, text } = useThemeColor();
  const router = useRouter();
  const [Selected, setSelected] = useState("Dashboard");
  const [Sidebar, SetSidebar] = useState(false);
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
      route: "assets",
    },
    {
      Activeicons: "./assets/Sidebar/Collectionactive.svg",
      inactiveicon: "./assets/Sidebar/Collectioninactive.svg",
      name: "Collection",
      route: "",
    },
    {
      Activeicons: "./assets/Sidebar/Myfilesactive.svg",
      inactiveicon: "./assets/Sidebar/Myfileinactive.svg",
      name: "My Files",
      route: "myfiles",
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
  const downlist = [
    {
      Activeicons: "./assets/Sidebar/Workflowactive.svg",
      inactiveicon: "./assets/Sidebar/Workflowinactive.svg",
      name: "Workflow",
      route: "",
    },

    {
      Activeicons: "./assets/Sidebar/SettingActive.svg",
      inactiveicon: "./assets/Sidebar/Settinginactive.svg",
      name: "Settings",
      route: "settings",
    },

    {
      Activeicons: "./assets/Sidebar/Helpactive.svg",
      inactiveicon: "./assets/Sidebar/Helpinactive.svg",
      name: "Help & Support",
      route: "",
    },
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
    if (value.route) {
      router.push(value.route);
    }
  };

  return (
    <Grid2 container spacing={0.5} sx={{ p: { md: 1, xs: 0 } }}>
      <Grid2
        size={Sidebar ? 0.5 : 2}
        sx={{ display: { xs: "none", sm: "none", md: "block" } }}
      >
        {!Sidebar ? (
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
            <Grid2 size={12} sx={{ height: "65vh" }}>
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
                <div
                  style={{ position: "absolute", left: "15.4%", top: "50%" }}
                >
                  <IconButton size="small" onClick={() => SetSidebar(!Sidebar)}>
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
                        src={
                          Selected == x.name ? x.Activeicons : x.inactiveicon
                        }
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
                              fontSize: Selected == x.name ? 13 : 11,
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
            <Grid2 sx={{ height: "30vh", overflow: "scroll" }}>
              <Grid2
                container
                gap={1}
                size={12}
                sx={{ display: "flex", alignItems: "center", px: 1 }}
              >
                <Grid2 size={2} sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar alt="Remy Sharp" src="" />
                </Grid2>
                <Grid2 size={9} sx={{ pl: 2 }}>
                  <Typography
                    sx={{ color: text, fontWeight: 600, fontSize: 14 }}
                    variant="body1"
                  >
                    {" "}
                    Santhosh
                  </Typography>
                  <span
                    style={{
                      background: primary,
                      padding: "1px 5px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  >
                    Admin
                  </span>
                </Grid2>
              </Grid2>
              {downlist.map((x) => {
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
                    </Typography>
                  </Grid2>
                );
              })}
            </Grid2>
          </Box>
        ) : (
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
            <Grid2 size={12} sx={{ height: "65vh" }}>
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
              </Grid2>
              <Grid2 sx={{ mt: 2 }}>
                <div style={{ position: "absolute", left: "3.1%", top: "50%" }}>
                  <IconButton size="small" onClick={() => SetSidebar(!Sidebar)}>
                    <ArrowLeftIcon
                      sx={{
                        background: secondary,
                        transform: "rotate(180deg)",
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
                      <Tooltip title={x.name} placement="right-start">
                        <Image
                          src={
                            Selected == x.name ? x.Activeicons : x.inactiveicon
                          }
                          width={Selected == x.name ? 25 : 24}
                          height={Selected == x.name ? 25 : 24}
                          alt={x.name}
                          priority
                        />
                      </Tooltip>
                    </Grid2>
                  );
                })}
              </Grid2>
            </Grid2>
            <Grid2 sx={{ height: "30vh" }}>
              <Grid2
                container
                gap={1}
                size={12}
                sx={{ display: "flex", alignItems: "center", px: 1 }}
              >
                <Grid2 sx={{ display: "flex", alignItems: "center", my: 1 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src=""
                    sx={{ width: 24, height: 24 }}
                  />
                </Grid2>
              </Grid2>
              {downlist.map((x) => {
                return (
                  <Grid2
                    key={x.name}
                    container
                    gap={1}
                    sx={Selected == x.name ? activestyle : inactivestyle}
                    onClick={() => selectroute(x)}
                  >
                    <Tooltip title={x.name} placement="right-start">
                      <Image
                        src={
                          Selected == x.name ? x.Activeicons : x.inactiveicon
                        }
                        width={Selected == x.name ? 25 : 24}
                        height={Selected == x.name ? 25 : 24}
                        alt={x.name}
                        priority
                      />
                    </Tooltip>
                  </Grid2>
                );
              })}
            </Grid2>
          </Box>
        )}
      </Grid2>
      <Grid2
        container
        size={12}
        sx={{ display: { xs: "block", sm: "block", md: "none" } }}
      >
        <Grid2
          size={12}
          sx={{
            bgcolor: secondary,
            p: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <MenuIcon color={primary} sx={{ color: primary }} />
          <Typography variant="h6" sx={{ pl: 1, color: "#232323" }}>
            DAM
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2 size={"grow"} sx={{ p: 1 }}>
        {children}
      </Grid2>
    </Grid2>
  );
}
