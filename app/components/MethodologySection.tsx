"use client";

import { useEffect, useRef, useState } from "react";

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

export default function MethodologySection() {
  return (
    <section className="relative w-full py-28 border-t border-neutral-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* HERO */}
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-semibold text-white max-w-3xl">
            Execution Intelligence Framework
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-6 text-neutral-400 max-w-2xl text-lg leading-relaxed">
            Decacorn operates a hybrid execution system that dynamically selects
            the optimal methodology based on task complexity, risk, and impact —
            ensuring precision, flexibility, and scalable delivery.
          </p>
        </Reveal>

        {/* AI CORE MODULES */}
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

        {/* WHY HYBRID */}
        <div className="mt-24 grid md:grid-cols-2 gap-16">
          <Reveal>
            <h3 className="text-3xl font-semibold text-white">
              Why Hybrid Execution?
            </h3>
            <p className="mt-4 text-neutral-400 leading-relaxed">
              Traditional teams rely on a single methodology for all tasks,
              creating rigidity and inefficiency. Decacorn applies an adaptive
              execution model — selecting the right methodology for the right problem.
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
                  className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/30 hover:border-neutral-600 transition-all"
                >
                  <p className="text-white text-sm font-medium">{title}</p>
                  <p className="text-neutral-400 text-sm mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* FLOWCHART */}
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
                  className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300"
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="mt-2 text-neutral-400">→ {item.method}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        {/* METHODOLOGY MODULES */}
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
              <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300">
                <h4 className="text-white font-medium">{item.title}</h4>
                <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                  {item.flow}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* IMPACT MATRIX */}
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
                  className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 flex justify-between hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300"
                >
                  <span className="text-neutral-400">{oldWay}</span>
                  <span className="text-white">→ {newWay}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={400}>
            <p className="mt-16 text-neutral-400 max-w-2xl text-lg">
              Decacorn does not merely manage tasks — it orchestrates execution
              intelligence across systems, teams, and outcomes.
            </p>
          </Reveal>
        </div>
      </div>

      {/* AI OS glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 40% 20%, rgba(255,255,255,0.05), transparent 40%)",
        }}
      />
    </section>
  );
}
