"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type NavbarProps = {
  onGetStarted: () => void;
};

export default function Navbar({ onGetStarted }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
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

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-white font-semibold text-lg tracking-tight hover:opacity-80 transition"
        >
          Decacorn Labs
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <button onClick={() => handleNav("services")} className="hover:text-white transition">
            Services
          </button>
          <button onClick={() => handleNav("platforms")} className="hover:text-white transition">
            Platforms
          </button>
          <button onClick={() => handleNav("vision")} className="hover:text-white transition">
            Vision
          </button>
          <button onClick={() => handleNav("contact")} className="hover:text-white transition">
            Contact
          </button>

          <Link href="/methodology" className="hover:text-white transition">
            Methodology
          </Link>
        </div>

        {/* Get Started */}
        <button
          onClick={() => {
          console.log("Navbar Get Started clicked");
          onGetStarted();
         }}
          className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 transition"
          >
          Get Started
        </button>


      </div>
    </motion.nav>
  );
}
