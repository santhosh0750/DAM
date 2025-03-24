"use client";
import useThemeColor from "@/hooks/useThemeColor";
import {
  Autocomplete,
  Button,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Searchaandfilecount from "@/Uicomponents/Searchaandfilecount";
import Uploadbutton from "@/Uicomponents/Uploadbutton";
import Tabbutton from "@/Uicomponents/Tabbutton";
import RenameDailog from "@/Uicomponents/RenameDailog";
import Maincard from "@/Uicomponents/Maincard";
import FileFoldermap from "@/Uicomponents/FileFoldermap";
import { folderdataAPI, folderlistAPI } from "@/Services/Commonapi";
import FileViewer from "@/Uicomponents/FileViewer";

export default function page() {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();

  const [Search, setSearch] = useState("");
  const [RenameOpen, setRenameOpen] = useState(false);
  const [FFView, setFFView] = useState(false);
  const [FileviewOpen, setFileviewOpen] = useState(true);
  const [Tags, setTags] = useState([
    {
      _id: 1,
    },
    {
      _id: 2,
    },
    {
      _id: 3,
    },
    {
      _id: 4,
    },
    {
      _id: 5,
    },
    {
      _id: 6,
    },
    {
      _id: 7,
    },
    {
      _id: 8,
    },
    {
      _id: 9,
    },
  ]);
  const [Folderpath, setfolderpath] = useState([
    {
      _id: 1,
      name: "Home",
    },

    {
      _id: 2,
      name: "secfolder",
    },
    {
      _id: 3,
      name: "thirdfolder",
    },
  ]);
  const [FolderList, setFolderList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [FileList, setFileList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const folderlistfun = async () => {
    const { data } = await folderlistAPI();
    if (data.status == "success") {
      setFolderList(data.message);
    } else {
      setFolderList([]);
    }
  };
  const folderdataapi = async () => {
    const { data } = await folderdataAPI();
    if (data.status === "success") {
      setFolderList(data.message);
    } else {
      setFolderList([]);
    }
  };

  useEffect(() => {
    // folderlistfun();
  }, []);

  return (
    <Grid2 container>
      <Grid2 size={12} sx={{ color: text, fontSize: 14, fontWeight: 500 }}>
        MyFiles{" "}
        {Folderpath.map((x, y) => {
          return (
            <span key={x._id}>
              <span style={{ color: primary }}> / </span>
              <Typography
                component={"span"}
                sx={{
                  color: Folderpath.length == y + 1 ? primary : textsecondary,
                  cursor: "pointer",
                  fontSize: Folderpath.length == y + 1 ? 16 : 14,

                  "&:hover": { color: primary },
                }}
              >
                {x.name}
              </Typography>
            </span>
          );
        })}
      </Grid2>
      <Grid2
        container
        size={12}
        sx={{ my: 1, justifyContent: "space-between" }}
      >
        <Grid2
          container
          size={{ md: 10, xs: 12 }}
          spacing={1}
          sx={{ overflowX: "auto", px: 1 }}
        >
          <Grid2
            container
            size={10}
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "auto",
              whiteSpace: "nowrap",
              width: "fit-content",
              alignItems: "center",
              background: "#fff",
              borderRadius: 3,
              borderColor: "#dddddd",
            }}
          >
            <Typography
              sx={{
                color: primary,
                fontSize: "16px",
                fontWeight: 500,
                pb: 0.2,
              }}
            >
              Tags
            </Typography>
            {Tags.map((x) => {
              return (
                <Typography
                  key={x._id}
                  sx={{
                    px: 2,
                    py: 0.5,
                    color: textsecondary,
                    bgcolor: "#fff",
                    borderRadius: 2,
                    fontSize: 12,
                    cursor: "pointer",
                    "&:hover": { bgcolor: secondary },
                    m: 0.5,
                  }}
                >
                  Tata Cars
                </Typography>
              );
            })}
          </Grid2>
        </Grid2>
        <Grid2
          container
          size={{ md: 2, xs: 12 }}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: primary, fontSize: 22 }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid2>
      </Grid2>
      <Grid2 container size={12}>
        <Grid2
          size={12}
          sx={{
            background: "#fff",
            p: 1,
            height: "82vh",
            overflowY: "auto",
          }}
        >
          <Grid2 container spacing={0.5}>
            <Searchaandfilecount Search={Search} setSearch={setSearch} />
            <Grid2
              container
              size={{ md: 5, xs: 12 }}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Uploadbutton />
            </Grid2>
            <Grid2
              container
              size={{ md: 3, xs: 12 }}
              sx={{
                display: "flex",
                justifyContent: { md: "end", xs: "center" },
              }}
            >
              <Tabbutton FFView={FFView} setFFView={setFFView} />
            </Grid2>
          </Grid2>
          <Grid2 container size={12} spacing={1.5}>
            {!FFView ? (
              <FileFoldermap
                Folder={FolderList}
                Files={FileList}
                helpers={{ folderopenfun: folderdataapi }}
              />
            ) : (
              <Maincard />
            )}
          </Grid2>
        </Grid2>
      </Grid2>
      {RenameOpen && (
        <RenameDailog RenameOpen={RenameOpen} setRenameOpen={setRenameOpen} />
      )}
      {FileviewOpen && (
        <FileViewer
          FileviewOpen={FileviewOpen}
          setFileviewOpen={setFileviewOpen}
        />
      )}
    </Grid2>
  );
}
