import {
  Button,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useThemeColor from "../../../hooks/useThemeColor";
import { toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Loginapi } from "../../../Services/loginapis";
import { validateEmail } from "../../../utlis/CommonFunctions";
import { useSelector } from "react-redux";

export default function Emailandpassword({ Screen, setScreen }) {
  const { primary, secondary, text, textsecondary } = useThemeColor();

  //usestates
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordShow, SetPasswordShow] = useState(false);

  const userInfo = useSelector((state) => state.user);

  //apiss
  const credentialcheck = async () => {
    let checkemail = validateEmail(Email.trim());
    if (Password.trim() === "" || Email.trim === "") {
      toast.error("Kindly Fill The Required Fields");
      return;
    }
    if (!checkemail) {
      toast.error("Kindly Check the Email Address");
      return;
    }
    try {
      const { data } = await Loginapi({
        email: Email.trim(),
        password: Password.trim(),
      });
      if (data.status === "success") {
        localStorage.setItem("verfiy", JSON.stringify(data));
        toast.success(data.message);
        setScreen(!Screen);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("LoginAPI", error);
    }
  };

  useEffect(() => {
    // dataapi();
  }, []);
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
        value={Email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        fullWidth
        size={"medium"}
        label="Password"
        variant="outlined"
        sx={{ mt: 2, background: "#e8f0fe" }}
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        type={PasswordShow ? "text" : "password"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            credentialcheck();
          }
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => SetPasswordShow(!PasswordShow)}>
                  {PasswordShow ? (
                    <VisibilityOff sx={{ color: primary }} />
                  ) : (
                    <Visibility sx={{ color: primary }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Grid2
        size={12}
        sx={{
          display: "flex",
          justifyContent: "end",
          mt: 2,
        }}
      >
        <Typography
          variant="body1"
          color={textsecondary}
          sx={{
            fontWeight: 400,
            "&:hover": { color: primary },
            cursor: "pointer",
          }}
        >
          Forget Password?
        </Typography>
      </Grid2>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => credentialcheck()}
      >
        Sign In
      </Button>
      <Grid2 sx={{ mt: 3 }}>
        <Typography variant="body2">
          ////////////////////////////////////////////////
        </Typography>
      </Grid2>
    </Grid2>
  );
}
