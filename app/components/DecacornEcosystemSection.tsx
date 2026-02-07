"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// ─── Circuit-board trace paths (SVG polyline points, percentage-based) ───
const TRACES = [
  // Top-left cluster
  "5,8 18,8 18,18 32,18 32,28",
  "5,14 12,14 12,22 22,22 22,35 38,35",
  "8,30 20,30 20,42 30,42 30,52",
  // Right-side cluster
  "95,10 82,10 82,20 70,20 70,32",
  "92,22 78,22 78,34 65,34 65,45",
  "88,40 75,40 75,50 60,50",
  // Bottom traces
  "10,78 22,78 22,88 35,88 35,95",
  "90,75 78,75 78,85 68,85 68,92",
  "40,90 52,90 52,82 62,82",
  // Mid cross
  "35,55 48,55 48,45 58,45 58,62",
  "20,65 33,65 33,72 45,72",
  "75,60 62,60 62,70 50,70 50,78",
];

// IC pad positions (x%, y%) – the square landing pads at trace ends
const IC_PADS = [
  { x: 32, y: 28 }, { x: 38, y: 35 }, { x: 30, y: 52 },
  { x: 70, y: 32 }, { x: 65, y: 45 }, { x: 60, y: 50 },
  { x: 35, y: 95 }, { x: 68, y: 92 }, { x: 62, y: 82 },
  { x: 58, y: 62 }, { x: 45, y: 72 }, { x: 50, y: 78 },
];

export default function DecacornEcosystemSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 border-t border-neutral-800 overflow-hidden bg-black"
    >
      {/* ── CIRCUIT-BOARD BACKGROUND ── */}
      <div className="absolute inset-0 overflow-hidden">

        {/* 1. Fine diagonal cross-hatch – gives a PCB feel */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255,255,255,0.045) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255,255,255,0.045) 1px, transparent 1px)
            `,
            backgroundSize: "52px 52px",
            opacity: 0.7,
          }}
        />

        {/* 2. SVG: Circuit traces + IC pads + animated signal dots */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="traceGlowEco" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(99,102,241,0)" />
              <stop offset="40%" stopColor="rgba(99,102,241,0.55)" />
              <stop offset="60%" stopColor="rgba(168,85,247,0.55)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0)" />
            </linearGradient>
            <filter id="padGlowEco" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="signalGlowEco" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Trace polylines – staggered fade-in */}
          {TRACES.map((d, i) => {
            const points = d.split(" ").map((pair) => {
              const [x, y] = pair.split(",");
              return `${x}% ${y}%`;
            }).join(", ");
            return (
              <motion.polyline
                key={`tr-${i}`}
                points={points}
                fill="none"
                stroke="url(#traceGlowEco)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0.45] }}
                transition={{
                  duration: 2.2,
                  delay: 0.2 + i * 0.13,
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* IC Pads – glowing squares */}
          {IC_PADS.map((pad, i) => (
            <motion.rect
              key={`pad-${i}`}
              x={`calc(${pad.x}% - 5px)`}
              y={`calc(${pad.y}% - 5px)`}
              width="10"
              height="10"
              rx="2"
              fill={i % 2 === 0 ? "rgba(99,102,241,0.7)" : "rgba(168,85,247,0.7)"}
              filter="url(#padGlowEco)"
              style={{ transformOrigin: `${pad.x}% ${pad.y}%` }}
              animate={{
                opacity: [0.4, 0.9, 0.4],
                scale: [0.85, 1.1, 0.85],
              }}
              transition={{
                duration: 2.6,
                delay: (i * 0.22) % 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Signal pulse dots – travel along select traces */}
          {[0, 3, 6, 9].map((traceIdx) => {
            const coords = TRACES[traceIdx].split(" ").map((pair) => {
              const [x, y] = pair.split(",");
              return { x: Number(x), y: Number(y) };
            });
            const start = coords[0];
            const end = coords[coords.length - 1];
            return (
              <motion.circle
                key={`sig-${traceIdx}`}
                r="3"
                fill="rgba(255,255,255,0.85)"
                filter="url(#signalGlowEco)"
                animate={{
                  cx: [`${start.x}%`, `${end.x}%`],
                  cy: [`${start.y}%`, `${end.y}%`],
                  opacity: [0.9, 0.9, 0],
                }}
                transition={{
                  duration: 2.8,
                  delay: traceIdx * 0.55,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </svg>

        {/* 3. Dual orbs – indigo + magenta */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "15%", left: "12%",
            width: "420px", height: "420px",
            background: "radial-gradient(circle, rgba(99,102,241,0.42) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.14, 1], x: [0, 22, 0], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            bottom: "10%", right: "8%",
            width: "380px", height: "380px",
            background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
            filter: "blur(75px)",
          }}
          animate={{ scale: [1, 1.16, 1], y: [0, -20, 0], opacity: [0.55, 0.8, 0.55] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Subtle centre accent */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "40%", left: "42%",
            width: "280px", height: "280px",
            background: "radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 4. Floating micro-particles */}
        {[...Array(24)].map((_, i) => {
          const colors = ["rgba(99,102,241,0.7)", "rgba(168,85,247,0.65)", "rgba(56,189,248,0.6)"];
          return (
            <motion.div
              key={`pfp-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${1.2 + (i % 3) * 0.8}px`,
                height: `${1.2 + (i % 3) * 0.8}px`,
                left: `${(i * 43 + 2) % 100}%`,
                top: `${(i * 37 + 5) % 100}%`,
                background: colors[i % 3],
              }}
              animate={{
                y: [0, -(22 + (i % 22)), 0],
                x: [0, (i % 2 === 0 ? 10 : -10), 0],
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: (i * 0.21) % 3,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* 5. Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, transparent 18%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2
          className={`text-3xl font-semibold text-white mb-6 transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Decacorn Ecosystem
        </h2>

        <p
          className={`text-neutral-400 max-w-2xl leading-relaxed transition-all duration-700 delay-150 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Decacorn Labs builds interconnected AI systems that guide individuals,
          teams, and organizations from intelligence to execution.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "Guidance Layer",
              desc: "AI systems that help users make informed decisions.",
            },
            {
              title: "Execution Layer",
              desc: "Automated workflows and project execution engines.",
            },
            {
              title: "Infrastructure Layer",
              desc: "Scalable AI and software infrastructure powering products.",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm
              transition-all duration-700 ease-out transform
              hover:-translate-y-2 hover:scale-[1.02] hover:border-neutral-600 hover:bg-neutral-900/60
              ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${300 + index * 150}ms`,
              }}
            >
              <h3 className="text-white font-medium mb-2">{item.title}</h3>
              <p className="text-neutral-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div
          className={`mt-14 transition-all duration-700 delay-[700ms]
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <Link
            href="/methodology"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neutral-700 text-white text-sm font-medium 
            bg-neutral-900/40 hover:bg-neutral-800/60 hover:border-neutral-500 transition-all duration-300"
          >
            Explore Our Execution Methodology
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}