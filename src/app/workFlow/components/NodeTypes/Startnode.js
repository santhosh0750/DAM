import { Handle } from "@xyflow/react";
import React, { memo } from "react";

const FlowStartNode = () => {
  return (
    <>
      <div className="bg-[#D9E1F7] flex flex-row text-center justify-center items-center text-xs rounded-md p-2 text-white ">
        <div className="text-black">Flow Start</div>
      </div>
      <Handle type="source" position="bottom" connectable="single" />
    </>
  );
};

export default memo(FlowStartNode);
