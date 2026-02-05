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
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id: string) => {
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
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
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.img
              src="/decacorn-logo.svg"
              alt="Decacorn Labs"
              className="w-9 h-9"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
            <span className="text-white font-medium text-lg tracking-tight">
              Decacorn Labs
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-1 text-sm">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleNav(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative px-4 py-2 text-white/70 hover:text-white transition-colors z-10"
                >
                  {item.label}
                </button>

                <AnimatePresence>
                  {hoveredItem === item.id && (
                    <motion.div
                      layoutId="nav-focus"
                      className="absolute inset-0 rounded-lg border border-white/10 bg-white/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Methodology */}
            <div className="relative">
              <Link
                href="/methodology"
                onMouseEnter={() => setHoveredItem("methodology")}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative px-4 py-2 text-white/70 hover:text-white transition-colors z-10 inline-block"
              >
                Methodology
              </Link>

              <AnimatePresence>
                {hoveredItem === "methodology" && (
                  <motion.div
                    layoutId="nav-focus"
                    className="absolute inset-0 rounded-lg border border-white/10 bg-white/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA */}
          <motion.button
            onClick={onGetStarted}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="px-5 py-2 rounded-lg bg-white text-black text-sm font-medium"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
