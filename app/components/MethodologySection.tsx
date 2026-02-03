"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out
      ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Pipeline lane definitions ───
// Each lane: y position (%), label colour theme
const LANES = [
  { y: 12, color: "rgba(99,102,241,0.45)" },   // indigo
  { y: 24, color: "rgba(59,130,246,0.4)" },     // blue
  { y: 36, color: "rgba(99,102,241,0.35)" },
  { y: 48, color: "rgba(56,189,248,0.38)" },    // sky
  { y: 60, color: "rgba(59,130,246,0.4)" },
  { y: 72, color: "rgba(99,102,241,0.42)" },
  { y: 84, color: "rgba(56,189,248,0.35)" },
];

// Decision / checkpoint nodes along the pipeline (x%, y%, which lane)
const CHECKPOINTS = [
  { x: 15, y: 12 }, { x: 40, y: 12 }, { x: 70, y: 12 },
  { x: 25, y: 24 }, { x: 55, y: 24 }, { x: 80, y: 24 },
  { x: 10, y: 36 }, { x: 45, y: 36 }, { x: 75, y: 36 },
  { x: 20, y: 48 }, { x: 50, y: 48 }, { x: 85, y: 48 },
  { x: 15, y: 60 }, { x: 60, y: 60 }, { x: 78, y: 60 },
  { x: 30, y: 72 }, { x: 65, y: 72 },
  { x: 18, y: 84 }, { x: 50, y: 84 }, { x: 82, y: 84 },
];

// Vertical "branch" connectors between lanes (x%, fromY%, toY%)
const BRANCHES: [number, number, number][] = [
  [40, 12, 24], [55, 24, 36], [45, 36, 48],
  [50, 48, 60], [60, 60, 72], [50, 72, 84],
  [70, 12, 36], [80, 24, 48], [75, 36, 60],
];

