import useThemeColor from "@/hooks/useThemeColor";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid2,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import uploadimage from "../../public/assets/Common/Fileuploadclick.svg";

export default function Fileupload({ UploadOpen, setUploadOpen }) {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setUploadOpen(false);
  };
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={UploadOpen}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="md"
        keepMounted
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
            },
          },
        }}
      >
        <DialogContent>
          <Grid2
            container
            sx={{
              border: `1px dashed ${primary} `,
              borderColor: primary,
              borderRadius: 2,
              justifyContent: "center",
              p: 1,
              height: "40Vh",
            }}
          >
            <Grid2
              container
              size={12}
              sx={{
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <img
                src="/assets/Common/Fileuploadclick.svg"
                alt="Upload"
                loading="lazy"
              />
            </Grid2>
            Drag files here or click to upload your assets, your way
          </Grid2>
          <Grid2 container sx={{ mt: 2 }} spacing={1}>
            <Grid2 size={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Document Title"
                size="small"
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Document Tags"
                size="small"
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Expires At"
                size="small"
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Grid2 container spacing={1} sx={{ pr: 2 }}>
            <Button
              variant="outlined"
              sx={{
                background: "red",
                borderColor: "red",
                ":hover": { background: "red" },
              }}
              size="small"
              onClick={() => setUploadOpen(false)}
            >
              {" "}
              Cancel
            </Button>
            <Button variant="outlined" size="small">
              {" "}
              Upload
            </Button>
          </Grid2>
        </DialogActions>
      </Dialog>
    </>
  );
}
