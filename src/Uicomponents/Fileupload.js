import useThemeColor from "@/hooks/useThemeColor";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Grid2,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import uploadimage from "../../public/assets/Common/Fileuploadclick.svg";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FileUploadAPI, PreSignedUrlAPI } from "@/Services/Commonapi";

export default function Fileupload({ UploadOpen, setUploadOpen }) {
  const { primary, secondary, text, textsecondary, optional } = useThemeColor();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setUploadOpen(false);
  };

  const [DocumentTitle, setDocumentTitle] = useState("");
  const [DocumentExpiresAt, setDocumentExpiresAt] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState([]);
  const [Filechoosen, setFilechoosen] = useState(null);
 const [FileContent,setFileContent] = useState(null)
      
        const handleFileChange = (e) => {
          if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setDocumentTitle(file.name);
            setFilechoosen(file);
        
            const reader = new FileReader();
        
            if (file.type.includes("text")) {
              // Read text file
              reader.onload = (event) => {
                setFileContent(event.target.result);
              };
              reader.readAsText(file);
            } else if (file.type.includes("image")) {
              // Read image file
              reader.onload = (event) => {
                setFileContent(event.target.result); // Base64 image
              };
              reader.readAsDataURL(file);
            } else if (file.type.includes("pdf")) {
              // Show PDF
              const pdfURL = URL.createObjectURL(file);
              setFileContent(pdfURL);
            }
          }
        };
  
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setChips([...chips, inputValue.trim()]);
      setInputValue("");
    }
  };
  const handleDelete = (chipToDelete) => {
    setChips(chips.filter((chip) => chip !== chipToDelete));
  };

  const fileuploadApi = async () => {
    const payload = {
      parent_file_id: "",
      is_version: "true",
      is_download: "true",
      expire_at: "24-03-2025",
      file_tag: chips,
      file_title: DocumentTitle,
      size: Filechoosen.size,
      file_type: Filechoosen.type,
      file_name: Filechoosen.name,
      file_folder_path: "",
    };
    const { data } = await FileUploadAPI(payload);
    console.log("data", data);
    if (data.status == "success") {
      console.log("Filechoosen", Filechoosen, data.preSignedUrl);
      const reader = new FileReader();
      reader.readAsArrayBuffer(Filechoosen);
      reader.onload = async () => {
        const binary = reader.result;
        const response2 = await PreSignedUrlAPI(data.preSignedUrl, binary);
        console.log("response", response2);
        if (response2.status == 200) {
          setUploadOpen(false);
        }
      };
    }
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={UploadOpen}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="md"
        keepMounted
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
            },
          },
        }}
      >
        <DialogContent>
          <label htmlFor="actual-btn">
            <Grid2
              container
              sx={{
                border: `1px dashed ${primary} `,
                borderColor: primary,
                borderRadius: 2,
                justifyContent: "center",
                p: 1,
                height: "40Vh",
              }}
            >
              <div style={{ display: "none" }}>
                <input
                  type="file"
                  accept="text"
                  id="actual-btn"
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
              </div>
              {FileContent ? (
    Filechoosen.type.includes("image") ? (
      <img src={FileContent} alt="Preview" style={{ maxWidth: "100%", maxHeight: "100%" }} />
    ) : Filechoosen.type.includes("pdf") ? (
      <iframe src={FileContent} width="100%" height="100%" title="PDF Preview"></iframe>
    ) : (
      <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
        {FileContent}
      </Typography>
    )
  ) : (
    <Grid2 container sx={{ justifyContent: "center", textAlign: "center",flexDirection:"column" }}>
      <img src="/assets/Common/Fileuploadclick.svg" alt="Upload" loading="lazy" />
      <Typography variant="body2">Drag files here or click to upload</Typography>
    </Grid2>
  )}
  </Grid2>
          </label>
          <Grid2 container sx={{ mt: 2 }} spacing={1}>
            <Grid2 size={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Document Title"
                size="small"
                value={DocumentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Document Tags"
                size="small"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                slotProps={{
                  input: {
                    startAdornment:
                      chips.length != 0 ? (
                        <Box
                          sx={{ display: "flex", gap: 0.5, overflow: "scroll" }}
                        >
                          {chips.map((item, index) => (
                            <Chip
                              key={index}
                              label={item}
                              onDelete={() => handleDelete(item)}
                              size="small"
                            />
                          ))}
                        </Box>
                      ) : (
                        ""
                      ),
                  },
                }}
              />
            </Grid2>
            <Grid2 size={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Expires At"
                  slotProps={{
                    textField: { size: "small", fullWidth: true },
                  }}
                  views={["year", "month", "day"]}
                  minDate={dayjs()}
                  value={DocumentExpiresAt}
                  onChange={(newValue) => setDocumentExpiresAt(newValue)}
                />
              </LocalizationProvider>
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Grid2 container spacing={1} sx={{ pr: 2 }}>
            <Button
              variant="outlined"
              sx={{
                background: "red",
                borderColor: "red",
                ":hover": { background: "red" },
              }}
              size="small"
              onClick={() => setUploadOpen(false)}
            >
              {" "}
              Cancel
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => fileuploadApi()}
            >
              {" "}
              Upload
            </Button>
          </Grid2>
        </DialogActions>
      </Dialog>
    </>
  );
}
