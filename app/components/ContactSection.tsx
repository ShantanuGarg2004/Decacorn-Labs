"use client";

import { useEffect, useRef, useState } from "react";

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
      className="relative w-full py-24 border-t border-neutral-800 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
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
          Whether you’re building intelligence-driven products or exploring AI-powered
          execution systems, we’d love to connect.
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
              onClick={() => copyToClipboard("hr@alumna.ai", "email")}
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              ayushsharma1709@gmail.com
            </button>
            {copied === "email" && (
              <p className="mt-3 text-xs text-neutral-500">Copied to clipboard</p>
            )}
            <br></br>
            <button
              onClick={() => copyToClipboard("hr@alumna.ai", "email")}
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              hr@alumna.ai
            </button>
            {copied === "email" && (
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

      {/* AI OS glow */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000
        ${visible ? "opacity-100" : "opacity-0"}`}
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.05), transparent 40%)",
        }}
      />
    </section>
  );
}
