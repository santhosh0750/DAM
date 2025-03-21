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
import Collectiondailog from "../masterDailogs/Collectiondailog";
import AddIcon from "@mui/icons-material/Add";
import { ProjectlistAPI } from "@/Services/Master/MasterlistApi";
import { ProjectdeleteAPI } from "@/Services/Master/MasterDeleteApi";
import DeleteDialog from "@/Uicomponents/DeleteDialog";
import { toast } from "react-toastify";

export default function Collection() {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();
  const [Addopen, setAddopen] = useState(false);
  const [ProjectList, setProjectList] = useState([]);
  const [EditData, setEditData] = useState("");
  const [DeleteOpen, setDeleteOpen] = useState(false);
  // apis
  const Projectget = async () => {
    try {
      const { data } = await ProjectlistAPI();
      if (data.status == "success") {
        setProjectList(data.message);
      } else {
        setProjectList([]);
      }
    } catch (error) {
      console.error("teamget", error);
    }
  };
  const Projectdeletefun = async () => {
    const { data } = await ProjectdeleteAPI(EditData._id);
    if (data.status == "success") {
      toast.success("Team Removed Successfully");
      setDeleteOpen(false);
      setEditData("");
      Projectget();
    } else {
      toast.error(data.message);
      setDeleteOpen(false);
      setEditData("");
    }
  };
  const editfun = (value) => {
    setAddopen(true);
    setEditData(value);
  };
  useEffect(() => {
    Projectget();
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
                Projects
              </Typography>
              <Button
                size="small"
                sx={{ px: 1, py: 0.5, gap: 0.5 }}
                onClick={() => setAddopen(true)}
              >
                <AddIcon sx={{ fontSize: 16 }} /> Project
              </Button>
            </Grid2>
            <Grid2 container sx={{ height: "33vh", overflowY: "auto" }}>
              <List dense sx={{ width: "100%" }}>
                {ProjectList.map((x) => {
                  return (
                    <ListItem
                      sx={{ py: 0 }}
                      key={x._id}
                      secondaryAction={
                        <div style={{ display: "flex", alignItems: "center" }}>
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
                        primary={x.projectName}
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
        <Collectiondailog
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
            key: ` ${EditData.projectName} Project`,
            function: Projectdeletefun,
          }}
        />
      )}
    </>
  );
}
