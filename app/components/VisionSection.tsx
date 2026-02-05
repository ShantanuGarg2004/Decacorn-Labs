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
      { threshold: 0.25 }
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

export default function VisionSection() {
  return (
    <section
      id="vision"
      className="relative w-full py-28 border-t border-neutral-800 overflow-hidden bg-black"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Perspective grid — conveys depth, "looking into the future" */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.11) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.11) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: "perspective(900px) rotateX(58deg)",
            transformOrigin: "center top",
            opacity: 0.5,
          }}
        />

        {/* One slow-breathing indigo wash — upper center */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "8%",
            left: "50%",
            width: "580px",
            height: "480px",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
          animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 25%, transparent 30%, rgba(0,0,0,0.72) 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-semibold text-white max-w-3xl">
            Building Intelligence, Not Just Software
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-6 text-neutral-400 max-w-2xl text-lg leading-relaxed">
            At Decacorn Labs, our vision is to transform how humans and systems
            execute work — by replacing fragmented processes with intelligent,
            adaptive, and autonomous execution frameworks.
          </p>
        </Reveal>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <Reveal delay={200}>
            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300">
              <h3 className="text-white font-medium text-lg">
                From Tools to Intelligence
              </h3>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                We envision a future where software is no longer passive, but
                actively understands goals, context, and constraints to guide
                execution autonomously.
              </p>
            </div>
          </Reveal>

          <Reveal delay={350}>
            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300">
              <h3 className="text-white font-medium text-lg">
                Execution as a System
              </h3>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                Decacorn aims to redefine execution as a structured intelligence layer —
                where decisions, workflows, and outcomes are orchestrated by AI-driven systems.
              </p>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300">
              <h3 className="text-white font-medium text-lg">
                Human-AI Collaboration
              </h3>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                Our long-term vision is to amplify human decision-making by using AI systems that learn, adapt over time, and support better, faster, and more informed choices.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={650}>
          <div className="mt-24 p-8 rounded-xl border border-neutral-800 bg-black/40 text-center backdrop-blur-sm">
            <p className="text-xl md:text-2xl font-medium text-white">
              "Decacorn is building the operating system for execution."
            </p>
            <p className="mt-3 text-neutral-500 text-sm">
              Not a product. Not a platform. A new paradigm.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
