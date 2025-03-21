import {
  Box,
  Button,
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
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import useThemeColor from "@/hooks/useThemeColor";
import AddIcon from "@mui/icons-material/Add";
import CustomerAdddailog from "../masterDailogs/CustomerAdddailog";
import { dynamicSort } from "@/utlis/CommonFunctions";
import { CustomerlistAPI } from "@/Services/Master/MasterlistApi";

function Customer() {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();
  const [Addopen, setAddopen] = useState(false);
  const [CustomerList, setCustomerList] = useState([]);
  const [EditData, setEditData] = useState("");
  const [DeleteOpen, setDeleteOpen] = useState(false);

  const Customerlistgetapi = async () => {
    const { data } = await CustomerlistAPI();
    if (data.status == "success") {
      setCustomerList(
        data.message.length ? dynamicSort("name", data.message) : []
      );
    } else {
      setCustomerList([]);
    }
  };
  const editfun = (value) => {
    setAddopen(true);
    setEditData(value);
  };
  useEffect(() => {
    Customerlistgetapi();
  }, [Addopen]);

  return (
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
              Customer
            </Typography>
            <Button
              size="small"
              sx={{ px: 1, py: 0.5, gap: 0.5 }}
              onClick={() => setAddopen(true)}
            >
              <AddIcon sx={{ fontSize: 16 }} /> Customer
            </Button>
          </Grid2>
          <Grid2 container sx={{ height: "33vh", overflowY: "auto" }}>
            <List dense sx={{ width: "100%" }}>
              {CustomerList.map((x) => {
                return (
                  <ListItem
                    sx={{ py: 0 }}
                    key={x._id}
                    secondaryAction={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Tooltip title={"Active"}>
                          <Switch
                            checked={x.is_customer}
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
      {Addopen && (
        <CustomerAdddailog
          Addopen={Addopen}
          setAddopen={setAddopen}
          EditData={EditData}
          setEditData={setEditData}
        />
      )}
    </Grid2>
  );
}

export default Customer;
