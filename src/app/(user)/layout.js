import React from "react";
import SideBar from "./SideBar";

export default function layout({ children }) {
  return (
    <div>
      <SideBar>{children}</SideBar>
    </div>
  );
}
