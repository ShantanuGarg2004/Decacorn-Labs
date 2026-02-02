"use client";

import { motion } from "framer-motion";
import { nodes, edges, ServiceNode } from "./serviceMap";
import { useMemo } from "react";

type Props = {
  activeNode: ServiceNode | null;
  setActiveNode: (n: ServiceNode | null) => void;
};

export default function NeuralMatrix({ activeNode, setActiveNode }: Props) {
  const activeEdges = useMemo(() => {
    if (!activeNode) return [];

    return [...edges.inputToHidden, ...edges.hiddenToOutput].filter(
      (e) => e.from === activeNode.id || e.to === activeNode.id
    );
  }, [activeNode]);

  return (
    <motion.div
      className="relative w-full mx-auto flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      onClick={() => setActiveNode(null)}
      // Dynamic sizing based on active state
      animate={{
        width: activeNode ? "600px" : "900px",
        height: activeNode ? "400px" : "500px",
        scale: activeNode ? 0.9 : 1,
      }}
      style={{
        transition: "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      <div className="relative w-full h-full">
        {/* CONNECTIONS SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* All connections */}
          {[...edges.inputToHidden, ...edges.hiddenToOutput].map((edge, i) => {
            const from = nodes.find((n) => n.id === edge.from)!;
            const to = nodes.find((n) => n.id === edge.to)!;
            const isActive = activeEdges.some(e => e.from === edge.from && e.to === edge.to);

            return (
              <g key={`edge-${i}`}>
                {/* Base connection line */}
                <line
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />
                
                {/* Active animated line */}
                {isActive && (
                  <motion.line
                    x1={`${from.x}%`}
                    y1={`${from.y}%`}
                    x2={`${to.x}%`}
                    y2={`${to.y}%`}
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                    filter="url(#glow)"
                    initial={{ strokeDashoffset: 20 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* NODES */}
        {nodes.map((node) => {
          const Icon = node.icon;
          const isActive = activeNode?.id === node.id;

          return (
            <motion.div
              key={node.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveNode(node);
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ 
                left: `${node.x}%`, 
                top: `${node.y}%`,
              }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.2 }}
            >
              {/* NODE CIRCLE */}
              <motion.div
                className="relative rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: isActive 
                    ? "2px solid rgba(255, 255, 255, 0.5)" 
                    : "1.5px solid rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  boxShadow: isActive
                    ? "0 0 35px rgba(255, 255, 255, 0.25), 0 8px 24px rgba(0, 0, 0, 0.3)"
                    : "0 4px 16px rgba(0, 0, 0, 0.2)",
                }}
                animate={{
                  width: activeNode ? "64px" : "80px",
                  height: activeNode ? "64px" : "80px",
                  boxShadow: isActive
                    ? [
                        "0 0 35px rgba(255, 255, 255, 0.25), 0 8px 24px rgba(0, 0, 0, 0.3)",
                        "0 0 45px rgba(255, 255, 255, 0.35), 0 8px 24px rgba(0, 0, 0, 0.3)",
                        "0 0 35px rgba(255, 255, 255, 0.25), 0 8px 24px rgba(0, 0, 0, 0.3)",
                      ]
                    : "0 4px 16px rgba(0, 0, 0, 0.2)",
                }}
                transition={{
                  width: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                  height: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                  boxShadow: {
                    duration: 2,
                    repeat: isActive ? Infinity : 0,
                    ease: "easeInOut",
                  }
                }}
              >
                <motion.div
                  animate={{
                    scale: activeNode ? 0.85 : 1,
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Icon 
                    className="relative z-10"
                    size={activeNode ? 28 : 32}
                    strokeWidth={1.5}
                    style={{
                      color: isActive ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.75)",
                      transition: "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* LABEL - Only visible when active */}
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : -5,
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
              >
                <div 
                  className="px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide"
                  style={{
                    background: "rgba(0, 0, 0, 0.85)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {node.label}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}