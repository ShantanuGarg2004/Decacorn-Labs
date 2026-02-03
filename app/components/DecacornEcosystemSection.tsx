"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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
      {/* Interconnected Network Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hexagonal Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon 
                points="30,0 60,17 60,35 30,52 0,35 0,17" 
                fill="none" 
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)"/>
        </svg>

        {/* Connected Nodes Network */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {/* Connection lines */}
          {[
            [[20, 30], [50, 40]],
            [[50, 40], [80, 35]],
            [[20, 30], [35, 60]],
            [[35, 60], [65, 65]],
            [[65, 65], [80, 35]],
            [[50, 40], [65, 65]],
          ].map((line, i) => (
            <motion.line
              key={i}
              x1={`${line[0][0]}%`}
              y1={`${line[0][1]}%`}
              x2={`${line[1][0]}%`}
              y2={`${line[1][1]}%`}
              stroke="rgba(139, 92, 246, 0.3)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                duration: 1.5,
                delay: 0.5 + i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Network nodes */}
          {[
            [20, 30],
            [50, 40],
            [80, 35],
            [35, 60],
            [65, 65],
          ].map((pos, i) => (
            <motion.circle
              key={i}
              cx={`${pos[0]}%`}
              cy={`${pos[1]}%`}
              r="4"
              fill="rgba(139, 92, 246, 0.5)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: [0, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                delay: 0.8 + i * 0.15,
              }}
            >
              <animate
                attributeName="r"
                values="4;6;4"
                dur="3s"
                repeatCount="indefinite"
              />
            </motion.circle>
          ))}
        </svg>

        {/* Glowing Orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2
          className={`text-3xl font-semibold text-white mb-6 transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Decacorn Ecosystem
        </h2>

        {/* Description */}
        <p
          className={`text-neutral-400 max-w-2xl leading-relaxed transition-all duration-700 delay-150 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Decacorn Labs builds interconnected AI systems that guide individuals,
          teams, and organizations from intelligence to execution.
        </p>

        {/* Cards */}
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

        {/* CTA Button */}
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