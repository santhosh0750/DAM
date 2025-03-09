"use client";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import useThemeColor from "../../hooks/useThemeColor";
import Emailandpassword from "./components/Emailandpassword";
import LoginOtp from "./components/LoginOtp";

function page() {
  const { primary, secondary, text, textsecondary } = useThemeColor();

  //usestate
  const [Screen, setScreen] = useState(false);

  return (
    <Grid2
      container
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src={"/Dammainicon.svg"}
        width={100}
        height={100}
        alt="Main Image"
        style={{ marginTop: "15px" }}
        priority
      />
      <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" color={primary}>
          Digital Assets Management
        </Typography>
      </Grid2>
      <Grid2 size={{ md: 3.8, xs: 12 }} sx={{ mt: 3 }}>
        <Box
          sx={{
            background: "#fff",
            borderRadius: 3,
            px: 4,
            py: 4,
            display: "flex",
            justifyContent: "center",
            mt: 1,
          }}
        >
          {!Screen ? (
            <Emailandpassword Screen={Screen} setScreen={setScreen} />
          ) : (
            <LoginOtp Screen={Screen} setScreen={setScreen} />
          )}
        </Box>
      </Grid2>
    </Grid2>
  );
}

export default page;
