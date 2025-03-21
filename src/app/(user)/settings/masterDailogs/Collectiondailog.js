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
import React, { useEffect, useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { AddProject } from "@/Services/Master/MasterAddApi";
import { ProjectEdit } from "@/Services/Master/MasterEditApi";
import { toast } from "react-toastify";

export default function Collectiondailog({
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
    setEditData("");
  };

  const [ProjectName, setProjectName] = useState("");

  //api
  const AddProjectApi = async () => {
    if (ProjectName == "") {
      toast.error("Please Fill The Project Name");
      return;
    }
    const { data } = await AddProject({
      projectName: ProjectName,
    });
    console.log("data");
    if (data.status == "success") {
      toast.success("Project Added Sucessfully");
      setAddopen(false);
      setProjectName("");
      setEditData("");
    } else {
      toast.error(data.message);
    }
  };
  const EditProjectApi = async () => {
    if (ProjectName == "") {
      toast.error("Please Fill The Project Name");
      return;
    }
    const { data } = await ProjectEdit({
      projectName: ProjectName,
      id: EditData._id,
    });
    console.log("data");
    if (data.status == "success") {
      toast.success("Project Updated Sucessfully");
      setAddopen(false);
      setProjectName("");
      setEditData("");
    } else {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    if (EditData) {
      setProjectName(EditData.projectName);
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
            {EditData == "" ? "Add" : "Edit"} Project
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
          value={ProjectName}
          onChange={(e) => setProjectName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              EditData == "" ? AddProjectApi() : EditProjectApi();
            }
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
              EditData == "" ? AddProjectApi() : EditProjectApi()
            }
          >
            {EditData == "" ? "Add" : "Edit"} Project
          </Button>
        </Grid2>
      </DialogActions>
    </Dialog>
  );
}
