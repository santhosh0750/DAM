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
import React, { useEffect, useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import useThemeColor from "@/hooks/useThemeColor";
import { UserlistAPI } from "@/Services/Commonapi";
import { toast } from "react-toastify";
import { UsergroupEdit } from "@/Services/Master/MasterEditApi";
import { AddUserGroup } from "@/Services/Master/MasterAddApi";

export default function Usergroupdialog({
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
  };

  const CustomPopper = (props) => <Popper {...props} placement="top-start" />;

  const [UserGroupName, setUserGroupName] = useState("");
  const [UserList, setUserList] = useState([]);
  const [Users, setUsers] = useState([]);
  const closefun = () => {
    setUsers([]);
    setUserList([]);
    setUserGroupName("");
  };
  //API
  const Userlistgetapi = async () => {
    const { data } = await UserlistAPI();
    if (data.status == "success") {
      setUserList(data.message);
    } else {
      setUserList([]);
    }
  };
  const UserGroupAddapi = async () => {
    if (UserGroupName.trim() == "") {
      toast.error("Please fill the group name");
      return;
    }
    if (Users.length == 0) {
      toast.error("Please select the users ");
      return;
    }
    const { data } = await AddUserGroup({
      groupName: UserGroupName.trim(),
      users: Users.map(({ _id }) => _id),
    });
    if (data.status == "success") {
      toast.success(data.message);
      setAddopen(false);
      closefun();
    } else {
      toast.error(data.message);
    }
  };
  const UserGroupEditapi = async () => {
    if (UserGroupName.trim == "") {
      toast.error("Please fill the group name");
      return;
    }
    if (Users.length === 0) {
      toast.error("Please select the users ");
      return;
    }
    const { data } = await UsergroupEdit({
      id: EditData._id,
      groupName: UserGroupName.trim(),
      users: Users.map(({ _id }) => _id),
    });
    if (data.status == "success") {
      toast.success(data.message);
      setAddopen(false);
      closefun();
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    Userlistgetapi();
    if (EditData) {
      setUserGroupName(EditData.groupName);
      setUsers(EditData.users);
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
          <Typography
            color={primary}
            sx={{ fontSize: 16, fontWeight: 600, fontSmooth: 1 }}
          >
            {" "}
            {EditData == "" ? "Add" : "Edit"} Group
          </Typography>
          <IconButton onClick={handleClose}>
            <CancelRoundedIcon sx={{ color: primary }} />
          </IconButton>
        </Grid2>
      </DialogTitle>
      <DialogContent sx={{ py: 1, px: 1.5 }}>
        <TextField
          variant="outlined"
          label="Group Name"
          fullWidth
          size="small"
          sx={{ mt: 0.8 }}
          value={UserGroupName}
          onChange={(e) => setUserGroupName(e.target.value)}
        />
        <Autocomplete
          disablePortal
          disableCloseOnSelect
          fullWidth
          sx={{
            mt: 1.5,
            maxHeight: "20%",
          }}
          multiple
          options={UserList}
          getOptionLabel={(options) => options.name}
          value={Users}
          onChange={(event, newValue) => setUsers(newValue)}
          slots={{
            popper: CustomPopper,
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select User" size="small" />
          )}
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
              EditData == "" ? UserGroupAddapi() : UserGroupEditapi()
            }
          >
            {EditData == "" ? "Add" : "Edit"} User
          </Button>
        </Grid2>
      </DialogActions>
    </Dialog>
  );
}
