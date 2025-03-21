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
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import useThemeColor from "@/hooks/useThemeColor";
import {
  RolelistAPI,
  TeamlistAPI,
  UsergrouplistAPI,
} from "@/Services/Master/MasterlistApi";
import { dynamicSort, validateEmail } from "@/utlis/CommonFunctions";
import { AddUser } from "@/Services/Master/MasterAddApi";
import { toast } from "react-toastify";
import { UserEdit } from "@/Services/Master/MasterEditApi";

export default function UserAdd({
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

  const [profilepic, setProfilepic] = useState("");
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [TeamList, setTeamList] = useState([]);
  const [Team, setTeam] = useState(null);
  const [RoleList, setRoleList] = useState([]);
  const [Role, setRole] = useState(null);
  const [UserGroupList, setUserGroupList] = useState([]);
  const [UserGroup, setUserGroup] = useState([]);

  //closefun

  const closefun = () => {
    setUserName("");
    setEmail("");
    setMobileNumber("");
    setTeam(null);
    setRole(null);
    setUserGroup([]);
    setEditData("");
  };
  //apiss
  const UserGrouplistapi = async () => {
    const { data } = await UsergrouplistAPI();
    if (data.status == "success") {
      setUserGroupList(
        data.message.length ? dynamicSort("groupName", data.message) : []
      );
      if (EditData) {
        setUserGroup(EditData.userGroup ?? []);
      }
    } else {
      setUserGroupList([]);
    }
  };
  const Roleget = async () => {
    try {
      const { data } = await RolelistAPI();
      if (data.status == "success") {
        setRoleList(
          data.message.length ? dynamicSort("name", data.message) : []
        );
        if (EditData) {
          setRole(EditData.role);
        }
      } else {
        setRoleList([]);
      }
    } catch (error) {
      console.error("Roleget", error);
    }
  };
  const Teamget = async () => {
    try {
      const { data } = await TeamlistAPI();
      if (data.status == "success") {
        setTeamList(
          data.message.length ? dynamicSort("name", data.message) : []
        );
        if (EditData) {
          setTeam(EditData.team);
        }
      } else {
        setTeamList([]);
      }
    } catch (error) {
      console.error("teamget", error);
    }
  };
  const Useraddapi = async () => {
    const validations = [
      { condition: !UserName.trim(), message: "Please fill the user name" },
      {
        condition: !Email.trim() || !validateEmail(Email.trim()),
        message: "Please check the Email ID",
      },
      {
        condition: MobileNumber.trim().length !== 10,
        message: "Please check the mobile number",
      },
      {
        condition: Team == null,
        message: "Please select a team",
      },
      {
        condition: Role == null,
        message: "Please select a role",
      },
    ];
    const invalid = validations.find(({ condition }) => condition);
    if (invalid) {
      toast.error(invalid.message);
      return;
    }

    const { data } = await AddUser({
      username: UserName,
      email: Email,
      mobile: MobileNumber,
      role: Role._id,
      team: Team._id,
      userGroup: UserGroup.map((_id) => _id),
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
  const Usereditapi = async () => {
    const validations = [
      { condition: !UserName.trim(), message: "Please fill the user name" },
      {
        condition: !Email.trim() || !validateEmail(Email.trim()),
        message: "Please check the Email ID",
      },
      {
        condition: MobileNumber.trim().length !== 10,
        message: "Please check the mobile number",
      },
      {
        condition: Team == null,
        message: "Please select a team",
      },
      {
        condition: Role == null,
        message: "Please select a role",
      },
    ];
    const invalid = validations.find(({ condition }) => condition);
    if (invalid) {
      toast.error(invalid.message);
      return;
    }
    const { data } = await UserEdit({
      id: EditData._id,
      username: UserName,
      email: Email,
      mobile: MobileNumber,
      role: Role._id,
      team: Team._id,
      userGroup: UserGroup.map((_id) => _id),
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
  console.log("mobilenumber", typeof MobileNumber);
  useEffect(() => {
    UserGrouplistapi();
    Roleget();
    Teamget();
    if (EditData) {
      setUserName(EditData.name);
      setEmail(EditData.email);
      setMobileNumber(EditData.mobile.toString());
    }
  }, []);
  return (
    <Dialog
      fullScreen={fullScreen}
      open={Addopen}
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
            {EditData ? "Edit" : "Add"} User
          </Typography>
          <IconButton onClick={handleClose}>
            <CancelRoundedIcon sx={{ color: primary }} />
          </IconButton>
        </Grid2>
      </DialogTitle>
      <DialogContent sx={{ py: 0 }}>
        <Grid2 container size={12}>
          <Grid2
            size={{ md: 3, xs: 12 }}
            sx={{ p: 2, display: "flex", flexDirection: "column" }}
          >
            <Grid2
              container
              style={{
                width: "100%",
                border: "1px solid #e8eaee",
                display: "flex",
                justifyContent: "center",
                height: "30vh",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                sx={{ width: "90%", height: "20vh", m: 1 }}
                variant="square"
              >
                DAM
              </Avatar>{" "}
              <Grid2
                size={12}
                sx={{ display: "flex", justifyContent: "center", p: 0.5 }}
              >
                <Button size="small" sx={{ px: 1, py: 0.5 }} fullWidth>
                  Add Photo
                </Button>
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2 size={{ md: 9, xs: 12 }} sx={{ mt: 2 }}>
            <Grid2
              container
              size={12}
              flexDirection={"row"}
              sx={{ alignItems: "center" }}
            >
              <Grid2 size={{ md: 5.5, xs: 12 }} sx={{ mx: 1, mt: 2 }}>
                <TextField
                  label="Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Grid2>
              <Grid2 size={{ md: 5.5, xs: 12 }} sx={{ mx: 1, mt: 2 }}>
                <TextField
                  label="Email"
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid2>
              <Grid2 size={{ md: 5.5, xs: 12 }} sx={{ mx: 1, mt: 2 }}>
                <TextField
                  label="Mobile no"
                  variant="outlined"
                  size="small"
                  fullWidth
                  slotProps={{
                    input: {
                      inputProps: {
                        maxLength: 10,
                      },
                    },
                  }}
                  value={MobileNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setMobileNumber(value);
                  }}
                />
              </Grid2>
              <Grid2 size={{ md: 5.5, xs: 12 }} sx={{ mx: 1, mt: 2 }}>
                <Autocomplete
                  disablePortal
                  fullWidth
                  disableClearable
                  options={TeamList}
                  getOptionLabel={(x) => x.name}
                  getOptionKey={(x) => x._id}
                  value={Team}
                  onChange={(event, newvalue) => setTeam(newvalue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Team" size="small" />
                  )}
                />
              </Grid2>
              <Grid2 size={{ md: 5.5, xs: 12 }} sx={{ mx: 1, mt: 2 }}>
                <Autocomplete
                  disablePortal
                  fullWidth
                  options={RoleList}
                  disableClearable
                  getOptionLabel={(options) => options.name}
                  getOptionKey={(options) => options._id}
                  value={Role}
                  onChange={(event, newValue) => setRole(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Role" size="small" />
                  )}
                />
              </Grid2>
              <Grid2 size={{ md: 5.5, xs: 12 }} sx={{ mx: 1, mt: 2 }}>
                <Autocomplete
                  disablePortal
                  fullWidth
                  multiple
                  disableCloseOnSelect
                  options={UserGroupList}
                  getOptionLabel={(options) => options.groupName}
                  getOptionKey={(options) => options._id}
                  value={UserGroup}
                  onChange={(event, newValue) => setUserGroup(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select UserGroup"
                      size="small"
                    />
                  )}
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
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
            onClick={() => (EditData ? Usereditapi() : Useraddapi())}
          >
            {EditData ? "Edit" : "Add"} User
          </Button>
        </Grid2>
      </DialogActions>
    </Dialog>
  );
}
