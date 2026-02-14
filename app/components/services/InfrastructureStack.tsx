"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STACK_LAYERS } from "./stackConfig";

/* ─── Dark / Technical Theme Color Palette ─── */
const PALETTE = {
  bg: "#0a0b0e", // deep black background
  layerTop: "#1a1f2e", // dark blue-gray top face
  layerRight: "#14171f", // slightly darker right face
  layerBottom: "#0f1117", // darker bottom face
  layerLeft: "#16191f", // left face
  border: "#2a2f3d",
  circuitPattern: "#252a38",
  chipBg: "#1e2432", // chip rectangles
  chipBorder: "#2d3446",
  icBg: "#243447", // integrated circuit area (blue tint)
  pinColor: "#4a90e2", // blue electrical pins
  labelColor: "#e5e7eb", // light label text
  lineColor: "#6b7280", // leader line color
  accentBlue: "#3b82f6",
  accentPurple: "#8b5cf6",
  accentPink: "#ec4899",
  accentCyan: "#22d3ee",
};

export default function InfrastructureStack() {
  const [stackState, setStackState] = useState<"compressed" | "expanded" | "content">("compressed");
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleChipHover = () => {
    if (stackState === "compressed") {
      setStackState("expanded");
      setIsHovering(true);
    }
  };

  const handleChipLeave = () => {
    if (stackState === "expanded" && !activeLayer) {
      setStackState("compressed");
      setIsHovering(false);
    }
  };

  const handleLayerClick = (layerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveLayer(layerId);
    setStackState("content");
  };

  const handleClose = () => {
    setActiveLayer(null);
    setStackState("compressed");
    setIsHovering(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    if (stackState !== "compressed") {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [stackState]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("stackHoverChange", { detail: { isHovering } })
    );
  }, [isHovering]);

  const activeLayerData = STACK_LAYERS.find((l) => l.id === activeLayer);
  const isExpanded = stackState === "expanded";
  const isContent = stackState === "content";

  return (
    <motion.div
      ref={containerRef}
      className="w-full max-w-7xl mx-auto flex items-center justify-center"
      animate={{
        paddingTop: isExpanded ? "12rem" : "0rem",
        paddingBottom: isExpanded ? "6rem" : "2rem",
        minHeight: isExpanded ? "800px" : "450px",
      }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="flex items-center justify-center gap-12 w-full">
        {/* ─── 3D Stack Wrapper ─── */}
        <motion.div
          className="relative flex-shrink-0"
          animate={{
            scale: isContent ? 0.55 : 1,
            x: isContent ? -100 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* The 3D perspective container */}
          <div
            className="relative"
            onMouseEnter={handleChipHover}
            onMouseLeave={handleChipLeave}
            style={{ perspective: "1800px" }}
          >
            {/* 3D scene – rotated isometrically */}
            <div
              className="relative"
              style={{
                width: "340px",
                height: "560px",
                transformStyle: "preserve-3d",
                transform: "rotateX(55deg) rotateZ(-45deg)",
              }}
            >
              {STACK_LAYERS.map((layer, index) => (
                <ChipsetLayer
                  key={layer.id}
                  layer={layer}
                  index={index}
                  total={STACK_LAYERS.length}
                  stackState={stackState}
                  isActive={activeLayer === layer.id}
                  onClick={(e) => handleLayerClick(layer.id, e)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ─── Content panel ─── */}
        <AnimatePresence>
          {isContent && activeLayerData && (
            <ContentDisplay layer={activeLayerData} onClose={handleClose} />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   CHIPSET LAYER – individual 3D layer with side faces
   ═══════════════════════════════════════════════════════ */

interface ChipsetLayerProps {
  layer: typeof STACK_LAYERS[0];
  index: number;
  total: number;
  stackState: "compressed" | "expanded" | "content";
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
}

function ChipsetLayer({ layer, index, total, stackState, isActive, onClick }: ChipsetLayerProps) {
  const isCompressed = stackState === "compressed";
  const isExpanded = stackState === "expanded";

  /* compressed: thin slab stack */
  const compressedY = index * 6;
  const compressedZ = index * 12;

  /* expanded: even vertical spread (adapted for 4 layers) */
  const layerSpacing = 140;
  const expandedY = 0;
  const expandedZ = index * layerSpacing;

  const depth = 28; // slab thickness in px

  // Layer accent colors
  const accentColors = [
    PALETTE.accentBlue,
    PALETTE.accentPurple,
    PALETTE.accentPink,
    PALETTE.accentCyan,
  ];

  return (
    <motion.div
      className="absolute inset-0 pointer-events-auto"
      style={{
        transformStyle: "preserve-3d",
        zIndex: index,
      }}
      animate={{
        y: isCompressed ? compressedY : expandedY,
        z: isCompressed ? compressedZ : expandedZ,
        opacity: isActive && stackState === "content" ? 0.5 : 1,
      }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.button
        className="relative w-full h-full cursor-pointer pointer-events-auto"
        onClick={onClick}
        whileHover={{ scale: isExpanded ? 1.05 : 1.01 }}
        transition={{ duration: 0.25 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ── TOP FACE ── */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            backgroundColor: isExpanded ? PALETTE.layerTop : "#12151a",
            border: `1.5px solid ${isExpanded ? `${accentColors[index]}55` : PALETTE.border}`,
            borderRadius: "4px",
            transform: `translateZ(${depth}px)`,
            transformStyle: "preserve-3d",
            boxShadow: isExpanded
              ? `0 20px 60px rgba(0,0,0,0.8), 0 0 40px ${accentColors[index]}44, inset 0 1px 0 rgba(255,255,255,0.08)`
              : `0 8px 25px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}
        >
          <LayerContent layerId={layer.id} isExpanded={isExpanded} />

          {/* Corner brackets */}
          <div
            className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 transition-all duration-300"
            style={{
              borderColor: isExpanded
                ? `${accentColors[index]}cc`
                : "rgba(255,255,255,0.2)",
            }}
          />
          <div
            className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 transition-all duration-300"
            style={{
              borderColor: isExpanded
                ? `${accentColors[index]}cc`
                : "rgba(255,255,255,0.2)",
            }}
          />
          <div
            className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 transition-all duration-300"
            style={{
              borderColor: isExpanded
                ? `${accentColors[index]}cc`
                : "rgba(255,255,255,0.2)",
            }}
          />
          <div
            className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 transition-all duration-300"
            style={{
              borderColor: isExpanded
                ? `${accentColors[index]}cc`
                : "rgba(255,255,255,0.2)",
            }}
          />
          
          {/* Layer number indicator - shows when expanded */}
          {isExpanded && (
            <motion.div
              className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-mono"
              style={{
                backgroundColor: `${accentColors[index]}20`,
                border: `1px solid ${accentColors[index]}60`,
                color: accentColors[index],
                boxShadow: `0 0 15px ${accentColors[index]}30`,
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              {layer.title}
            </motion.div>
          )}
        </div>

        {/* ── BOTTOM FACE ── */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "100%",
            backgroundColor: PALETTE.layerBottom,
            border: `1.5px solid ${PALETTE.border}`,
            borderRadius: "4px",
          }}
        />

        {/* ── FRONT FACE (bottom edge in isometric view) ── */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: `${depth}px`,
            backgroundColor: PALETTE.layerRight,
            borderLeft: `1.5px solid ${PALETTE.border}`,
            borderRight: `1.5px solid ${PALETTE.border}`,
            borderBottom: `1.5px solid ${PALETTE.border}`,
            transform: `rotateX(-90deg) translateZ(0px)`,
            transformOrigin: "bottom",
            boxShadow: isExpanded
              ? `0 0 30px ${accentColors[index]}55`
              : "none",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.02), transparent)",
            }}
          />
        </div>

        {/* ── RIGHT FACE ── */}
        <div
          className="absolute top-0 right-0 bottom-0"
          style={{
            width: `${depth}px`,
            backgroundColor: PALETTE.layerRight,
            borderTop: `1.5px solid ${PALETTE.border}`,
            borderRight: `1.5px solid ${PALETTE.border}`,
            borderBottom: `1.5px solid ${PALETTE.border}`,
            transform: `rotateY(90deg) translateZ(0px)`,
            transformOrigin: "right",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.02), transparent)",
            }}
          />
        </div>

        {/* ── LEFT FACE ── */}
        <div
          className="absolute top-0 left-0 bottom-0"
          style={{
            width: `${depth}px`,
            backgroundColor: PALETTE.layerLeft,
            borderTop: `1.5px solid ${PALETTE.border}`,
            borderLeft: `1.5px solid ${PALETTE.border}`,
            borderBottom: `1.5px solid ${PALETTE.border}`,
            transform: `rotateY(-90deg) translateZ(0px)`,
            transformOrigin: "left",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to left, rgba(255,255,255,0.02), transparent)",
            }}
          />
        </div>

        {/* ── ELECTRICAL PINS (for layers 1 & 2 - Data and Intelligence) ── */}
        {(layer.id === "data" || layer.id === "intelligence") && isExpanded && (
          <ElectricalPins depth={depth} accentColor={accentColors[index]} />
        )}
      </motion.button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   LAYER CONTENT – unique visual per layer type
   ═══════════════════════════════════════════════════════ */

interface LayerContentProps {
  layerId: string;
  isExpanded: boolean;
}

function LayerContent({ layerId, isExpanded }: LayerContentProps) {
  if (layerId === "deployment") {
    /* Grid pattern for deployment/orchestration layer (top) */
    return (
      <div
        className="absolute inset-3 overflow-hidden"
        style={{ borderRadius: "2px" }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(${PALETTE.circuitPattern} 1.5px, transparent 1.5px),
              linear-gradient(90deg, ${PALETTE.circuitPattern} 1.5px, transparent 1.5px)
            `,
            backgroundSize: "20px 20px",
            backgroundColor: PALETTE.layerTop,
            opacity: isExpanded ? 0.9 : 0.7,
          }}
        />
      </div>
    );
  }

  if (layerId === "intelligence") {
    /* ML/AI chips for intelligence layer */
    return (
      <div className="absolute inset-4 flex gap-3">
        {/* Left half - chip rectangles with pins */}
        <div className="flex-1 grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative rounded-sm"
              style={{
                backgroundColor: PALETTE.chipBg,
                border: `1px solid ${PALETTE.chipBorder}`,
              }}
            >
              {/* GPU core representation */}
              <div
                className="absolute inset-1 grid grid-cols-2 gap-0.5"
                style={{ opacity: 0.4 }}
              >
                {[0, 1, 2, 3].map((j) => (
                  <div
                    key={j}
                    style={{
                      backgroundColor: PALETTE.accentPink,
                      borderRadius: "1px",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Right portion - integrated circuit area */}
        <div
          className="w-2/5 rounded-sm"
          style={{
            backgroundColor: PALETTE.icBg,
            border: `1px solid ${PALETTE.border}`,
          }}
        />
      </div>
    );
  }

  if (layerId === "data") {
    /* Storage modules for data layer */
    return (
      <div className="absolute inset-4 grid grid-cols-3 gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="relative rounded-sm flex items-center justify-center"
            style={{
              backgroundColor: PALETTE.chipBg,
              border: `1px solid ${PALETTE.chipBorder}`,
            }}
          >
            {/* Storage indicator */}
            <div
              className="w-4/5 h-1 rounded-full"
              style={{ backgroundColor: "rgba(139, 92, 246, 0.4)" }}
            />
          </div>
        ))}
      </div>
    );
  }

  /* Integration layer - API gateway representation */
  return (
    <div className="absolute inset-4 grid grid-cols-2 gap-3">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="relative rounded-sm"
          style={{
            backgroundColor: PALETTE.chipBg,
            border: `1px solid ${PALETTE.chipBorder}`,
          }}
        >
          {/* Gateway ports */}
          <div className="absolute inset-2 flex flex-col gap-1">
            {[0, 1, 2].map((j) => (
              <div
                key={j}
                className="h-1 rounded-full"
                style={{ backgroundColor: "rgba(59, 130, 246, 0.4)" }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ELECTRICAL PINS – vertical connectors
   ═══════════════════════════════════════════════════════ */

interface ElectricalPinsProps {
  depth: number;
  accentColor: string;
}

function ElectricalPins({ depth, accentColor }: ElectricalPinsProps) {
  const pinPositions = [
    { left: "18%", top: "25%" },
    { left: "18%", top: "50%" },
    { left: "18%", top: "75%" },
    { left: "35%", top: "25%" },
    { left: "35%", top: "50%" },
    { left: "35%", top: "75%" },
    { left: "55%", top: "30%" },
    { left: "55%", top: "60%" },
    { left: "72%", top: "30%" },
    { left: "72%", top: "60%" },
  ];

  const pinHeight = 90;

  return (
    <>
      {pinPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: pos.left,
            top: pos.top,
            width: "3px",
            height: `${pinHeight}px`,
            backgroundColor: accentColor,
            transform: `translateZ(${depth + 1}px)`,
            transformStyle: "preserve-3d",
            borderRadius: "1px",
            boxShadow: `0 0 4px ${accentColor}66`,
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.03 }}
        />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTENT DISPLAY PANEL
   ═══════════════════════════════════════════════════════ */

interface ContentDisplayProps {
  layer: typeof STACK_LAYERS[0];
  onClose: () => void;
}

function ContentDisplay({ layer, onClose }: ContentDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative w-full max-w-2xl flex-shrink-0"
    >
      <div
        className="relative rounded-xl border overflow-hidden"
        style={{
          backgroundColor: "#0f1419",
          borderColor: "rgba(255, 255, 255, 0.15)",
          boxShadow:
            "0 25px 80px rgba(0,0,0,0.9), 0 0 80px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Circuit pattern background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 48%, rgba(255, 255, 255, 0.1) 48%, rgba(255, 255, 255, 0.1) 52%, transparent 52%),
              linear-gradient(0deg, transparent 48%, rgba(255, 255, 255, 0.1) 48%, rgba(255, 255, 255, 0.1) 52%, transparent 52%)
            `,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative p-10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-lg transition-colors group z-10"
            style={{ color: PALETTE.labelColor }}
            aria-label="Close"
          >
            <svg
              className="w-5 h-5 group-hover:opacity-70 transition-opacity"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mb-8">
            <div
              className="text-xs font-mono uppercase tracking-widest mb-2"
              style={{ color: "#6b7280" }}
            >
              {layer.subtitle}
            </div>
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: "#f9fafb" }}
            >
              {layer.title}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>
              {layer.description}
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3
                className="text-xs font-mono uppercase tracking-wider mb-4"
                style={{ color: "#6b7280" }}
              >
                Key Capabilities
              </h3>
              <ul className="space-y-3">
                {layer.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-2 flex-shrink-0">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: "#60a5fa" }}
                      />
                    </div>
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: "#d1d5db" }}
                    >
                      {cap}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className="text-xs font-mono uppercase tracking-wider mb-4"
                style={{ color: "#6b7280" }}
              >
                Core Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {layer.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-xs font-mono rounded border"
                    style={{
                      backgroundColor: "rgba(59, 130, 246, 0.05)",
                      borderColor: "rgba(59, 130, 246, 0.2)",
                      color: "#93c5fd",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Corner brackets */}
        <div
          className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2"
          style={{ borderColor: "rgba(59, 130, 246, 0.5)" }}
        />
        <div
          className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2"
          style={{ borderColor: "rgba(59, 130, 246, 0.5)" }}
        />
        <div
          className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2"
          style={{ borderColor: "rgba(59, 130, 246, 0.5)" }}
        />
        <div
          className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2"
          style={{ borderColor: "rgba(59, 130, 246, 0.5)" }}
        />
      </div>
    </motion.div>
  );
}