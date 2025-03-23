import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

export default function Toppanel() {
  const [Flowname, setFlowname] = useState("");

  return (
    <div className="min-h-4 bg-transparent w-[85%] px-2 justify-end items-center m-1 ">
      <div className="flex flex-row items-center ">
        <div className=" flex  w-[60%] justify-end" >
        <TextField
          variant="outlined"
          size="small"
          label={"Flow Name"}
          value={Flowname}
          onChange={(e) => setFlowname(e.target.value)}
        />
        </div>
        <div className="gap-1 w-[40%] flex justify-end ">
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
