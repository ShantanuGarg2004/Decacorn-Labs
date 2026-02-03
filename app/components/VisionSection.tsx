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
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Perspective Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(1000px) rotateX(60deg)',
            transformOrigin: 'center top',
          }}
        />
        
        {/* Glowing Orb - Center */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Diagonal Light Rays */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-full w-1"
              style={{
                left: `${20 + i * 15}%`,
                background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3), transparent)',
                transform: 'skewX(-20deg)',
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.6) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Title */}
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-semibold text-white max-w-3xl">
            Building Intelligence, Not Just Software
          </h2>
        </Reveal>

        {/* Core Vision Statement */}
        <Reveal delay={150}>
          <p className="mt-6 text-neutral-400 max-w-2xl text-lg leading-relaxed">
            At Decacorn Labs, our vision is to transform how humans and systems
            execute work — by replacing fragmented processes with intelligent,
            adaptive, and autonomous execution frameworks.
          </p>
        </Reveal>

        {/* Vision Pillars */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <Reveal delay={200}>
            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm 
            hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300">
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

          {/* Pillar 2 */}
          <Reveal delay={350}>
            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm 
            hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300">
              <h3 className="text-white font-medium text-lg">
                Execution as a System
              </h3>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                Decacorn aims to redefine execution as a structured intelligence layer —
                where decisions, workflows, and outcomes are orchestrated by AI-driven systems.
              </p>
            </div>
          </Reveal>

          {/* Pillar 3 */}
          <Reveal delay={500}>
            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm 
            hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300">
              <h3 className="text-white font-medium text-lg">
                Human-AI Collaboration
              </h3>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                Our long-term vision is not to replace humans, but to amplify decision-making with AI systems that learn, adapt, and support choices.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Bold Statement (Signature Line) */}
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