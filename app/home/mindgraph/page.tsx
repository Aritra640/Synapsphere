"use client";

import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";


const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      label: (
        <div className="max-w-xs p-5 backdrop-blur-xl bg-gray-900/80 border border-gray-700/60 rounded-2xl shadow-[0_0_20px_rgba(140,0,255,0.3)]">
          <h3 className="text-base font-semibold text-purple-300">BuildFlow</h3>
          <p className="text-xs text-gray-300 mt-1">Decentralized manufacturing platform.</p>
        </div>
      ),
    },
  },
  {
    id: "2",
    position: { x: 340, y: -110 },
    data: {
      label: (
        <div className="p-4 backdrop-blur-xl bg-purple-800/20 border border-purple-700/40 rounded-xl shadow">
          <h4 className="text-sm font-semibold text-purple-300">Supplier Network</h4>
          <p className="text-xs text-gray-300 mt-1">Component sourcing & ratings.</p>
        </div>
      ),
    },
  },
  {
    id: "3",
    position: { x: 340, y: 120 },
    data: {
      label: (
        <div className="p-4 backdrop-blur-xl bg-indigo-800/20 border border-indigo-700/40 rounded-xl shadow">
          <h4 className="text-sm font-semibold text-indigo-300">Manufacturing</h4>
          <p className="text-xs text-gray-300 mt-1">Assembly pipelines & factories.</p>
        </div>
      ),
    },
  },
  {
    id: "4",
    position: { x: 720, y: 10 },
    data: {
      label: (
        <div className="p-4 backdrop-blur-xl bg-green-800/20 border border-green-700/40 rounded-xl shadow">
          <h4 className="text-sm font-semibold text-green-300">Payments</h4>
          <p className="text-xs text-gray-300 mt-1">Escrow, tokens & milestones.</p>
        </div>
      ),
    },
  },
  {
    id: "5",
    position: { x: 720, y: 170 },
    data: {
      label: (
        <div className="p-4 backdrop-blur-xl bg-yellow-700/20 border border-yellow-600/40 rounded-xl shadow">
          <h4 className="text-sm font-semibold text-yellow-300">QA & Logistics</h4>
          <p className="text-xs text-gray-300 mt-1">Global shipping + quality checks.</p>
        </div>
      ),
    },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e1-3", source: "1", target: "3", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e2-4", source: "2", target: "4", animated: false, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e3-5", source: "3", target: "5", animated: false, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e4-5", source: "4", target: "5", animated: false, markerEnd: { type: MarkerType.ArrowClosed } },
];

export default function Mind() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.ArrowClosed },
            animated: true,
            style: { strokeWidth: 2, stroke: "#a855f7" },
          },
          eds
        )
      ),
    []
  );

  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-gradient-to-b from-gray-950 to-gray-900 text-white p-6 overflow-hidden">
      <div className="w-full max-w-6xl h-[85vh] bg-gray-900/60 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Top bar */}
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
              MG
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide">Mind Graph</div>
              <div className="text-xs text-gray-400">Interactive • Beautiful • Hard‑coded</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 border border-gray-700 text-sm transition">Export</button>
            <button className="px-3 py-1 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm transition shadow">New Node</button>
          </div>
        </div>

        {/* Canvas */}
        <div className="h-[calc(100%-64px)]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            proOptions={{ hideAttribution: true }}
          >
            <Background gap={20} color="#3b3b3b" />
            <MiniMap
              pannable
              zoomable
              nodeColor={(n) => (n.id === "1" ? "#a855f7" : "#1f2937")}
            />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

