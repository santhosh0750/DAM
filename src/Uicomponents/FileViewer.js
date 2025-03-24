import useThemeColor from "@/hooks/useThemeColor";
import { useTheme } from "@emotion/react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  Grid2,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import CancelIcon from "@mui/icons-material/Cancel";

export default function FileViewer({ FileviewOpen, setFileviewOpen, detail }) {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setFileviewOpen(false);
    detail.functionclose();
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={FileviewOpen}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="lg"
      keepMounted
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
          },
        },
      }}
    >
      <DialogContent sx={{ p: 1 }}>
        <Grid2 container spacing={1}>
          <Grid2
            size={{ md: 6, xs: 12 }}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Avatar sx={{ fontSize: 14 }}>Sm</Avatar>
            <Grid2 size={4} sx={{ pl: 1 }}>
              <Typography sx={{ fontSize: 14 }}>Pura Creative</Typography>
              <Typography variant="caption" sx={{ fontSize: 12 }}>
                Pura Creative
              </Typography>
            </Grid2>
          </Grid2>
          <Grid2
            size={{ md: 6, xs: 12 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <Button
              variant="outlined"
              size="small"
              sx={{ background: "#fff", color: primary }}
            >
              <FileDownloadOutlinedIcon />
              Download{" "}
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ background: "#fff", color: primary }}
            >
              <ModeEditOutlinedIcon />
              Edit{" "}
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ background: "#fff", color: primary }}
            >
              <ThumbUpOutlinedIcon />
              Like{" "}
            </Button>
            <IconButton size="small">
              <MoreVertOutlinedIcon />
            </IconButton>
            <IconButton size="small">
              <CancelIcon
                sx={{
                  color: primary,
                  background: secondary,
                  m: 0.5,
                  borderRadius: 2,
                }}
              />
            </IconButton>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={1} sx={{ mt: 1 }}>
          <Grid2
            size={{ xs: 12, md: 6 }}
            sx={{ borderRadius: 2, border: 1, borderColor: "#a5a5a5", p: 1 }}
          >
            <Grid2 container spacing={1}>
              <Grid2 size={2}>
                <Typography sx={{ fontSize: 14, color: textsecondary }}>
                  File name
                </Typography>
              </Grid2>
              <Grid2 size={10}>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: textsecondary,
                    textOverflow: "ellipsis",
                    textWrap: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  :
                </Typography>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </DialogContent>
    </Dialog>
  );
}
