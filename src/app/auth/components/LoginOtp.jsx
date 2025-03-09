import { Button, colors, Grid2, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useThemeColor from "../../../hooks/useThemeColor";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useRouter } from "next/navigation";

export default function LoginOtp({ Screen, setScreen }) {
  const { primary, secondary, text, textsecondary } = useThemeColor();
  const router = useRouter();

  //usestate
  const [otp, setotp] = useState("");
  const [count, setCount] = useState(30);
  const [timer, setTimer] = useState(null);

  //function
  const otpcall = (value) => {
    router.push("user");
  };
  const resendotpfun = () => {
    console.log("hii");
    setCount(30);
  };
  useEffect(() => {
    if (count === 0) return;
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);
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
        Almost There!
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
          Please enter OTP sent on
        </Typography>
      </Grid2>

      <Grid2
        container
        size={12}
        sx={{
          display: "flex",
          justifyContent: "end",
          mt: 1,
        }}
      >
        <MuiOtpInput
          autoFocus
          length={6}
          value={otp}
          onComplete={otpcall}
          TextFieldsProps={{
            size: "medium",
            color: primary,
          }}
          onChange={(e) => setotp(e)}
          sx={{
            my: 5,
            color: primary,
            "& .MuiOtpInput-TextField": {
              background: secondary,
              borderRadius: 2,
              color: primary,
            },
            "& .MuiInputBase-input": {
              color: primary,
              fontWeight: 700,
            },
          }}
        />
        <Grid2 size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Typography
            variant="body1"
            color={textsecondary}
            sx={{ "&:hover": { color: primary } }}
            onClick={() => count == 0 && resendotpfun()}
          >
            Resend{" "}
            {count ? (
              <span>
                in <span style={{ color: "red" }}>{count} </span>
                Seconds
              </span>
            ) : (
              "OTP"
            )}
          </Typography>
        </Grid2>
      </Grid2>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 1 }}
        onClick={() => otpcall()}
      >
        Confirm
      </Button>
      <Grid2 sx={{ mt: 2 }}>
        <Typography variant="body2">
          ////////////////////////////////////////////////
        </Typography>
      </Grid2>
    </Grid2>
  );
}
