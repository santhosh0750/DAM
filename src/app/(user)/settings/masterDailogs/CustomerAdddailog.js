import useThemeColor from "@/hooks/useThemeColor";
import { useTheme } from "@emotion/react";
import {
  Autocomplete,
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
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { validateEmail } from "@/utlis/CommonFunctions";
import { AddCustomer } from "@/Services/Master/MasterAddApi";

export default function CustomerAdddailog({
  Addopen,
  setAddopen,
  EditData,
  setEditData,
}) {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setAddopen(false);
    closefun();
  };

  //usestates
  const [CustomerName, setCustomerName] = useState("");
  const [CustomerEmail, setCustomerEmail] = useState("");
  const [CustomerMobile, setCustomerMobile] = useState("");
  const [CustomerAddress, setCustomerAddress] = useState("");

  const closefun = () => {
    setCustomerName("");
    setCustomerEmail("");
    setCustomerMobile("");
    setCustomerAddress("");
    setEditData("");
  };
  const Customeraddapi = async () => {
    const validations = [
      {
        condition: !CustomerName.trim(),
        message: "Please fill the Customer Name",
      },
      {
        condition: !CustomerEmail.trim() || !validateEmail(Email.trim()),
        message: "Please check the customeremail ID",
      },
      {
        condition: CustomerMobile.trim().length !== 10,
        message: "Please check the customer mobile number",
      },
    ];
    const invalid = validations.find(({ condition }) => condition);
    if (invalid) {
      toast.error(invalid.message);
      return;
    }

    const { data } = await AddCustomer({
      name: CustomerName,
      email: CustomerEmail,
      mobile: CustomerMobile,
      address: CustomerAddress,
    });
    if (data.status === "success") {
      toast.success(data.message);
      setAddopen(false);
      setEditData("");
      closefun();
    } else {
      toast.error(data.message);
    }
  };
  const Customereditapi = async () => {
    const validations = [
      {
        condition: !CustomerName.trim(),
        message: "Please fill the Customer Name",
      },
      {
        condition: !CustomerEmail.trim() || !validateEmail(Email.trim()),
        message: "Please check the customeremail ID",
      },
      {
        condition: CustomerMobile.trim().length !== 10,
        message: "Please check the customer mobile number",
      },
    ];
    const invalid = validations.find(({ condition }) => condition);
    if (invalid) {
      toast.error(invalid.message);
      return;
    }
    const { data } = await UserEdit({
      id: EditData._id,
      name: CustomerName,
      email: CustomerEmail,
      mobile: CustomerMobile,
      address: CustomerAddress,
    });
    if (data.status == "success") {
      toast.success(data.message);
      setAddopen(false);
      setEditData("");
      closefun();
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (EditData) {
      setCustomerName(EditData.name);
      setCustomerEmail(EditData.email);
      setCustomerMobile(EditData.mobile);
      setCustomerAddress(EditData.address);
    }
  }, []);
  return (
    <Dialog
      fullScreen={fullScreen}
      open={Addopen}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="sm"
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
          <Typography color={primary} sx={{ fontSize: 16, fontWeight: 600 }}>
            {" "}
            {EditData ? "Edit" : "Add"} Customer
          </Typography>
          <IconButton onClick={handleClose}>
            <CancelRoundedIcon sx={{ color: primary }} />
          </IconButton>
        </Grid2>
      </DialogTitle>
      <DialogContent sx={{ py: 0 }}>
        <Grid2 container spacing={1} sx={{ mt: 1 }}>
          <Grid2 size={6} sx={{ p: 0.5 }}>
            <TextField
              fullWidth
              label="Customer Name"
              size="small"
              value={CustomerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Grid2>
          <Grid2 size={6} sx={{ p: 0.5 }}>
            <TextField
              fullWidth
              label="Customer Email"
              size="small"
              value={CustomerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </Grid2>
          <Grid2 size={6} sx={{ p: 0.5 }}>
            <TextField
              fullWidth
              label="Customer Mobile Number"
              size="small"
              value={CustomerMobile}
              onChange={(e) => setCustomerMobile(e.target.value)}
            />
          </Grid2>
          <Grid2 size={6} sx={{ p: 0.5 }}>
            <TextField
              fullWidth
              label="Customer Address"
              size="small"
              value={CustomerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions
        sx={{
          p: 0.5,
          mt: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid2 container spacing={1}>
          <Button
            size="small"
            sx={{ px: 2, py: 1 }}
            onClick={() => (EditData ? Customereditapi() : Customeraddapi())}
          >
            {EditData ? "Edit" : "Add"} Customer
          </Button>
        </Grid2>
      </DialogActions>
    </Dialog>
  );
}
