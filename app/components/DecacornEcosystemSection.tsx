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
      {/* ── Background ── */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Hexagonal tiling — "interconnected structure" */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.08 }}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="hexPattern"
              x="0"
              y="0"
              width="70"
              height="121"
              patternUnits="userSpaceOnUse"
            >
              {/* Two rows of hexagons offset to tile seamlessly */}
              <polygon
                points="35,2 68,20 68,56 35,74 2,56 2,20"
                fill="none"
                stroke="rgba(99, 102, 241, 1)"
                strokeWidth="0.8"
              />
              <polygon
                points="35,63 68,81 68,117 35,135 2,117 2,81"
                fill="none"
                stroke="rgba(99, 102, 241, 1)"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>

        {/* One slow-breathing indigo wash — center */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "50%",
            left: "50%",
            width: "520px",
            height: "420px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse, rgba(99, 102, 241, 0.14) 0%, transparent 70%)",
            filter: "blur(85px)",
          }}
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 28%, rgba(0,0,0,0.72) 100%)",
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