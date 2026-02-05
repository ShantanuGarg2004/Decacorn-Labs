"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ServiceNode } from "./serviceMap";
import { useState, useEffect } from "react";

/**
 * ServicePanel
 * --------------------------------------------------
 * Projects detailed intelligence for the currently
 * active service node.
 *
 * This component is purely reactive:
 * - It renders ONLY when a node is active
 * - It owns presentation + animation only
 * - It does not control state or graph logic
 */
export default function ServicePanel({ node }: { node: ServiceNode | null }) {
  const [displayedText, setDisplayedText] = useState<string[]>([]);

  /* =====================================================
     TYPEWRITER EFFECT (CAPABILITIES)
     ===================================================== */

  useEffect(() => {
    if (!node) {
      setDisplayedText([]);
      return;
    }

    // Reset when active node changes
    setDisplayedText([]);

    const lines = node.capabilities;
    let lineIndex = 0;
    let charIndex = 0;

    const buffer: string[] = new Array(lines.length).fill("");

    const interval = setInterval(() => {
      if (lineIndex >= lines.length) {
        clearInterval(interval);
        return;
      }

      const currentLine = lines[lineIndex];

      if (charIndex < currentLine.length) {
        buffer[lineIndex] = currentLine.slice(0, charIndex + 1);
        setDisplayedText([...buffer]);
        charIndex += 1;
      } else {
        // Move to next line
        lineIndex += 1;
        charIndex = 0;
      }
    }, 12);

    return () => clearInterval(interval);
  }, [node]);

  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <AnimatePresence mode="wait">
      {node && (
        <motion.div
          key={node.id}
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full md:w-[440px] text-left"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            padding: "24px",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* ================= TITLE ================= */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h3
              className="text-2xl md:text-3xl font-semibold mb-2"
              style={{
                color: "rgba(255, 255, 255, 0.95)",
                letterSpacing: "-0.01em",
              }}
            >
              {node.title}
            </h3>
          </motion.div>

          {/* ================= SUBTITLE ================= */}
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-sm md:text-base mb-5 md:mb-6"
            style={{
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            {node.subtitle}
          </motion.p>

          {/* ================= DIVIDER ================= */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              height: "1px",
              background: "rgba(255, 255, 255, 0.1)",
              marginBottom: "20px",
              transformOrigin: "left",
            }}
          />

          {/* ================= CAPABILITIES ================= */}
          <div className="space-y-4 md:space-y-5">
            {node.capabilities.map((_, i) => {
              const text = displayedText[i] || "";
              const isTyping = text.length < node.capabilities[i].length;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: text ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-2 md:gap-3"
                >
                  {/* Bullet */}
                  <div
                    className="mt-1.5 flex-shrink-0"
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.6)",
                    }}
                  />

                  {/* Text */}
                  <p
                    className="text-sm md:text-[15px] leading-relaxed"
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      letterSpacing: "0.01em",
                      lineHeight: "1.7",
                    }}
                  >
                    {text}
                    {text && isTyping && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        style={{
                          color: "rgba(255, 255, 255, 0.6)",
                          marginLeft: "1px",
                        }}
                      >
                        |
                      </motion.span>
                    )}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* ================= TECHNOLOGIES ================= */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 md:mt-8 pt-5 md:pt-6"
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <p
              className="text-xs font-semibold mb-3"
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Technologies
            </p>

            <div className="flex flex-wrap gap-2">
              {node.technologies.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.05, duration: 0.3 }}
                  className="px-2.5 md:px-3 py-1 md:py-1.5 text-xs font-medium rounded-full"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "rgba(255, 255, 255, 0.85)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
