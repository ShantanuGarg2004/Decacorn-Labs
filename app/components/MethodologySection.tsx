"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Droplets, RefreshCw, Palette, Zap, Target, Sparkles, RotateCw, Rocket, Paintbrush, Settings, Microscope } from "lucide-react";

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

// Interactive card with 3D tilt effect
function TiltCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

// Animated methodology flow component
function MethodologyFlow({ steps, color }: { steps: string[]; color: string }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <motion.div
            className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap"
            animate={{
              backgroundColor: activeStep === idx ? color : "rgba(38,38,38,0.6)",
              scale: activeStep === idx ? 1.05 : 1,
              color: activeStep === idx ? "#ffffff" : "#a3a3a3",
            }}
            transition={{ duration: 0.3 }}
          >
            {step}
          </motion.div>
          {idx < steps.length - 1 && (
            <motion.div
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: activeStep >= idx ? color : "rgba(115,115,115,0.3)",
                scale: activeStep === idx ? [1, 1.3, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Pipeline lane definitions (unchanged)
const LANES = [
  { y: 12, color: "rgba(99,102,241,0.45)" },
  { y: 24, color: "rgba(59,130,246,0.4)" },
  { y: 36, color: "rgba(99,102,241,0.35)" },
  { y: 48, color: "rgba(56,189,248,0.38)" },
  { y: 60, color: "rgba(59,130,246,0.4)" },
  { y: 72, color: "rgba(99,102,241,0.42)" },
  { y: 84, color: "rgba(56,189,248,0.35)" },
];

const CHECKPOINTS = [
  { x: 15, y: 12 }, { x: 40, y: 12 }, { x: 70, y: 12 },
  { x: 25, y: 24 }, { x: 55, y: 24 }, { x: 80, y: 24 },
  { x: 10, y: 36 }, { x: 45, y: 36 }, { x: 75, y: 36 },
  { x: 20, y: 48 }, { x: 50, y: 48 }, { x: 85, y: 48 },
  { x: 15, y: 60 }, { x: 60, y: 60 }, { x: 78, y: 60 },
  { x: 30, y: 72 }, { x: 65, y: 72 },
  { x: 18, y: 84 }, { x: 50, y: 84 }, { x: 82, y: 84 },
];

const BRANCHES: [number, number, number][] = [
  [40, 12, 24], [55, 24, 36], [45, 36, 48],
  [50, 48, 60], [60, 60, 72], [50, 72, 84],
  [70, 12, 36], [80, 24, 48], [75, 36, 60],
];

export default function MethodologySection() {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);

  const methodologies = [
    {
      name: "Waterfall",
      icon: Droplets,
      description: "Sequential execution for predictable, low-risk tasks",
      useCase: "Frontend-only updates, UI refinements",
      efficiency: 95,
    },
    {
      name: "Waterfall + Feedback",
      icon: RefreshCw,
      description: "Linear flow with validation checkpoints",
      useCase: "Backend non-functional updates",
      efficiency: 88,
    },
    {
      name: "Prototyping",
      icon: Palette,
      description: "Iterative refinement through rapid validation",
      useCase: "New features, UX experimentation",
      efficiency: 82,
    },
    {
      name: "Agile Engine",
      icon: Zap,
      description: "Dynamic sprints for complex, evolving requirements",
      useCase: "Full-scale product development",
      efficiency: 90,
    },
  ];

  return (
    <section className="relative w-full py-28 border-t border-neutral-800 overflow-hidden bg-black">
      {/* ─── PIPELINE-FLOW BACKGROUND (unchanged) ─── */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            opacity: 0.55,
          }}
        />

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
              <line
                x1="0%"
                y1={`${lane.y}%`}
                x2="100%"
                y2={`${lane.y}%`}
                stroke="url(#laneGrad)"
                strokeWidth="1"
                opacity="0.6"
              />
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

        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 40%, transparent 22%, rgba(0,0,0,0.52) 68%, rgba(0,0,0,0.84) 100%)",
          }}
        />
      </div>

      {/* ─── ENHANCED CONTENT ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <Reveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-block mb-6"
            >
              <div className="px-4 py-2 rounded-full border border-neutral-500/30 bg-neutral-500/10 backdrop-blur-sm">
                <span className="text-neutral-300 text-sm font-medium">Adaptive Methodology Engine</span>
              </div>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">
              Execution Intelligence
              <span className="block mt-2 bg-gradient-to-r from-neutral-200 via-white to-neutral-300 bg-clip-text text-transparent">
                Framework
              </span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-6 text-neutral-400 max-w-3xl mx-auto text-center text-lg leading-relaxed">
            Decacorn operates a hybrid execution system that dynamically selects
            the optimal methodology based on task complexity, risk, and impact –
            ensuring precision, flexibility, and scalable delivery.
          </p>
        </Reveal>

        {/* Interactive Methodology Cards */}
        <div className="mt-20">
          <Reveal>
            <h3 className="text-2xl font-semibold text-white text-center mb-12">
              Four Execution Modes, One Intelligent System
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologies.map((method, idx) => (
              <TiltCard key={method.name} delay={idx * 0.1}>
                <motion.div
                  className="relative p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm cursor-pointer overflow-hidden group h-full"
                  onHoverStart={() => setSelectedMethod(idx)}
                  onHoverEnd={() => setSelectedMethod(null)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-neutral-500/10 via-neutral-500/5 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10">
                    <div className="mb-4">
                      <method.icon className="w-10 h-10 text-neutral-300" strokeWidth={1.5} />
                    </div>

                    <h4 className="text-white font-semibold text-lg mb-2">{method.name}</h4>
                    <p className="text-neutral-400 text-sm mb-4 leading-relaxed">{method.description}</p>

                    {/* Efficiency bar */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-neutral-500">Efficiency</span>
                        <span className="text-xs text-neutral-300 font-medium">{method.efficiency}%</span>
                      </div>
                      <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-neutral-400 to-white rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${method.efficiency}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-800">
                      <p className="text-xs text-neutral-500">Best for:</p>
                      <p className="text-xs text-neutral-300 mt-1">{method.useCase}</p>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-neutral-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Comparison Section with Animation */}
        <div className="mt-32">
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div className="flex flex-col">
                <h3 className="text-3xl font-bold text-white mb-6">
                  Why Hybrid Execution?
                </h3>
                <p className="text-neutral-400 leading-relaxed mb-8">
                  Traditional teams rely on a single methodology for all tasks,
                  creating rigidity and inefficiency. Decacorn applies an adaptive
                  execution model – selecting the right methodology for the right problem.
                </p>

                {/* Animated stats */}
                <div className="grid grid-cols-2 gap-4 flex-1">
                  {[
                    { value: "4x", label: "Faster Delivery" },
                    { value: "60%", label: "Less Rework" },
                    { value: "95%", label: "Success Rate" },
                    { value: "100%", label: "Adaptability" },
                  ].map((stat, idx) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="p-6 rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 to-neutral-900/40 backdrop-blur-sm flex flex-col justify-center"
                    >
                      <div className="text-3xl font-bold bg-gradient-to-r from-neutral-200 to-white bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-sm text-neutral-500 mt-2">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="grid grid-rows-4 gap-3 h-full">
                {[
                  { old: "Single rigid methodology", new: "Adaptive methodology orchestration", icon: Target },
                  { old: "High mismatch and rework", new: "Precision-driven delivery", icon: Sparkles },
                  { old: "Delayed feedback loops", new: "Continuous validation", icon: RotateCw },
                  { old: "Generic delivery", new: "Outcome-driven execution", icon: Rocket },
                ].map((item, idx) => (
                  <motion.div
                    key={item.old}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative group"
                  >
                    <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm hover:border-neutral-600 transition-all duration-300 h-full flex items-center">
                      <div className="flex items-start gap-4 w-full">
                        <item.icon className="w-6 h-6 text-neutral-300 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-neutral-500 text-sm line-through">{item.old}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <motion.div
                              className="w-6 h-0.5 bg-gradient-to-r from-neutral-400 to-white"
                              initial={{ width: 0 }}
                              whileInView={{ width: 24 }}
                              transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                            />
                            <span className="text-white font-medium text-sm">{item.new}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Methodology Flows */}
        <div className="mt-32">
          <Reveal>
            <h3 className="text-3xl font-bold text-white text-center mb-16">
              Execution Workflows in Action
            </h3>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Classic Waterfall",
                steps: ["Requirements", "Design", "Development", "Testing", "Deployment"],
                color: "rgba(163,163,163,0.8)",
                gradient: "from-neutral-500/20 to-neutral-500/5",
              },
              {
                title: "Waterfall with Feedback",
                steps: ["Analysis", "Implementation", "Testing", "Feedback", "Refinement", "Deploy"],
                color: "rgba(163,163,163,0.8)",
                gradient: "from-neutral-500/20 to-neutral-500/5",
              },
              {
                title: "Prototyping Model",
                steps: ["Understanding", "Prototype", "Feedback", "Iteration", "Final Build"],
                color: "rgba(163,163,163,0.8)",
                gradient: "from-neutral-500/20 to-neutral-500/5",
              },
            ].map((flow, idx) => (
              <TiltCard key={flow.title} delay={idx * 0.15}>
                <div className={`p-6 rounded-2xl border border-neutral-800 bg-gradient-to-br ${flow.gradient} backdrop-blur-sm h-full`}>
                  <h4 className="text-white font-semibold text-lg mb-6">{flow.title}</h4>
                  <MethodologyFlow steps={flow.steps} color={flow.color} />
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Selection Engine Matrix */}
        <div className="mt-32">
          <Reveal>
            <h3 className="text-3xl font-bold text-white text-center mb-4">
              Methodology Selection Engine
            </h3>
            <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-16">
              Our intelligent system automatically routes tasks to the optimal execution methodology
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                task: "Frontend-Only Updates",
                method: "Classic Waterfall",
                icon: Paintbrush,
              },
              {
                task: "Backend Non-Functional Updates",
                method: "Waterfall with Feedback",
                icon: Settings,
              },
              {
                task: "Functional Feature Changes",
                method: "Prototyping Model",
                icon: Microscope,
              },
            ].map((item, idx) => (
              <motion.div
                key={item.task}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="relative group"
              >
                <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm overflow-hidden">
                  <div className="relative z-10">
                    <div className="mb-4">
                      <item.icon className="w-10 h-10 text-neutral-300" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-white font-semibold mb-2">{item.task}</h4>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="flex-1 h-px bg-neutral-700" />
                      <span className="text-xs text-neutral-500">routes to</span>
                      <div className="flex-1 h-px bg-neutral-700" />
                    </div>
                    <p className="mt-4 text-neutral-300 font-medium">→ {item.method}</p>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-neutral-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final Impact Statement */}
        <Reveal delay={200}>
          <motion.div
            className="mt-32 p-12 rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-900/40 backdrop-blur-sm relative overflow-hidden"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-neutral-500/20 via-neutral-500/10 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Beyond Task Management
              </h3>
              <p className="text-neutral-300 text-lg leading-relaxed">
                Decacorn doesn't merely manage tasks – it orchestrates execution
                intelligence across systems, teams, and outcomes. Every project gets
                the methodology it deserves, every time.
              </p>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {["Intelligent", "Adaptive", "Precise", "Scalable"].map((word, idx) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="px-4 py-2 rounded-full border border-neutral-500/30 bg-neutral-500/10 text-neutral-300 text-sm font-medium"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}