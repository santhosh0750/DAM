import useThemeColor from "@/hooks/useThemeColor";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useMediaQuery } from "@mui/system";
import React from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Image from "next/image";
import DeleteGif from "../../public/assets/Common/Deletegif.gif";

export default function DeleteDialog({ DeleteOpen, setDeleteOpen, detail }) {
  //   console.log("detail", detail.function);
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setDeleteOpen(false);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={DeleteOpen}
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
      <DialogTitle sx={{ px: 2, py: 0.3 }}>
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
            color={primary}
            sx={{ fontSize: 16, fontWeight: 600, fontSmooth: 1 }}
          >
            {" "}
            Delete
          </Typography>
          <IconButton onClick={handleClose}>
            <CancelRoundedIcon sx={{ color: primary }} />
          </IconButton>
        </Grid2>
      </DialogTitle>
      <DialogContent sx={{ py: 2, px: 2 }}>
        <Grid2 container sx={{justifyContent:"center"}}>
          <Grid2 size={12} sx={{justifyContent:"center",display:'flex'}} >
        <Image
                        src={DeleteGif}
                        width={150}
                        height={150}
                        alt="Main Image"
                        priority
                      />
                      </Grid2>
        <Typography component="div">
          Do You want To Delete{" "}
          <span style={{ color: primary, fontWeight: 500 }}>{detail?.key ?? '-'} </span>{" "}
          ?
        </Typography>
        </Grid2>
      </DialogContent>
      <DialogActions
        sx={{
          p: 0.5,
          m: 0,
          px: 1,
        }}
      >
        <Grid2 container spacing={1}>
          <Button
            size="small"
            sx={{
              background: "red",
              ":hover": { background: "red" },
            }}
            onClick={() => setDeleteOpen(false)}
          >
            Cancel
          </Button>
          <Button
            size="small"
            onClick={() => {
              setDeleteOpen(false);
              detail.function();
            }}
          >
            Delete
          </Button>
        </Grid2>
      </DialogActions>
    </Dialog>
  );
}
