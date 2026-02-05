"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import GetStartedModal from "./GetStartedModal";

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.footer
        ref={footerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, #000000 0%, #0b0b0b 55%, #111111 100%)",
        }}
      >
        {/* Ambient gradient overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 0.4 : 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.025), transparent 60%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16 relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between gap-12">
            {/* Brand block */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -24 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <motion.img
                  src="/decacorn-logo.svg"
                  alt="Decacorn Labs Logo"
                  className="w-9 h-9"
                  initial={{ rotate: -120, opacity: 0 }}
                  animate={{
                    rotate: isVisible ? 0 : -120,
                    opacity: isVisible ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.3,
                    ease: "easeOut",
                  }}
                />
                <span className="text-base font-medium tracking-tight">
                  Decacorn Labs
                </span>
              </div>

              <motion.p
                className="text-sm text-gray-400 leading-relaxed pl-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              >
                © {new Date().getFullYear()} Decacorn. All rights reserved.
              </motion.p>
            </motion.div>

            {/* Navigation + Contact */}
            <motion.div
              className="flex flex-col sm:flex-row gap-12"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 24 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            >
              {/* Navigation */}
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-white">
                  Navigation
                </h3>

                <nav className="flex flex-col gap-3">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/#services", label: "Services" },
                    { href: "/methodology", label: "Methodology" },
                    { href: "/#projects", label: "Projects" },
                    { href: "/#contact", label: "Contact" },
                  ].map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{
                        opacity: isVisible ? 1 : 0,
                        x: isVisible ? 0 : -12,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + i * 0.06,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        <motion.span
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Contact */}
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">
                    Contact
                  </h3>

                  <div className="flex flex-col gap-3">
                    {[
                      "+91 8447242034",
                      "+91 7452897444",
                      "hr@alumna.ai",
                    ].map((text, i) => (
                      <motion.div
                        key={text}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : 12,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: 0.6 + i * 0.06,
                          ease: "easeOut",
                        }}
                      >
                        <a
                          href={
                            text.includes("@")
                              ? `mailto:${text}`
                              : `tel:${text.replace(/\s/g, "")}`
                          }
                          className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                          {text}
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <motion.button
                  onClick={() => setModalOpen(true)}
                  className="bg-white text-black font-medium py-2.5 px-5 rounded-lg text-sm relative overflow-hidden"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    y: isVisible ? 0 : 16,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.9,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10">Get Started</span>

                  {/* Subtle shimmer */}
                  <motion.div
                    className="absolute inset-0 -translate-x-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)",
                    }}
                    animate={{
                      translateX: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                      ease: "easeOut",
                    }}
                  />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Monument watermark */}
          <motion.div
            className="mt-12 pt-8"
            initial={{ opacity: 0, y: 32 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 32,
            }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          >
            <motion.div
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-center select-none leading-none"
              style={{
                color: "rgba(255,255,255,0.04)",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(255,255,255,0.06))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              Decacorn Labs
            </motion.div>

            <motion.div
              className="mx-auto mt-4 h-px"
              style={{
                width: "60%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isVisible ? 1 : 0 }}
              transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
            />
          </motion.div>

          {/* Ambient particles */}
          {isVisible &&
            [...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-20 hidden sm:block"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -18, 0],
                  opacity: [0.2, 0.45, 0.2],
                }}
                transition={{
                  duration: 4 + i * 0.4,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
        </div>
      </motion.footer>

      <GetStartedModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
