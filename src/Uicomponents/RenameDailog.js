import useThemeColor from '@/hooks/useThemeColor';
import { useTheme } from '@emotion/react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, IconButton, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react'
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";


export default function RenameDailog({RenameOpen,setRenameOpen}) {
    const { primary, secondary, text, textsecondary, optional } = useThemeColor();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setRenameOpen(false);
  };

  const [RenameField,setRenameField] =useState("")
  return (
    <Dialog
      fullScreen={fullScreen}
      open={RenameOpen}
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
            Rename
          </Typography>
          <IconButton onClick={handleClose}>
            <CancelRoundedIcon sx={{ color: primary }} />
          </IconButton>
        </Grid2>
      </DialogTitle>
      <DialogContent sx={{ py: 2, px: 2 }}>
       <TextField size='small' label="Rename" fullWidth valuw={RenameField} onChange={(e)=>setRenameField(e.target.value)}sx={{mt:1}} />
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
            onClick={() => setRenameOpen(false)}
          >
            Cancel
          </Button>
          <Button
            size="small"
            onClick={() => {
              setRenameOpen(false);
              detail.function();
            }}
          >
            Delete
          </Button>
        </Grid2>
      </DialogActions>
    </Dialog>
  )
}
