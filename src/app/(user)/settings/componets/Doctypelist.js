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
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import useThemeColor from "@/hooks/useThemeColor";
import { DoctypelistAPI } from "@/Services/Master/MasterlistApi";
import { dynamicSort } from "@/utlis/CommonFunctions";

export default function Doctypelist() {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();

  const [Addopen, setAddopen] = useState(false);
  const [DoctypeList, setDoctypeList] = useState([]);
  const [EditData, setEditData] = useState("");
  const [DeleteOpen, setDeleteOpen] = useState(false);
  //apis
  const Doctypelistapi = async () => {
    const { data } = await DoctypelistAPI();
    if (data.status == "success") {
      setDoctypeList(
        data.message.length ? dynamicSort("display_doctype", data.message) : []
      );
    } else {
      setDoctypeList([]);
    }
  };
  useEffect(() => {
    Doctypelistapi();
  }, []);
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
                Doctype
              </Typography>
              {/* <Button
                size="small"
                sx={{ px: 1, py: 0.5, gap: 0.5 }}
                onClick={() => setAddopen(true)}
              >
                <AddIcon sx={{ fontSize: 16 }} /> Doctype
              </Button> */}
            </Grid2>
            <Grid2 container sx={{ height: "33vh", overflowY: "auto" }}>
              <List dense sx={{ width: "100%" }}>
                {DoctypeList.map((x) => {
                  return (
                    <ListItem sx={{ py: 0 }} key={x._id}>
                      <ListItemText
                        primary={x.display_doctype}
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
    </>
  );
}
