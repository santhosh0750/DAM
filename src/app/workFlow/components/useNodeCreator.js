"use client";
import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";

export const useNodeCreator = () => {
  const { setNodes } = useReactFlow(); // ReactFlow API

  const getId = useCallback(() => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const createStartNode = (position) => {
    console.log("position", position);
    const Id = getId();
    const update = [
      {
        id: `${1}`,
        label: "Start",
        class: "text-bold text-black items-center",
        position,
        style: { width: "180px", color: "#fff", borderRadius: "10px" },
        type: "startNode",
        data: { _id: `${1}`, label: name },
      },
    ];
    setNodes((node) => [...node, ...update]);
  };
  const createEndNode = (position) => {
    const Id = getId();
    const update = [
      {
        id: `${2}`,
        label: "End",
        class: "text-bold text-black items-center",
        position,
        type: "endNode",
        data: { _id: `${2}`, label: name },
      },
    ];
    setNodes((node) => [...node, ...update]);
  };

  const nodeCreator = useCallback(
    (type, position) => {
      let allFunction = {
        createStartNode,
        createEndNode,
      };
      allFunction[type](position);
    },
    [] // Correct dependencies
  );

  return nodeCreator;
};
