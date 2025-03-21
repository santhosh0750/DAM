"use client";
import React, { Suspense, useCallback, useState } from "react";
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import useThemeColor from "@/hooks/useThemeColor";
import Sidepanel from "./components/Sidepanel";
import Startnode from "./components/NodeTypes/Startnode";
import FlowEndNode from "./components/NodeTypes/Endnode";
import Toppanel from "./components/Toppanel";
import CustomEdge from "./components/EdgesCustom";
import { DnDProvider, useDnD } from "./DnDContext";
import { useNodeCreator } from "./components/useNodeCreator";

const nodeTypes = {
  startNode: Startnode,
  endNode: FlowEndNode,
};
const edgeTypes = {
  customEdge: CustomEdge,
};

const ReactFlowDiagram = () => {
  const { primary, secondary, text, textsecondary } = useThemeColor();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // const [viewport, setViewport] = useState({ x: 150, y: 80, zoom: 1 });

  const { screenToFlowPosition } = useReactFlow();
  const nodeCreator = useNodeCreator();
  const [type] = useDnD();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      nodeCreator(type, position);
    },
    [screenToFlowPosition, type, nodeCreator]
  );
  //connect node
  const onConnect = useCallback((params) => {
    console.log("params", { ...params, ...{ type: "customEdge" } });
    setEdges((eds) => addEdge({ ...params, ...{ type: "customEdge" } }, eds));
  }, []);
  const proOptions = { hideAttribution: true };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        edgeTypes={edgeTypes} //for customer edges
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        proOptions={proOptions} //hide the react flow offical link in the bottom
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel
          style={{
            background: secondary,
            width: "15%",
            height: "100%",
            padding: 0,
            margin: 0,
          }}
        >
          <Sidepanel />
        </Panel>
        <Panel
          style={{
            padding: 0,
            margin: 0,
            justifyContent: "end",
          }}
          position="top-right"
          className="flex justify-end w-full !m-0 !p-0  "
        >
          <Toppanel />
        </Panel>
      </ReactFlow>
    </div>
  );
};

const ReactFlowPage = () => {
  return (
    <Suspense fallback={"Loading"}>
      <ReactFlowProvider>
        <DnDProvider>
          <ReactFlowDiagram />
        </DnDProvider>
      </ReactFlowProvider>
    </Suspense>
  );
};
export default ReactFlowPage;
