import useThemeColor from "@/hooks/useThemeColor";
import { useTheme } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

export default function Collectiondailog({ Addopen, setAddopen }) {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setAddopen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={Addopen}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="xs"
      keepMounted
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
          },
        },
      }}
    >
      <DialogTitle sx={{ p: 1 }}>
        <Grid2
          container
          size={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: 1,
            borderBottomColor: primary,
          }}
        >
          <Typography
            variant="h6"
            color={primary}
            sx={{ fontSmooth: 1, fontWeight: 700 }}
          >
            {" "}
            Add Project
          </Typography>
          <IconButton onClick={handleClose}>
            <CancelRoundedIcon sx={{ color: primary }} />
          </IconButton>
        </Grid2>
      </DialogTitle>
      <DialogContent sx={{ py: 1, px: 1.5 }}>
        <TextField
          variant="outlined"
          label="Project Name"
          fullWidth
          sx={{ mt: 1 }}
          size="small"
        />
      </DialogContent>
      <DialogActions
        sx={{
          p: 0.5,
          m: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid2 container spacing={1}>
          <Button size="small" sx={{ px: 2, py: 1 }}>
            Add Project
          </Button>
        </Grid2>
      </DialogActions>
    </Dialog>
  );
}
