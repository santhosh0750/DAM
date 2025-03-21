import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

export default function Toppanel() {
  const [Flowname, setFlowname] = useState("");

  return (
    <div className="min-h-4 bg-[#D9E1F7] w-[85%] px-2">
      <div className="flex flex-row justify-between items-center ">
        <TextField
          variant="standard"
          label={"Flow Name"}
          value={Flowname}
          onChange={(e) => setFlowname(e.target.value)}
        />
        <div className="gap-1">
          <Button
            size="small"
            sx={{
              background: "red",
              mx: 0.5,
              ":hover": {
                background: "red",
              },
            }}
          >
            Cancel
          </Button>
          <Button size="small" sx={{ mx: 1 }}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
