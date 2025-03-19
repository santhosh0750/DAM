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
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Collectiondailog from "../masterDailogs/Collectiondailog";
import AddIcon from "@mui/icons-material/Add";

export default function Collection() {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();
  const [Addopen, setAddopen] = useState(false);
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
                <ListItem
                  secondaryAction={
                    <div style={{ display: "flex" }}>
                      <Tooltip title={"Edit"}>
                        <IconButton edge="end" size="small">
                          <ModeEditIcon sx={{ color: primary }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"Delete"}>
                        <IconButton edge="end" size="small">
                          <DeleteIcon sx={{ color: primary }} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  }
                >
                  <ListItemText
                    primary={"Santhosh"}
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
              </List>
            </Grid2>
          </Box>
        </Grid2>
      </Grid2>
      {Addopen && (
        <Collectiondailog Addopen={Addopen} setAddopen={setAddopen} />
      )}
    </>
  );
}
