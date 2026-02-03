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
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.footer 
        ref={footerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="text-white relative overflow-hidden" 
        style={{ 
          background: 'linear-gradient(to bottom, #000000 0%, #0b0b0b 50%, #111111 100%)' 
        }}
      >
        {/* Animated background gradient overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 0.5 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03), transparent 60%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-12">
            {/* Logo and Copyright - Slide in from left */}
            <motion.div 
              className="flex flex-col flex-shrink-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="flex items-center gap-1 mb-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.img 
                  src="/decacorn-logo.svg" 
                  alt="Decacorn Labs Logo" 
                  className="w-8 h-8 sm:w-10 sm:h-10"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ 
                    rotate: isVisible ? 0 : -180, 
                    opacity: isVisible ? 1 : 0 
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3,
                    type: "spring",
                    stiffness: 100
                  }}
                />
                <span className="text-sm sm:text-base font-semibold">Decacorn Labs</span>
              </motion.div>
              <motion.p 
                className="text-xs sm:text-sm text-gray-400 leading-snug pl-2 sm:pl-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                © {new Date().getFullYear()} Decacorn, all rights reserved.
              </motion.p>
            </motion.div>

            {/* Navigation and Contact Unit - Slide in from right */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-16 flex-shrink-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Navigation */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <motion.h3 
                  className="text-sm sm:text-base font-semibold text-white"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  Navigation
                </motion.h3>
                <nav className="flex flex-col gap-2 sm:gap-3">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/#services", label: "Services" },
                    { href: "/methodology", label: "Methodology" },
                    { href: "/#projects", label: "Projects" },
                    { href: "/#contact", label: "Contact" },
                  ].map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    >
                      <Link 
                        href={link.href}
                        className="text-xs sm:text-sm text-gray-400 hover:text-white transition-all duration-300 inline-block group"
                      >
                        <motion.span
                          className="relative"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.label}
                          <motion.span
                            className="absolute -bottom-0.5 left-0 h-px bg-white"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-3 sm:gap-4 justify-between">
                <div>
                  <motion.h3 
                    className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    Contact
                  </motion.h3>
                  <div className="flex flex-col gap-2 sm:gap-3">
                    {[
                      { href: "tel:+918447242034", label: "+91 8447242034" },
                      { href: "tel:+917452897444", label: "+91 7452897444" },
                      { href: "mailto:hr@alumna.ai", label: "hr@alumna.ai" },
                    ].map((contact, index) => (
                      <motion.a
                        key={contact.href}
                        href={contact.href}
                        className="text-xs sm:text-sm text-gray-400 hover:text-white transition-all duration-300 group"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 10 }}
                        transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                        whileHover={{ x: 4 }}
                      >
                        {contact.label}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Get Started Button with animations */}
                <motion.button 
                  onClick={() => setModalOpen(true)}
                  className="w-full sm:w-auto bg-white text-black font-semibold py-2 sm:py-2.5 px-4 rounded-lg text-xs sm:text-sm relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Get Started</span>
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 -translate-x-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
                    }}
                    animate={{
                      translateX: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  
                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0 bg-gray-200"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Bottom Gradient Text Watermark with parallax effect */}
          <motion.div 
            className="mt-6 sm:mt-8 pt-4 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div 
              className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-center pointer-events-none select-none leading-none" 
              style={{ 
                color: 'rgba(255, 255, 255, 0.05)', 
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.06) 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                backgroundClip: 'text' 
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Decacorn Labs
            </motion.div>

            {/* Animated underline accent */}
            <motion.div
              className="mx-auto mt-3 sm:mt-4"
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              }}
              initial={{ width: 0 }}
              animate={{ width: isVisible ? '60%' : 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            />
          </motion.div>

          {/* Floating particles effect - reduced on mobile */}
          {isVisible && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full opacity-20 hidden sm:block"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </>
          )}
        </div>
      </motion.footer>

      {/* Get Started Modal */}
      <GetStartedModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}