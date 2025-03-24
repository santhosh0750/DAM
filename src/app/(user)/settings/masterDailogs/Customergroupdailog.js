"use client";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  IconButton,
  Popper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { use, useEffect, useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import useThemeColor from "@/hooks/useThemeColor";
import {
  CustomerlistAPI,
  UsergrouplistAPI,
} from "@/Services/Master/MasterlistApi";
import { UserlistAPI } from "@/Services/Commonapi";
import { AddCustomerGroup } from "@/Services/Master/MasterAddApi";
import { toast } from "react-toastify";
import { CustomerGroupEdit } from "@/Services/Master/MasterEditApi";

export default function Customergroupdailog({
  Addopen,
  setAddopen,
  EditData,
  setEditData,
}) {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const CustomPopper = (props) => <Popper {...props} placement="top-start" />;
  const closefun = () => {
    setCustomerGroupName("");
    setCustomerSelected([]);
    setUserGroupSelected([]);
    setUserSelected([]);
    setEditData("");
  };
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setAddopen(false);
    setEditData("");
    closefun();
  };

  const [CustomerGroupName, setCustomerGroupName] = useState("");
  const [CustomerList, setCustomerList] = useState([]);
  const [CustomerSelected, setCustomerSelected] = useState([]);
  const [UserGroupList, setUserGroupList] = useState([]);
  const [UserGroupSelected, setUserGroupSelected] = useState([]);
  const [UserList, setUserList] = useState([]);
  const [UserSelected, setUserSelected] = useState([]);
  const [UsertGroupfoucs, setUsertGroupfoucs] = useState(false);

  //apis
  const customerlistapi = async () => {
    const { data } = await CustomerlistAPI();
    if (data.status == "success") {
      setCustomerList(data.message);
      if (EditData) {
        setCustomerSelected(EditData.customerId);
      }
    } else {
      setCustomerList([]);
    }
  };
  const UserGroupapi = async () => {
    const { data } = await UsergrouplistAPI();
    if (data.status == "success") {
      setUserGroupList(data.message);
      if (EditData) {
        setUserGroupSelected(EditData.userGroup);
      }
    } else {
      setUserGroupList([]);
    }
  };
  const UserListapi = async () => {
    const { data } = await UserlistAPI();
    if (data.status == "success") {
      setUserList(data.message);
      if (EditData) {
        setUserSelected(EditData.userId);
      }
    } else {
      setUserList([]);
    }
  };

  const CustomerGroupaddapi = async () => {
    const validations = [
      {
        condition: !CustomerGroupName.trim(),
        message: "Please fill the Customer Group Name",
      },
      {
        condition: CustomerSelected.length == 0,
        message: "Please select the customers",
      },
      {
        condition: UserGroupSelected.length == 0,
        message: "Please select the User Group",
      },
    ];
    const invalid = validations.find(({ condition }) => condition);
    if (invalid) {
      toast.error(invalid.message);
      return;
    }
    const { data } = await AddCustomerGroup({
      groupName: CustomerGroupName,
      userGroup: UserGroupSelected.map((item) => item._id),
      customerId: CustomerSelected.map((item) => item._id),
      userId: UserSelected.map((item) => item._id),
    });
    if (data.status == "success") {
      toast.success("Customer Group added successfully");
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
        condition: !CustomerGroupName.trim(),
        message: "Please fill the Customer Group Name",
      },
      {
        condition: CustomerSelected.length == 0,
        message: "Please select the customers",
      },
      {
        condition: UserGroupSelected.length == 0,
        message: "Please select the User Group",
      },
    ];
    const invalid = validations.find(({ condition }) => condition);
    if (invalid) {
      toast.error(invalid.message);
      return;
    }
    const { data } = await CustomerGroupEdit({
      id: EditData._id,
      groupName: CustomerGroupName,
      userGroup: UserGroupSelected.map((item) => item._id),
      customerId: CustomerSelected.map((item) => item._id),
      userId: UserSelected.map((item) => item._id),
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
    customerlistapi();
    UserGroupapi();
    UserListapi();
    if (EditData) {
      setCustomerGroupName(EditData.groupName);
    }
  }, []);

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
          <Typography color={primary} sx={{ fontSize: 16, fontWeight: 600 }}>
            {" "}
            {EditData ? "Edit" : "Add"} Group
          </Typography>
          <IconButton onClick={handleClose}>
            <CancelRoundedIcon sx={{ color: primary }} />
          </IconButton>
        </Grid2>
      </DialogTitle>
      <DialogContent sx={{ py: 0, px: 1.5, mt: 1 }}>
        <TextField
          variant="outlined"
          label="Group Name"
          fullWidth
          size="small"
          sx={{ mt: 0.6 }}
          value={CustomerGroupName}
          onChange={(e) => setCustomerGroupName(e.target.value)}
        />
        <Autocomplete
          disablePortal
          fullWidth
          multiple
          sx={{
            mt: 1,
          }}
          options={CustomerList}
          getOptionLabel={(option) => option.name}
          getOptionKey={(option) => option._id}
          renderInput={(params) => (
            <TextField {...params} label="Select Customers" size="small" />
          )}
          value={CustomerSelected}
          onChange={(event, newValue) => {
            setCustomerSelected(newValue);
          }}
        />
        <Autocomplete
          disablePortal
          fullWidth
          multiple
          sx={{
            mt: 1,
          }}
          options={UserGroupList}
          getOptionLabel={(option) => option.groupName}
          getOptionKey={(option) => option._id}
          renderInput={(params) => (
            <TextField {...params} label="Select User Group" size="small" />
          )}
          value={UserGroupSelected}
          onChange={(event, newValue) => {
            setUserGroupSelected(newValue);
          }}
        />

        <Autocomplete
          disablePortal
          fullWidth
          multiple
          onFocus={() => setUsertGroupfoucs(true)}
          onBlur={() => setUsertGroupfoucs(false)}
          sx={{
            mt: 1,
          }}
          options={UserList}
          getOptionLabel={(option) => option.name}
          getOptionKey={(option) => option._id}
          slots={{
            popper: CustomPopper,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Users"
              size="small"
              helperText={
                UsertGroupfoucs
                  ? "If you want to add users apart from the UserGroup, add them here"
                  : ""
              }
            />
          )}
          value={UserSelected}
          onChange={(event, newValue) => {
            setUserSelected(newValue);
          }}
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
          <Button
            size="small"
            sx={{ px: 2, py: 1 }}
            onClick={() =>
              EditData ? Customereditapi() : CustomerGroupaddapi()
            }
          >
            {EditData ? "Edit" : "Add"} Group
          </Button>
        </Grid2>
      </DialogActions>
    </Dialog>
  );
}
