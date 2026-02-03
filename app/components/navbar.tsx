"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type NavbarProps = {
  onGetStarted: () => void;
};

export default function Navbar({ onGetStarted }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id: string) => {
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  const navItems = [
    { id: "services", label: "Services" },
    { id: "platforms", label: "Platforms" },
    { id: "vision", label: "Vision" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
      style={{
        boxShadow: scrolled
          ? "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
          : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Image */}
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <img
                src="/decacorn-logo.svg"
                alt="Decacorn Labs"
                className="w-9 h-9 transition-all duration-300"
              />
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
                }}
              />
            </motion.div>
            <span
              className="text-white font-semibold text-lg tracking-tight group-hover:opacity-90 transition-opacity duration-300"
              style={{
                textShadow: "0 2px 10px rgba(255, 255, 255, 0.1)",
              }}
            >
              Decacorn Labs
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1 text-sm">
            {navItems.map((item) => (
              <motion.div key={item.id} className="relative">
                <button
                  onClick={() => handleNav(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative px-4 py-2 text-white/70 hover:text-white transition-colors duration-300 z-10"
                  style={{
                    textShadow:
                      hoveredItem === item.id
                        ? "0 0 8px rgba(255, 255, 255, 0.3)"
                        : "none",
                  }}
                >
                  {item.label}

                  {/* Animated curved highlight background */}
                  <AnimatePresence>
                    {hoveredItem === item.id && (
                      <>
                        {/* Top curved highlight */}
                        <motion.div
                          layoutId="navbar-highlight"
                          className="absolute -top-1 left-0 right-0 h-1 rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                          }}
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.34, 1.56, 0.64, 1],
                          }}
                        />

                        {/* 3D curved rectangle frame */}
                        <motion.div
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            boxShadow:
                              "0 4px 16px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                          }}
                          initial={{ scale: 0.8, opacity: 0, y: -10 }}
                          animate={{ scale: 1, opacity: 1, y: 0 }}
                          exit={{ scale: 0.8, opacity: 0, y: -10 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.34, 1.56, 0.64, 1],
                          }}
                        />

                        {/* Inner glow */}
                        <motion.div
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          style={{
                            background:
                              "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Bottom subtle glow */}
                        <motion.div
                          className="absolute -bottom-1 left-1/4 right-1/4 h-px rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                            boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
                          }}
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.1,
                            ease: [0.34, 1.56, 0.64, 1],
                          }}
                        />
                      </>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}

            {/* Methodology Link */}
            <motion.div className="relative ml-2">
              <Link
                href="/methodology"
                onMouseEnter={() => setHoveredItem("methodology")}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative px-4 py-2 text-white/70 hover:text-white transition-colors duration-300 inline-block z-10"
                style={{
                  textShadow:
                    hoveredItem === "methodology"
                      ? "0 0 8px rgba(255, 255, 255, 0.3)"
                      : "none",
                }}
              >
                Methodology

                <AnimatePresence>
                  {hoveredItem === "methodology" && (
                    <>
                      <motion.div
                        className="absolute -top-1 left-0 right-0 h-1 rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                      />

                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          boxShadow:
                            "0 4px 16px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                        }}
                        initial={{ scale: 0.8, opacity: 0, y: -10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: -10 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                      />

                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      <motion.div
                        className="absolute -bottom-1 left-1/4 right-1/4 h-px rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                          boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                      />
                    </>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          </div>

          {/* Get Started Button with 3D effect */}
          <motion.button
            onClick={() => {
              console.log("Navbar Get Started clicked");
              onGetStarted();
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold overflow-hidden group"
            style={{
              boxShadow:
                "0 4px 16px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            }}
          >
            <span className="relative z-10">Get Started</span>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 -translate-x-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)",
              }}
              animate={{
                translateX: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            />

            {/* Hover gradient background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(229, 229, 229, 1) 0%, rgba(212, 212, 212, 1) 100%)",
              }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Bottom shadow for 3D depth */}
            <div
              className="absolute inset-x-0 -bottom-1 h-1 rounded-b-xl opacity-50"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)",
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />
    </motion.nav>
  );
}