export default function MethodologySection() {
  return (
    <section className="relative w-full py-28 border-t border-neutral-800 overflow-hidden bg-black">
      {/* ─── PIPELINE-FLOW BACKGROUND ─── */}
      <div className="absolute inset-0 overflow-hidden">

        {/* 1. Dot-grid base */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            opacity: 0.55,
          }}
        />

        {/* 2. Horizontal pipeline lane lines + dashes */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
          <defs>
            <linearGradient id="laneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(99,102,241,0)" />
              <stop offset="15%" stopColor="rgba(99,102,241,0.5)" />
              <stop offset="85%" stopColor="rgba(59,130,246,0.5)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </linearGradient>
          </defs>

          {LANES.map((lane, i) => (
            <g key={`lane-${i}`}>
              {/* Solid lane rail */}
              <line
                x1="0%"
                y1={`${lane.y}%`}
                x2="100%"
                y2={`${lane.y}%`}
                stroke="url(#laneGrad)"
                strokeWidth="1"
                opacity="0.6"
              />
              {/* Animated dashed overlay – "data flowing" */}
              <motion.line
                x1="0%"
                y1={`${lane.y}%`}
                x2="100%"
                y2={`${lane.y}%`}
                stroke={lane.color}
                strokeWidth="1.5"
                strokeDasharray="12 8"
                animate={{ strokeDashoffset: [-20, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
            </g>
          ))}

          {/* Vertical branch connectors */}
          {BRANCHES.map(([x, fromY, toY], i) => (
            <motion.line
              key={`br-${i}`}
              x1={`${x}%`}
              y1={`${fromY}%`}
              x2={`${x}%`}
              y2={`${toY}%`}
              stroke="rgba(99,102,241,0.4)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.55, 0.3] }}
              transition={{ duration: 2, delay: 0.6 + i * 0.12, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            />
          ))}

          {/* Checkpoint diamond nodes */}
          {CHECKPOINTS.map((cp, i) => (
            <motion.rect
              key={`cp-${i}`}
              x={`calc(${cp.x}% - 4px)`}
              y={`calc(${cp.y}% - 4px)`}
              width="8"
              height="8"
              rx="1.5"
              fill="rgba(99,102,241,0.6)"
              transform={`rotate(45, ${cp.x * 10}, ${cp.y * 10})`}
              style={{
                transformOrigin: `${cp.x}% ${cp.y}%`,
              }}
              animate={{
                opacity: [0.3, 0.85, 0.3],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{
                duration: 2.4,
                delay: (i * 0.17) % 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>

        {/* 3. Animated "data pulse" circles that travel left → right on each lane */}
        {LANES.map((lane, i) => (
          <motion.div
            key={`pulse-${i}`}
            className="absolute rounded-full"
            style={{
              width: "8px",
              height: "8px",
              top: `${lane.y}%`,
              background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(99,102,241,0.6) 60%, transparent 100%)",
              filter: "blur(1px)",
              boxShadow: "0 0 8px 3px rgba(99,102,241,0.35)",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              left: ["-2%", "102%"],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: 4.5,
              delay: i * 0.7,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: "linear",
            }}
          />
        ))}

        {/* 4. Gradient orbs – indigo + blue tones */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "8%", left: "15%",
            width: "380px", height: "380px",
            background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
            filter: "blur(75px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.55, 0.8, 0.55] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            bottom: "12%", right: "10%",
            width: "340px", height: "340px",
            background: "radial-gradient(circle, rgba(56,189,248,0.35) 0%, transparent 70%)",
            filter: "blur(65px)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "45%", right: "5%",
            width: "260px", height: "260px",
            background: "radial-gradient(circle, rgba(59,130,246,0.32) 0%, transparent 70%)",
            filter: "blur(55px)",
          }}
          animate={{ scale: [1, 1.18, 1], y: [0, -18, 0], opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 5. Floating particles */}
        {[...Array(20)].map((_, i) => {
          const colors = ["rgba(99,102,241,0.7)", "rgba(59,130,246,0.65)", "rgba(56,189,248,0.6)"];
          return (
            <motion.div
              key={`mfp-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${1.3 + (i % 3) * 0.7}px`,
                height: `${1.3 + (i % 3) * 0.7}px`,
                left: `${(i * 47 + 3) % 100}%`,
                top: `${(i * 31 + 8) % 100}%`,
                background: colors[i % 3],
              }}
              animate={{
                y: [0, -(18 + (i % 18)), 0],
                x: [0, (i % 2 === 0 ? 8 : -8), 0],
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3.2 + (i % 3),
                repeat: Infinity,
                delay: (i * 0.2) % 2.5,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* 6. Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 40%, transparent 22%, rgba(0,0,0,0.52) 68%, rgba(0,0,0,0.84) 100%)",
          }}
        />
      </div>

      {/* ─── CONTENT (unchanged) ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-semibold text-white max-w-3xl">
            Execution Intelligence Framework
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-6 text-neutral-400 max-w-2xl text-lg leading-relaxed">
            Decacorn operates a hybrid execution system that dynamically selects
            the optimal methodology based on task complexity, risk, and impact –
            ensuring precision, flexibility, and scalable delivery.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-16 p-8 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm">
            <p className="text-sm text-neutral-400 mb-4">
              Decacorn Execution Core
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {["Waterfall", "Waterfall + Feedback", "Prototyping", "Agile Engine"].map(
                (item) => (
                  <div
                    key={item}
                    className="p-4 rounded-lg border border-neutral-800 bg-black/40 text-center hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </Reveal>

        <div className="mt-24 grid md:grid-cols-2 gap-16">
          <Reveal>
            <h3 className="text-3xl font-semibold text-white">
              Why Hybrid Execution?
            </h3>
            <p className="mt-4 text-neutral-400 leading-relaxed">
              Traditional teams rely on a single methodology for all tasks,
              creating rigidity and inefficiency. Decacorn applies an adaptive
              execution model – selecting the right methodology for the right problem.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="space-y-4">
              {[
                ["Traditional Approach", "Single rigid methodology"],
                ["Decacorn Approach", "Adaptive methodology orchestration"],
                ["Traditional Risk", "High mismatch and rework"],
                ["Decacorn Outcome", "Precision-driven delivery"],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/30 hover:border-neutral-600 transition-all backdrop-blur-sm"
                >
                  <p className="text-white text-sm font-medium">{title}</p>
                  <p className="text-neutral-400 text-sm mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-28">
          <Reveal>
            <h3 className="text-3xl font-semibold text-white">
              Methodology Selection Engine
            </h3>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-12 grid md:grid-cols-3 gap-6 text-sm">
              {[
                {
                  title: "Frontend-Only Updates",
                  method: "Classic Waterfall",
                },
                {
                  title: "Backend Non-Functional Updates",
                  method: "Waterfall with Feedback",
                },
                {
                  title: "Functional Feature Changes",
                  method: "Prototyping Model",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300 backdrop-blur-sm"
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="mt-2 text-neutral-400">→ {item.method}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-28 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Classic Waterfall",
              flow: "Requirements → Design → Development → Testing → Deployment",
            },
            {
              title: "Waterfall with Feedback",
              flow:
                "Analysis → Implementation → Testing → Feedback → Refinement → Deployment",
            },
            {
              title: "Prototyping Model",
              flow:
                "Understanding → Prototype → Feedback → Iteration → Final Build",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 150}>
              <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300 backdrop-blur-sm">
                <h4 className="text-white font-medium">{item.title}</h4>
                <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                  {item.flow}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-28">
          <Reveal>
            <h3 className="text-3xl font-semibold text-white">
              Execution Impact Matrix
            </h3>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12 grid md:grid-cols-2 gap-6 text-sm">
              {[
                ["Rigid planning", "Adaptive orchestration"],
                ["Delayed feedback", "Continuous validation"],
                ["High rework", "Reduced execution risk"],
                ["Generic delivery", "Outcome-driven execution"],
              ].map(([oldWay, newWay]) => (
                <div
                  key={oldWay}
                  className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 flex justify-between hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="text-neutral-400">{oldWay}</span>
                  <span className="text-white">→ {newWay}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={400}>
            <p className="mt-16 text-neutral-400 max-w-2xl text-lg">
              Decacorn does not merely manage tasks – it orchestrates execution
              intelligence across systems, teams, and outcomes.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}