import useThemeColor from "@/hooks/useThemeColor";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import Teamdailog from "../masterDailogs/TeamDialog";
import { TeamlistAPI } from "../../../../Services/Master/MasterlistApi";
import { TeamDeleteAPI } from "../../../../Services/Master/MasterDeleteApi";
import DeleteDialog from "@/Uicomponents/DeleteDialog";
import { toast } from "react-toastify";

export default function Team() {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();
  const [Addopen, setAddopen] = useState(false);
  const [TeamList, setTeamList] = useState([]);
  const [EditData, setEditData] = useState("");
  const [DeleteOpen, setDeleteOpen] = useState(false);
  //apisss
  const Teamget = async () => {
    try {
      const { data } = await TeamlistAPI();
      if (data.status == "success") {
        setTeamList(data.message);
      } else {
        setTeamList([]);
      }
    } catch (error) {
      console.error("teamget", error);
    }
  };
  const Teamdeletefun = async () => {
    const { data } = await TeamDeleteAPI(EditData._id);
    if (data.status == "success") {
      toast.success("Team Removed Successfully");
      setDeleteOpen(false);
      setEditData("");
      Teamget();
    } else {
      toast.error(data.message);
      setDeleteOpen(false);
    }
  };
  const editfun = (value) => {
    setAddopen(true);
    setEditData(value);
  };

  useEffect(() => {
    Teamget();
  }, [Addopen]);
  return (
    <>
      <Grid2 size={{ md: 3, xs: 12 }}>
        <Grid2 container size={12}>
          <Box
            sx={{
              background: "#fff",
              width: "100%",
              borderRadius: 1.5,
              height: "40vh",
              boxShadow: 1,
            }}
          >
            <Grid2
              size={12}
              sx={{
                background: secondary,
                borderTopLeftRadius: 9.8,
                borderTopRightRadius: 9.8,
                px: 1,
                py: 0.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "6vh",
              }}
            >
              <Typography sx={{ color: primary, fontWeight: 600 }}>
                Team
              </Typography>
              <Button
                size="small"
                sx={{ px: 1, py: 0.5, gap: 0.5 }}
                onClick={() => setAddopen(true)}
              >
                <AddIcon sx={{ fontSize: 16 }} /> Team
              </Button>
            </Grid2>
            <Grid2 container sx={{ height: "33vh", overflowY: "auto" }}>
              <List dense sx={{ width: "100%" }}>
                {TeamList.map((x) => {
                  return (
                    <ListItem
                      sx={{ py: 0 }}
                      key={x.name}
                      secondaryAction={
                        <div style={{ display: "flex" }}>
                          <Tooltip title={"Edit"}>
                            <IconButton
                              edge="end"
                              size="small"
                              onClick={() => editfun(x)}
                            >
                              <ModeEditIcon
                                sx={{ color: primary, fontSize: 18 }}
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={"Delete"}>
                            <IconButton
                              edge="end"
                              size="small"
                              onClick={() => {
                                setEditData(x);
                                setDeleteOpen(true);
                              }}
                            >
                              <DeleteIcon
                                sx={{ color: primary, fontSize: 18 }}
                              />
                            </IconButton>
                          </Tooltip>
                        </div>
                      }
                    >
                      <ListItemText
                        primary={x.name}
                        slotProps={{
                          primary: {
                            sx: {
                              color: text,
                              fontWeight: "medium",
                              variant: "body2",
                            },
                          },
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Grid2>
          </Box>
        </Grid2>
      </Grid2>
      {Addopen && (
        <Teamdailog
          Addopen={Addopen}
          setAddopen={setAddopen}
          EditData={EditData}
          setEditData={setEditData}
        />
      )}
      {DeleteOpen && (
        <DeleteDialog
          DeleteOpen={DeleteOpen}
          setDeleteOpen={setDeleteOpen}
          detail={{
            type: "masters",
            key: ` ${EditData.name} Team`,
            function: Teamdeletefun,
          }}
        />
      )}
    </>
  );
}
