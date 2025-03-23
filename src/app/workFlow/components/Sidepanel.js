import useThemeColor from "@/hooks/useThemeColor";
import Image from "next/image";
import React from "react";
import { useDnD } from "../DnDContext";

export default function Sidepanel() {
  const { primary, secondary, text, textsecondary } = useThemeColor();
  const [_, setType] = useDnD();
  const onDragStart = (event, nodeType) => {
    console.log("nodetype", nodeType);
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const nodeTextStyle = " font-medium text-white  ";

  return (
    <>
      <div className="flex flex-row justify-center p-1 ">
        <div className="flex flex-row w-[100%] ">
          {" "}
          <div className=" flex flex-row text-xl font-bold subpixel-antialiased text-[#1E3A8A] w-full">
            {" "}
            Flow Studio{" "}
          </div>
        </div>
        <div className="text-xs text-[#54575B]">
          Streamline and automate workflows
        </div>
      </div>
      <div className="flex flex-col p-1 mt-2 gap-1">
        <div
          draggable
          onDragStart={(e) => onDragStart(e, "createStartNode")}
          className="bg-[#1E3A8A] text-white p-3 rounded-md cursor-pointer flex justify-center  "
        >
          <div className={nodeTextStyle}>Flow Start</div>
        </div>

        <div
          className="bg-[#1E3A8A] text-white p-1 rounded-md cursor-pointer"
          draggable
          onDragStart={(e) => onDragStart(e, "createEndNode")}
        >
          <div className="font-medium ">Flow End</div>
        </div>
        <div className="bg-[#1E3A8A] text-white p-1 rounded-md cursor-pointer">
          <div className="font-medium ">File Request</div>
        </div>
        <div className="bg-[#1E3A8A] text-white p-1 rounded-md cursor-pointer ">
          <div className="font-medium ">File Approval</div>
        </div>
        <div className="bg-[#1E3A8A] text-white p-1 rounded-md cursor-pointer ">
          <div className="font-medium ">File Share</div>
        </div>
        <div className="bg-[#1E3A8A] text-white p-1 rounded-md cursor-pointer ">
          <div className="font-medium ">Notification</div>
        </div>
      </div>
    </>
  );
}
