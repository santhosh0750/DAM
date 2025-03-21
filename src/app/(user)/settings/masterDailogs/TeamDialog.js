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
import { AddTeam } from "@/Services/Master/MasterAddApi";
import { TeamEdit } from "@/Services/Master/MasterEditApi";
import { toast } from "react-toastify";

export default function Teamdailog({
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

  //usestates
  const [TeamName, setTeamName] = useState("");

  //api
  const AddTeamApi = async () => {
    if (TeamName == "") {
      toast.error("Please Fill The Team Name");
      return;
    }
    const { data } = await AddTeam({
      team: TeamName,
    });
    console.log("data");
    if (data.status == "success") {
      toast.success("Team Added Sucessfully");
      setAddopen(false);
      setTeamName("");
      setEditData("");
    } else {
      toast.error(data.message);
    }
  };
  const EditTeamApi = async () => {
    if (TeamName == "") {
      toast.error("Please Fill The Team Name");
      return;
    }
    const { data } = await TeamEdit({
      team: TeamName,
      id: EditData._id,
    });
    console.log("data");
    if (data.status == "success") {
      toast.success("Team Updated Sucessfully");
      setAddopen(false);
      setTeamName("");
      setEditData("");
    } else {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    if (EditData) {
      setTeamName(EditData.name);
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
          <Typography color={primary} sx={{ fontSize: 16, fontWeight: 600 }}>
            {" "}
            {EditData == "" ? "Add" : "Edit"} Team
          </Typography>
          <IconButton onClick={handleClose}>
            <CancelRoundedIcon sx={{ color: primary }} />
          </IconButton>
        </Grid2>
      </DialogTitle>
      <DialogContent sx={{ py: 2, px: 2 }}>
        <TextField
          variant="outlined"
          label="Team Name"
          fullWidth
          autoFocus
          sx={{ mt: 1 }}
          size="small"
          value={TeamName}
          onChange={(e) => setTeamName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              EditData == "" ? AddTeamApi() : EditTeamApi();
            }
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          py: 0.5,
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
            onClick={() => (EditData == "" ? AddTeamApi() : EditTeamApi())}
          >
            {EditData == "" ? "Add" : "Edit"} Team
          </Button>
        </Grid2>
      </DialogActions>
    </Dialog>
  );
}
