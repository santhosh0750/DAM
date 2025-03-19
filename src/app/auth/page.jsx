"use client";
import {
  Box,
  Button,
  Grid2,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useThemeColor from "../../hooks/useThemeColor";
import Emailandpassword from "./components/Emailandpassword";
import LoginOtp from "./components/LoginOtp";

function page() {
  const { primary, secondary, text, textsecondary } = useThemeColor();

  //usestate
  const [Screen, setScreen] = useState(false);
  const [visiable, setvisiable] = useState(false);

  useEffect(() => {
    if (Screen) {
      setvisiable(true);
    }
  }, [Screen]);
  return (
    <Grid2
      container
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        mt: 3,
      }}
    >
      <Image
        src={"/Dammainicon.svg"}
        width={100}
        height={100}
        alt="Main Image"
        style={{ marginTop: "10px" }}
        priority
      />
      <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" color={primary}>
          Digital Assets Management
        </Typography>
      </Grid2>
      <Grid2 size={{ md: 3.8, xs: 12 }} sx={{ mt: 2 }}>
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
            <Slide in={visiable} direction="left" timeout={500}>
              <div style={{ width: "100%" }}>
                <LoginOtp Screen={Screen} setScreen={setScreen} />
              </div>
            </Slide>
          )}
        </Box>
      </Grid2>
    </Grid2>
  );
}

export default page;
