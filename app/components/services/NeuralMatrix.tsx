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

  // Calculate node animation delays based on layer
  const getNodeDelay = (node: ServiceNode) => {
    if (node.layer === "input") return 0.3;
    if (node.layer === "hidden") return 0.5;
    return 0.7; // output layer
  };

  return (
    <motion.div
      className="relative w-full mx-auto flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.3 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 1.2, 
        ease: [0.34, 1.56, 0.64, 1], // Spring-like bounce
      }}
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
      {/* CLICK PROMPT - Only visible when no node is active */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: activeNode ? 0 : 1,
          y: activeNode ? 20 : 0,
        }}
        transition={{ 
          opacity: { duration: 0.4 },
          y: { duration: 0.4 },
          delay: activeNode ? 0 : 1.6, // Appears after network emerges
        }}
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 pointer-events-none z-50"
      >
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center gap-3 px-6 py-3 rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Pulsating dot */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-2 h-2 rounded-full"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
            }}
          />
          
          {/* Text */}
          <span 
            className="text-sm font-medium tracking-wide"
            style={{
              color: "rgba(255, 255, 255, 0.85)",
            }}
          >
            Click any node to explore
          </span>
          
          {/* Hand cursor icon */}
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              x: [0, 3, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </motion.svg>
        </motion.div>
      </motion.div>

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
            
            // Determine connection animation delay based on layers
            const isInputToHidden = i < edges.inputToHidden.length;
            const connectionDelay = isInputToHidden ? 0.6 : 0.9;

            return (
              <g key={`edge-${i}`}>
                {/* Base connection line with emergence animation */}
                <motion.line
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    pathLength: { duration: 0.5, delay: connectionDelay + (i * 0.02) },
                    opacity: { duration: 0.3, delay: connectionDelay + (i * 0.02) },
                    ease: "easeOut",
                  }}
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
        {nodes.map((node, nodeIndex) => {
          const Icon = node.icon;
          const isActive = activeNode?.id === node.id;
          const nodeDelay = getNodeDelay(node);

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
              // Emergence animation
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: nodeDelay + (nodeIndex % 4) * 0.08,
                ease: [0.34, 1.56, 0.64, 1], // Spring bounce
              }}
              whileHover={{ scale: 1.08 }}
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
                // Initial emergence glow
                initial={{ 
                  boxShadow: "0 0 0px rgba(255, 255, 255, 0)" 
                }}
                whileInView={{ 
                  boxShadow: [
                    "0 0 0px rgba(255, 255, 255, 0)",
                    "0 0 40px rgba(255, 255, 255, 0.6), 0 8px 24px rgba(0, 0, 0, 0.3)",
                    "0 4px 16px rgba(0, 0, 0, 0.2)",
                  ]
                }}
                viewport={{ once: true }}
                transition={{
                  boxShadow: {
                    duration: 1,
                    delay: nodeDelay + (nodeIndex % 4) * 0.08,
                    times: [0, 0.5, 1],
                  }
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
                  initial={{ opacity: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: nodeDelay + (nodeIndex % 4) * 0.08 + 0.2,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
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