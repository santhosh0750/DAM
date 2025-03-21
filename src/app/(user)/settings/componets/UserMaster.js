import {
  Box,
  Button,
  FormControlLabel,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import useThemeColor from "@/hooks/useThemeColor";
import UserAdd from "../masterDailogs/UserAdd";
import AddIcon from "@mui/icons-material/Add";
import { UserlistAPI } from "@/Services/Commonapi";
import { dynamicSort } from "@/utlis/CommonFunctions";

export default function UserMaster() {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();
  const [Addopen, setAddopen] = useState(false);
  const [UserList, setUserList] = useState([]);
  const [EditData, setEditData] = useState("");
  //api
  const Userlistgetapi = async () => {
    const { data } = await UserlistAPI();
    if (data.status == "success") {
      setUserList(data.message.length ? dynamicSort("name", data.message) : []);
    } else {
      setUserList([]);
    }
  };
  const editfun = (value) => {
    setAddopen(true);
    setEditData(value);
  };
  useEffect(() => {
    Userlistgetapi();
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
              <div style={{ color: primary, fontWeight: 600 }}>User</div>
              <Button
                size="small"
                sx={{ px: 1, py: 0.5, gap: 0.5 }}
                onClick={() => setAddopen(true)}
              >
                <AddIcon sx={{ fontSize: 16 }} /> User
              </Button>
            </Grid2>
            <Grid2 container sx={{ height: "33vh", overflowY: "auto" }}>
              <List dense sx={{ width: "100%" }}>
                {UserList.map((x) => {
                  return (
                    <ListItem
                      sx={{ py: 0 }}
                      key={x._id}
                      secondaryAction={
                        <div style={{ display: "flex" }}>
                          <Tooltip title={"Active"}>
                            <Switch
                              checked={x.is_active}
                              size="small"
                              sx={{ fontSize: 18 }}
                            />
                          </Tooltip>
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
        <UserAdd
          Addopen={Addopen}
          setAddopen={setAddopen}
          EditData={EditData}
          setEditData={setEditData}
        />
      )}
    </>
  );
}
