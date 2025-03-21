import React, { memo } from "react";
import { Handle } from "@xyflow/react";

const FlowEndNode = () => {
  return (
    <>
      <div className="bg-red-500 flex flex-row text-center justify-center items-center text-xs rounded-md p-2 text-white ">
        <div className="text-black">Flow End</div>
      </div>
      <Handle type="target" position="top" connectable="single" />
    </>
  );
};

export default memo(FlowEndNode);
