"use client";

import { motion } from "framer-motion";
import { nodes, edges, ServiceNode } from "./serviceMap";
import { useMemo } from "react";

type Props = {
  activeNode: ServiceNode | null;
  setActiveNode: (n: ServiceNode | null) => void;
};

export default function NeuralMatrix({ activeNode, setActiveNode }: Props) {
  /* =====================================================
     GRAPH DERIVED STATE
     ===================================================== */

  const nodeById = useMemo(() => {
    const map = new Map<string, ServiceNode>();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  const activeEdges = useMemo(() => {
    if (!activeNode) return [];
    return [...edges.inputToHidden, ...edges.hiddenToOutput].filter(
      (e) => e.from === activeNode.id || e.to === activeNode.id
    );
  }, [activeNode]);

  /* =====================================================
     ANIMATION TIMING
     ===================================================== */

  const TIMING = {
    INPUT_LAYER_START: 0.3,
    INPUT_LAYER_STAGGER: 0.12,
    HIDDEN_LAYER_START: 0.9,
    HIDDEN_LAYER_STAGGER: 0.1,
    OUTPUT_LAYER_START: 1.6,
    OUTPUT_LAYER_STAGGER: 0.15,

    INPUT_TO_HIDDEN_START: 1.1,
    INPUT_TO_HIDDEN_STAGGER: 0.015,
    HIDDEN_TO_OUTPUT_START: 1.8,
    HIDDEN_TO_OUTPUT_STAGGER: 0.02,

    NODE_DURATION: 0.7,
    CONNECTION_DURATION: 0.6,
  };

  const getNodeTiming = (node: ServiceNode) => {
    const layerNodes = nodes.filter((n) => n.layer === node.layer);
    const indexInLayer = layerNodes.findIndex((n) => n.id === node.id);

    if (node.layer === "input") {
      return {
        delay: TIMING.INPUT_LAYER_START + indexInLayer * TIMING.INPUT_LAYER_STAGGER,
        duration: TIMING.NODE_DURATION,
      };
    }

    if (node.layer === "hidden") {
      return {
        delay: TIMING.HIDDEN_LAYER_START + indexInLayer * TIMING.HIDDEN_LAYER_STAGGER,
        duration: TIMING.NODE_DURATION,
      };
    }

    return {
      delay: TIMING.OUTPUT_LAYER_START + indexInLayer * TIMING.OUTPUT_LAYER_STAGGER,
      duration: TIMING.NODE_DURATION,
    };
  };

  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <motion.div
      className="relative w-full mx-auto flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={() => setActiveNode(null)}
      animate={{
        width: activeNode
          ? typeof window !== "undefined" && window.innerWidth < 768
            ? "100%"
            : "600px"
          : typeof window !== "undefined" && window.innerWidth < 768
          ? "100%"
          : "900px",
        height: activeNode
          ? typeof window !== "undefined" && window.innerWidth < 768
            ? "300px"
            : "400px"
          : typeof window !== "undefined" && window.innerWidth < 768
          ? "400px"
          : "500px",
        scale:
          activeNode &&
          typeof window !== "undefined" &&
          window.innerWidth >= 768
            ? 0.9
            : 1,
      }}
      style={{
        transition: "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
        maxWidth: "100%",
      }}
    >
      {/* =================================================
          CLICK PROMPT (ONLY WHEN NO NODE IS ACTIVE)
         ================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: activeNode ? 0 : 1,
          y: activeNode ? 20 : 0,
        }}
        transition={{
          opacity: { duration: 0.4 },
          y: { duration: 0.4 },
          delay: activeNode ? 0 : 2.4,
        }}
        className="absolute -bottom-12 md:-bottom-16 left-1/2 -translate-x-1/2 pointer-events-none z-50"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
            }}
          />

          <span
            className="text-xs md:text-sm font-medium tracking-wide"
            style={{ color: "rgba(255, 255, 255, 0.85)" }}
          >
            Click any node to explore
          </span>

          <motion.svg
            width="16"
            height="16"
            className="md:w-5 md:h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </motion.svg>
        </motion.div>
      </motion.div>

      <div className="relative w-full h-full">
        {/* =================================================
            CONNECTIONS
           ================================================= */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {[...edges.inputToHidden, ...edges.hiddenToOutput].map((edge, i) => {
            const from = nodeById.get(edge.from)!;
            const to = nodeById.get(edge.to)!;
            const isActive = activeEdges.some(
              (e) => e.from === edge.from && e.to === edge.to
            );

            const isInputEdge = edges.inputToHidden.includes(edge);
            const baseDelay = isInputEdge
              ? TIMING.INPUT_TO_HIDDEN_START
              : TIMING.HIDDEN_TO_OUTPUT_START;
            const stagger = isInputEdge
              ? TIMING.INPUT_TO_HIDDEN_STAGGER
              : TIMING.HIDDEN_TO_OUTPUT_STAGGER;

            return (
              <g key={`${edge.from}-${edge.to}`}>
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
                    pathLength: {
                      duration: TIMING.CONNECTION_DURATION,
                      delay: baseDelay + i * stagger,
                      ease: "easeOut",
                    },
                    opacity: {
                      duration: 0.2,
                      delay: baseDelay + i * stagger,
                    },
                  }}
                />

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

        {/* =================================================
            NODES
           ================================================= */}
        {nodes.map((node) => {
          const Icon = node.icon;
          const isActiveNode = activeNode?.id === node.id;
          const timing = getNodeTiming(node);

          return (
            <motion.div
              key={node.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveNode(node);
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: timing.duration,
                delay: timing.delay,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: isActiveNode
                    ? "2px solid rgba(255, 255, 255, 0.5)"
                    : "1.5px solid rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                }}
                animate={{
                  width: activeNode
                    ? typeof window !== "undefined" && window.innerWidth < 768
                      ? "48px"
                      : "64px"
                    : typeof window !== "undefined" && window.innerWidth < 768
                    ? "56px"
                    : "80px",
                  height: activeNode
                    ? typeof window !== "undefined" && window.innerWidth < 768
                      ? "48px"
                      : "64px"
                    : typeof window !== "undefined" && window.innerWidth < 768
                    ? "56px"
                    : "80px",
                }}
                transition={{
                  width: { duration: 0.6 },
                  height: { duration: 0.6 },
                }}
              >
                <Icon
                  size={
                    activeNode
                      ? typeof window !== "undefined" && window.innerWidth < 768
                        ? 20
                        : 28
                      : typeof window !== "undefined" && window.innerWidth < 768
                      ? 24
                      : 32
                  }
                  strokeWidth={1.5}
                  style={{
                    color: isActiveNode
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(255,255,255,0.75)",
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
