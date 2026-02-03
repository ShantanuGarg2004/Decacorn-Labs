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
      {/* Clean Communication Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Communication Signal Waves */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/10"
              style={{
                width: '200px',
                height: '200px',
              }}
              animate={{
                width: ['200px', '800px'],
                height: ['200px', '800px'],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 4,
                delay: i * 1,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Connection Dots */}
        {[
          { x: '25%', y: '30%' },
          { x: '50%', y: '50%' },
          { x: '75%', y: '30%' },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-400/40"
            style={{ left: pos.x, top: pos.y }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Glowing Center */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

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
        <h2
          className={`text-3xl font-semibold text-white mb-6 transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Connect with Decacorn
        </h2>

        {/* Subtitle */}
        <p
          className={`text-neutral-400 max-w-2xl leading-relaxed transition-all duration-700 delay-150 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Whether you're building intelligence-driven products or exploring AI-powered
          execution systems, we'd love to connect.
        </p>

        {/* Contact Cards */}
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