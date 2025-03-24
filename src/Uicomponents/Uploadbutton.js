import { Button, Grid2 } from "@mui/material";
import React, { useState } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import useThemeColor from "@/hooks/useThemeColor";
import Fileupload from "./Fileupload";
import AssetsFileUpload from "./AssetsFileUpload";

export default function Uploadbutton() {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();

  const [UploadOpen, setUploadOpen] = useState(false);

  return (
    <>
      <Grid2
        container
        size={{ md: 10, xs: 12 }}
        sx={{
          px: 1,
          borderRadius: 3,
          borderColor: "#dddddd",
          alignItems: "center",
          justifyContent: "center",
          m: 0,
        }}
        spacing={0.5}
      >
        <Button
          sx={{
            color: "#292D32CC",
            background: secondary,
            gap: 0.5,
            py: 1,
            px: 2,
            ":hover": {
              backgroundColor: "#314e97",
              color: "#fff",
            },
            m: 0,
          }}
          size="small"
          onClick={() => setUploadOpen(true)}
        >
          <FileUploadOutlinedIcon sx={{ fontSize: 16 }} />
          Upload
        </Button>{" "}
        <span
          style={{
            marginLeft: "2px",
            marginRight: "3px",
            color: primary,
          }}
        >
          {" "}
          |
        </span>
        <Button
          sx={{
            color: "#292D32CC",
            background: secondary,
            py: 1,
            px: 2,
            gap: 0.5,

            "&:hover": {
              backgroundColor: "#314e97",
              color: "#fff",
            },
          }}
          size="small"
        >
          <SearchOutlinedIcon sx={{ fontSize: 16 }} /> Search..
        </Button>{" "}
        <span
          style={{
            marginLeft: "2px",
            marginRight: "3px",
            color: primary,
          }}
        >
          {" "}
          |
        </span>
        <Button
          sx={{
            color: "#292D32CC",
            background: secondary,
            py: 1,
            px: 2,
            gap: 0.5,

            "&:hover": {
              backgroundColor: "#314e97",
              color: "#fff",
            },
          }}
          size="small"
        >
          <KeyboardVoiceOutlinedIcon sx={{ fontSize: 16 }} /> Voice
        </Button>{" "}
      </Grid2>

      {/* {UploadOpen && (
        <Fileupload UploadOpen={UploadOpen} setUploadOpen={setUploadOpen} />
      )} */}
      {UploadOpen && (
        <AssetsFileUpload
          UploadOpen={UploadOpen}
          setUploadOpen={setUploadOpen}
        />
      )}
    </>
  );
}
