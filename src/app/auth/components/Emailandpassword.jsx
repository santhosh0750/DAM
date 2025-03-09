import { Button, Grid2, TextField, Typography } from "@mui/material";
import React from "react";
import useThemeColor from "../../../hooks/useThemeColor";
import { toast } from "react-toastify";

export default function Emailandpassword({ Screen, setScreen }) {
  const { primary, secondary, text, textsecondary } = useThemeColor();
  const emailvalidapi = () => {
    setScreen(!Screen);
    toast.success("Otp Send Successfully");
  };
  return (
    <Grid2
      container
      size={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Grid2 size={12}> */}
      <Typography variant="h5" color={text} sx={{ fontWeight: 700 }}>
        Hello Again!
      </Typography>
      {/* </Grid2> */}
      <Grid2
        size={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography variant="body1" color={text} sx={{ fontWeight: 400 }}>
          Ready to Dive In
        </Typography>
      </Grid2>

      <TextField
        fullWidth
        size={"medium"}
        label="Email Address"
        variant="outlined"
        sx={{ mt: 2 }}
        type="email"
      />
      <TextField
        fullWidth
        size={"medium"}
        label="Password"
        variant="outlined"
        sx={{ mt: 1 }}
        type="email"
      />
      <Grid2
        size={12}
        sx={{
          display: "flex",
          justifyContent: "end",
          mt: 1,
        }}
      >
        <Typography
          variant="body1"
          color={textsecondary}
          sx={{ fontWeight: 400, "&:hover": { color: primary } }}
        >
          Forget Password?
        </Typography>
      </Grid2>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 1 }}
        onClick={() => emailvalidapi()}
      >
        Sign In
      </Button>
      <Grid2 sx={{ mt: 2 }}>
        <Typography variant="body2">
          ////////////////////////////////////////////////
        </Typography>
      </Grid2>
    </Grid2>
  );
}
