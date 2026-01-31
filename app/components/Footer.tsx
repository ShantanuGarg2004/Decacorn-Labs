"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full border-t border-neutral-800 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div
            className={`transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <h3 className="text-white text-lg font-semibold mb-3">
              Decacorn Labs
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Building AI systems that think, guide, and execute.
            </p>
          </div>

          {/* Navigation */}
          <div
            className={`transition-all duration-700 delay-150 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <h4 className="text-white text-sm font-medium mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/methodology"
                  className="hover:text-white transition-colors"
                >
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div
            className={`transition-all duration-700 delay-300 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <h4 className="text-white text-sm font-medium mb-4">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-neutral-400">
              <p>+91 8447242034</p>
              <p>+91 7452897444</p>
              <p>hr@alumna.ai</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-neutral-800" />

        {/* Bottom Row */}
        <div
          className={`mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-neutral-500 transition-all duration-700 delay-500 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p>© 2026 Decacorn, all rights reserved</p>
          <p className="text-neutral-600">
            Designed as an AI Operating System interface
          </p>
        </div>
      </div>

      {/* AI OS glow */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000
        ${visible ? "opacity-100" : "opacity-0"}`}
        style={{
          background:
            "radial-gradient(circle at 50% 100%, rgba(255,255,255,0.04), transparent 45%)",
        }}
      />
    </footer>
  );
}
