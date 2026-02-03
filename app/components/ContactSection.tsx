"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

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

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-24 border-t border-neutral-800 overflow-hidden bg-black"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Concentric rings — "signal / reach out", perfectly static */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.07 }}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          {[120, 200, 290, 390, 500, 620, 750].map((r, i) => (
            <circle
              key={i}
              cx="500"
              cy="500"
              r={r}
              fill="none"
              stroke="rgba(99, 102, 241, 1)"
              strokeWidth={i === 0 ? 1.2 : 0.7}
            />
          ))}
          {/* Small center dot */}
          <circle cx="500" cy="500" r="5" fill="rgba(99, 102, 241, 0.6)" />
        </svg>

        {/* One slow-breathing indigo wash — dead center over the rings */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "50%",
            left: "50%",
            width: "480px",
            height: "400px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse, rgba(99, 102, 241, 0.13) 0%, transparent 68%)",
            filter: "blur(80px)",
          }}
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(0,0,0,0.72) 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2
          className={`text-3xl font-semibold text-white mb-6 transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Connect with Decacorn
        </h2>

        <p
          className={`text-neutral-400 max-w-2xl leading-relaxed transition-all duration-700 delay-150 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Whether you're building intelligence-driven products or exploring AI-powered
          execution systems, we'd love to connect.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Phone */}
          <div
            className={`p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm
            transition-all duration-700 ease-out transform
            hover:-translate-y-2 hover:scale-[1.02] hover:border-neutral-600 hover:bg-neutral-900/60
            ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <h3 className="text-white font-medium mb-3">Phone</h3>
            <div className="space-y-2 text-sm text-neutral-400">
              <button
                onClick={() => copyToClipboard("8447242034", "phone1")}
                className="block hover:text-white transition-colors"
              >
                +91 8447242034
              </button>
              <button
                onClick={() => copyToClipboard("7452897444", "phone2")}
                className="block hover:text-white transition-colors"
              >
                +91 7452897444
              </button>
            </div>
            {copied?.startsWith("phone") && (
              <p className="mt-3 text-xs text-neutral-500">Copied to clipboard</p>
            )}
          </div>

          {/* Email */}
          <div
            className={`p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm
            transition-all duration-700 ease-out transform
            hover:-translate-y-2 hover:scale-[1.02] hover:border-neutral-600 hover:bg-neutral-900/60
            ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <h3 className="text-white font-medium mb-3">Email</h3>
            <button
              onClick={() => copyToClipboard("ayushsharma1709@gmail.com", "email1")}
              className="text-sm text-neutral-400 hover:text-white transition-colors block mb-2"
            >
              ayushsharma1709@gmail.com
            </button>
            <button
              onClick={() => copyToClipboard("hr@alumna.ai", "email2")}
              className="text-sm text-neutral-400 hover:text-white transition-colors block"
            >
              hr@alumna.ai
            </button>
            {(copied === "email1" || copied === "email2") && (
              <p className="mt-3 text-xs text-neutral-500">Copied to clipboard</p>
            )}
          </div>

          {/* Address */}
          <div
            className={`p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm
            transition-all duration-700 ease-out transform
            hover:-translate-y-2 hover:scale-[1.02] hover:border-neutral-600 hover:bg-neutral-900/60
            ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <h3 className="text-white font-medium mb-3">Office</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              114, 1st Floor, 43-A, <br />
              Iksana Workspaces, IT Park, <br />
              Sahastradhara Road, Dehradun, <br />
              Uttarakhand – 248001
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}