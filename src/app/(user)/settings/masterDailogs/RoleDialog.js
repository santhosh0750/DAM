import useThemeColor from "@/hooks/useThemeColor";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid2,
  IconButton,
  Radio,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AddRole } from "@/Services/Master/MasterAddApi";
import { RoleEdit } from "@/Services/Master/MasterEditApi";
import { toast } from "react-toastify";

export default function RoleDialog({
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
  const [Permission, setPermissions] = useState({
    Create_Folder: false,
    Upload_Folder: false,
    Delete_Folder: false,
    Upload_File: false,
    Delete_File: false,
    Download_File: false,
    Team_File: false,
    File_Share_Team: false,
    File_Share_External: false,
    Settings: false,
  });
  const [Allcheck, SetAllcheck] = useState(false);
  const [RoleName, setRoleName] = useState("");
  const allselectfun = (value) => {
    console.log("value", value);
    let value1 = {
      Create_Folder: value,
      Upload_Folder: value,
      Delete_Folder: value,
      Upload_File: value,
      Delete_File: value,
      Download_File: value,
      Team_File: value,
      File_Share_Team: value,
      File_Share_External: value,
      Settings: value,
    };
    setPermissions((prev) => ({ ...prev, ...value1 }));
  };

  //api
  const AddRoleApi = async () => {
    if (RoleName.trim() == "") {
      toast.error("Please Fill The Role Name");
      return;
    }
    if (
      !Allcheck &&
      Object.keys(Permission).every((x) => Permission[x] == false)
    ) {
      toast.error("Please Select the Permission");
      return;
    }

    const { data } = await AddRole({
      role: RoleName,
      createFolder: Permission.Create_Folder,
      uploadFolder: Permission.Upload_Folder,
      deleteFolder: Permission.Delete_Folder,
      uploadFile: Permission.Upload_File,
      deleteFile: Permission.Delete_File,
      teamFile: Permission.Team_File,
      settings: Permission.Settings,
      fileShareTeam: Permission.File_Share_Team,
      fileShareExternal: Permission.File_Share_External,
      downloadFile: Permission.Download_File,
    });

    if (data.status == "success") {
      toast.success("Role Added Sucessfully");
      setAddopen(false);
      setRoleName("");
      setEditData("");
      setPermissions({
        Create_Folder: false,
        Upload_Folder: false,
        Delete_Folder: false,
        Upload_File: false,
        Delete_File: false,
        Download_File: false,
        Team_File: false,
        File_Share_Team: false,
        File_Share_External: false,
        Settings: false,
      });
    } else {
      toast.error(data.message);
    }
  };
  const EditRoleApi = async () => {
    if (RoleName == "") {
      toast.error("Please Fill The Role Name");
      return;
    }
    if (
      !Allcheck &&
      Object.keys(Permission).every((x) => Permission[x] == false)
    ) {
      toast.error("Please Select the Permission");
      return;
    }
    const { data } = await RoleEdit({
      role: RoleName,
      id: EditData._id,
      createFolder: Permission.Create_Folder,
      uploadFolder: Permission.Upload_Folder,
      deleteFolder: Permission.Delete_Folder,
      uploadFile: Permission.Upload_File,
      deleteFile: Permission.Delete_File,
      teamFile: Permission.Team_File,
      settings: Permission.Settings,
      fileShareTeam: Permission.File_Share_Team,
      fileShareExternal: Permission.File_Share_External,
      downloadFile: Permission.Download_File,
    });
    console.log("data");
    if (data.status == "success") {
      toast.success("Role Updated Sucessfully");
      setAddopen(false);
      setRoleName("");
      setEditData("");
      setPermissions({
        Create_Folder: false,
        Upload_Folder: false,
        Delete_Folder: false,
        Upload_File: false,
        Delete_File: false,
        Download_File: false,
        Team_File: false,
        File_Share_Team: false,
        File_Share_External: false,
        Settings: false,
      });
    } else {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    if (EditData) {
      setRoleName(EditData.name);
      SetAllcheck(
        Object.keys(EditData.permissions).every(
          (x) => EditData.permissions[x] == true
        )
      );
      let value = {
        Create_Folder: EditData.permissions.createFolder,
        Upload_Folder: EditData.permissions.uploadFolder,
        Delete_Folder: EditData.permissions.deleteFolder,
        Upload_File: EditData.permissions.uploadFile,
        Delete_File: EditData.permissions.deleteFile,
        Download_File: EditData.permissions.downloadFile,
        Team_File: EditData.permissions.teamFile,
        File_Share_Team: EditData.permissions.fileShareTeam,
        File_Share_External: EditData.permissions.fileShareExternal,
        Settings: EditData.permissions.settings,
      };
      setPermissions(value);
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
            {EditData == "" ? "Add" : "Edit"} Role
          </Typography>
          <IconButton onClick={handleClose}>
            <CancelRoundedIcon sx={{ color: primary }} />
          </IconButton>
        </Grid2>
      </DialogTitle>
      <DialogContent sx={{ py: 1, px: 2 }}>
        <TextField
          variant="outlined"
          label="Role Name"
          fullWidth
          sx={{ mt: 1 }}
          size="small"
          value={RoleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <Grid2 container size={12} sx={{ px: 0.5, mt: 0.5 }}>
          <Accordion
            elevation={0}
            sx={{
              minHeight: "5px",
              "&.MuiPaper-root": { padding: "0px", margin: "0px" },
            }}
          >
            <AccordionSummary
              sx={{ p: 0 }}
              expandIcon={<ExpandMoreIcon sx={{ color: primary }} />}
            >
              <Grid2
                size={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: primary,
                  }}
                >
                  Permissions
                </Typography>
                <FormControlLabel
                  control={
                    <Tooltip title="All Permissions">
                      <Checkbox
                        value={Allcheck}
                        checked={Allcheck}
                        onChange={(e) => {
                          SetAllcheck(e.target.checked);
                          allselectfun(e.target.checked);
                        }}
                        size="medium"
                      />
                    </Tooltip>
                  }
                />
              </Grid2>
            </AccordionSummary>
            <AccordionDetails>
              <Grid2
                container
                spacing={0.5}
                size={12}
                sx={{ px: 1 }}
                key={Permission}
              >
                {Object.keys(Permission).map((x) => {
                  return (
                    <Grid2 key={x} size={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Permission[x]}
                            onChange={() => {
                              setPermissions((prev) => ({
                                ...prev,
                                [x]: !prev[x],
                              }));
                              SetAllcheck(false);
                            }}
                            sx={{
                              color: { primary },
                              "&.Mui-checked": {
                                color: { secondary },
                              },
                            }}
                          />
                        }
                        label={x.replace("_", " ")}
                      />
                    </Grid2>
                  );
                })}
              </Grid2>
            </AccordionDetails>
          </Accordion>
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
            onClick={() => (EditData == "" ? AddRoleApi() : EditRoleApi())}
          >
            {EditData == "" ? "Add" : "Edit"} Role
          </Button>
        </Grid2>
      </DialogActions>
    </Dialog>
  );
}
