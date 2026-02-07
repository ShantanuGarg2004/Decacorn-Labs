"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MethodologyFooter from "./MethodologyFooter";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  maxOpacity: number;
  life: number;
  maxLife: number;
  noiseOffset: number;
  originalX: number;
  hue: number;
}

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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SmokeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, prevX: -1000, prevY: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createParticle = (fromSide: 'left' | 'right'): Particle => {
      const x = fromSide === 'left' ? -30 : canvas.width + 30;
      const y = Math.random() * canvas.height;

      return {
        x,
        y,
        vx: fromSide === 'left' 
          ? Math.random() * 0.3 + 0.15  
          : -(Math.random() * 0.3 + 0.15),
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 120 + 80,
        opacity: 0,
        maxOpacity: Math.random() * 0.06 + 0.03,
        life: 0,
        maxLife: Math.random() * 600 + 500,
        noiseOffset: Math.random() * 1000,
        originalX: x,
        hue: Math.random() * 20 - 10,
      };
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const newX = event.clientX - rect.left;
      const newY = event.clientY - rect.top;
      
      mouseRef.current = { 
        x: newX, 
        y: newY,
        vx: newX - mouseRef.current.prevX,
        vy: newY - mouseRef.current.prevY,
        prevX: newX,
        prevY: newY
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, vx: 0, vy: 0, prevX: -1000, prevY: -1000 };
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const drawParticle = (particle: Particle) => {
      const progress = particle.life / particle.maxLife;

      let opacity = particle.maxOpacity;
      if (progress < 0.2) {
        opacity = particle.maxOpacity * (progress / 0.2);
      } else if (progress > 0.75) {
        opacity = particle.maxOpacity * (1 - (progress - 0.75) / 0.25);
      }

      const scale = 1 + progress * 0.8;

      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius * scale
      );

      const baseColor = 95 + particle.hue;
      gradient.addColorStop(0, `rgba(${baseColor + 12}, ${baseColor + 12}, ${baseColor + 12}, ${opacity * 0.35})`);
      gradient.addColorStop(0.2, `rgba(${baseColor + 5}, ${baseColor + 5}, ${baseColor + 5}, ${opacity * 0.25})`);
      gradient.addColorStop(0.4, `rgba(${baseColor - 3}, ${baseColor - 3}, ${baseColor - 3}, ${opacity * 0.16})`);
      gradient.addColorStop(0.65, `rgba(${baseColor - 12}, ${baseColor - 12}, ${baseColor - 12}, ${opacity * 0.09})`);
      gradient.addColorStop(0.85, `rgba(${baseColor - 22}, ${baseColor - 22}, ${baseColor - 22}, ${opacity * 0.04})`);
      gradient.addColorStop(1, `rgba(35, 35, 35, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * scale, 0, Math.PI * 2);
      ctx.fill();
    };

    let animationId: number;

    const animate = () => {
      timeRef.current++;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.035)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.14) {
        particlesRef.current.push(createParticle('left'));
      }
      if (Math.random() < 0.14) {
        particlesRef.current.push(createParticle('right'));
      }

      if (particlesRef.current.length > 90) {
        particlesRef.current.shift();
      }

      const mouse = mouseRef.current;
      const mouseSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        const noiseX = Math.sin(p.noiseOffset + timeRef.current * 0.008) * 0.12;
        const noiseY = Math.cos(p.noiseOffset + timeRef.current * 0.01) * 0.1;
        const crossNoise = Math.sin(p.noiseOffset * 2 + timeRef.current * 0.009) * 0.06;

        p.vx += noiseX;
        p.vy += noiseY + crossNoise;

        p.vy -= 0.008;

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRange = 220;

        if (distance < interactionRange && distance > 0) {
          const proximityFactor = 1 - (distance / interactionRange);
          const speedMultiplier = 1 + Math.min(mouseSpeed * 0.25, 2);
          const force = proximityFactor * proximityFactor * 1.8 * speedMultiplier;
          
          const pushX = -(dx / distance) * force;
          const pushY = -(dy / distance) * force;
          p.vx += pushX;
          p.vy += pushY;

          if (mouseSpeed > 0.3) {
            const perpX = -mouse.vy / Math.max(mouseSpeed, 0.1);
            const perpY = mouse.vx / Math.max(mouseSpeed, 0.1);
            p.vx += perpX * 0.3 * proximityFactor;
            p.vy += perpY * 0.3 * proximityFactor;
          }

          if (distance < interactionRange * 0.25) {
            p.maxOpacity *= 0.92;
            p.life += 2;
          } else if (distance < interactionRange * 0.5) {
            p.maxOpacity *= 0.97;
            p.life += 1;
          }
        }

        p.vx *= 0.985;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const isLeftSide = p.originalX < canvas.width / 2;
        const sideMargin = 200;
        
        if (isLeftSide && p.x > sideMargin) {
          const distanceFromMargin = p.x - sideMargin;
          const slowdownFactor = Math.min(distanceFromMargin / 300, 1);
          p.vx *= (1 - slowdownFactor * 0.02);
        }
        
        if (!isLeftSide && p.x < canvas.width - sideMargin) {
          const distanceFromMargin = (canvas.width - sideMargin) - p.x;
          const slowdownFactor = Math.min(distanceFromMargin / 300, 1);
          p.vx *= (1 - slowdownFactor * 0.02);
        }

        const tooFarLeft = p.x < -150;
        const tooFarRight = p.x > canvas.width + 150;
        const tooFarUp = p.y < -150;
        const tooFarDown = p.y > canvas.height + 150;
        const tooOld = p.life > p.maxLife;
        const tooFaded = p.maxOpacity < 0.001;

        if (tooFarLeft || tooFarRight || tooFarUp || tooFarDown || tooOld || tooFaded) {
          particlesRef.current.splice(i, 1);
        } else {
          drawParticle(p);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          pointerEvents: 'auto',
        }}
      />
    </div>
  );
}

export default function MethodologySection() {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [hoveredMethod, setHoveredMethod] = useState<number | null>(null);

  return (
    <div className="relative w-full bg-black">
      {/* Single unified smoke background for both section and footer */}
      <SmokeBackground />
      
      {/* Subtle overlay elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Minimal grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Subtle center glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "10%",
            left: "50%",
            width: "600px",
            height: "400px",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <section
        id="methodology"
        className="relative w-full py-32 md:py-40 border-t border-neutral-800"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-block mb-6">
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-500 border-b border-neutral-700 pb-2">
                  Methodology
                </span>
              </div>
              <h2 className="text-[2.75rem] md:text-6xl font-light text-white leading-[1.1] tracking-tight">
                How Intent Becomes Execution
              </h2>
              <p className="mt-8 text-lg md:text-xl text-neutral-400 leading-relaxed font-light max-w-2xl">
                Most organizations don't fail because they lack tools. They fail because intent gets lost in translation—between strategy and action, between teams, between what was decided and what actually happens.
              </p>
              <p className="mt-6 text-lg md:text-xl text-neutral-200 leading-relaxed max-w-2xl">
                We built a methodology that treats this gap as an engineering problem, not a cultural one.
              </p>
            </div>
          </Reveal>

          {/* The Four Stages */}
          <div className="mt-32 md:mt-40">
            <Reveal delay={100}>
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-24 md:gap-y-32">
                
                {/* Stage 1: Capture */}
                <motion.div 
                  className="group cursor-pointer"
                  onHoverStart={() => setHoveredStage(0)}
                  onHoverEnd={() => setHoveredStage(null)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      <motion.span 
                        className="text-2xl font-light text-neutral-600"
                        animate={{ 
                          color: hoveredStage === 0 ? "rgb(255,255,255)" : "rgb(82,82,82)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        01
                      </motion.span>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                        Capture
                      </h3>
                      <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4 font-medium">
                        Intent Articulation
                      </p>
                      <p className="text-neutral-400 leading-relaxed mb-3">
                        Execution fails when the original goal is ambiguous. Capture forces clarity before action begins.
                      </p>
                      <p className="text-neutral-200 leading-relaxed font-medium">
                        Goals are translated into structured, measurable outcomes. No vague mandates.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Stage 2: Structure */}
                <motion.div 
                  className="group cursor-pointer"
                  onHoverStart={() => setHoveredStage(1)}
                  onHoverEnd={() => setHoveredStage(null)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      <motion.span 
                        className="text-2xl font-light text-neutral-600"
                        animate={{ 
                          color: hoveredStage === 1 ? "rgb(255,255,255)" : "rgb(82,82,82)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        02
                      </motion.span>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                        Structure
                      </h3>
                      <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4 font-medium">
                        Decomposition Into Executable Units
                      </p>
                      <p className="text-neutral-400 leading-relaxed mb-3">
                        Human cognition can't hold complex systems in working memory. Structure breaks intent into addressable components.
                      </p>
                      <p className="text-neutral-200 leading-relaxed font-medium">
                        Work is mapped to dependencies, constraints, and decision points. Complexity becomes navigable.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Stage 3: Execute */}
                <motion.div 
                  className="group cursor-pointer"
                  onHoverStart={() => setHoveredStage(2)}
                  onHoverEnd={() => setHoveredStage(null)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      <motion.span 
                        className="text-2xl font-light text-neutral-600"
                        animate={{ 
                          color: hoveredStage === 2 ? "rgb(255,255,255)" : "rgb(82,82,82)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        03
                      </motion.span>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                        Execute
                      </h3>
                      <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4 font-medium">
                        Adaptive Orchestration
                      </p>
                      <p className="text-neutral-400 leading-relaxed mb-3">
                        Plans encounter reality. Execution must adjust to new information without losing the original intent.
                      </p>
                      <p className="text-neutral-200 leading-relaxed font-medium">
                        Systems monitor progress, surface blockers, and reroute resources in real-time.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Stage 4: Verify */}
                <motion.div 
                  className="group cursor-pointer"
                  onHoverStart={() => setHoveredStage(3)}
                  onHoverEnd={() => setHoveredStage(null)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      <motion.span 
                        className="text-2xl font-light text-neutral-600"
                        animate={{ 
                          color: hoveredStage === 3 ? "rgb(255,255,255)" : "rgb(82,82,82)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        04
                      </motion.span>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                        Verify
                      </h3>
                      <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4 font-medium">
                        Outcome Validation
                      </p>
                      <p className="text-neutral-400 leading-relaxed mb-3">
                        Completion isn't the same as success. Verify ensures the original intent was actually satisfied.
                      </p>
                      <p className="text-neutral-200 leading-relaxed font-medium">
                        Results are measured against initial goals. Gaps trigger iteration, not celebration.
                      </p>
                    </div>
                  </div>
                </motion.div>

              </div>
            </Reveal>
          </div>

          {/* Adaptive Methodology Selection */}
          <div className="mt-32 md:mt-40">
            <Reveal delay={150}>
              <div className="max-w-3xl mb-20">
                <h3 className="text-3xl md:text-4xl font-light text-white mb-6 leading-tight">
                  Adaptive Methodology Selection
                </h3>
                <p className="text-lg text-neutral-400 leading-relaxed">
                  Traditional teams rely on a single methodology for all tasks, creating rigidity and inefficiency. We apply an adaptive execution model—selecting the right methodology for the right problem.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="grid md:grid-cols-4 gap-8 md:gap-6">
                
                {/* Waterfall */}
                <motion.div 
                  className="border-t border-neutral-800 pt-6 cursor-pointer"
                  onHoverStart={() => setHoveredMethod(0)}
                  onHoverEnd={() => setHoveredMethod(null)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4">
                    <motion.span 
                      className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-600"
                      animate={{ 
                        color: hoveredMethod === 0 ? "rgb(163,163,163)" : "rgb(82,82,82)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Method 01
                    </motion.span>
                  </div>
                  <h4 className="text-xl font-light text-white mb-4">
                    Waterfall
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                    Sequential execution for predictable, low-risk tasks
                  </p>
                  <div className="pt-4 border-t border-neutral-800">
                    <p className="text-xs text-neutral-600 mb-1">Best for</p>
                    <p className="text-sm text-neutral-300">Frontend-only updates, UI refinements</p>
                  </div>
                </motion.div>

                {/* Waterfall + Feedback */}
                <motion.div 
                  className="border-t border-neutral-800 pt-6 cursor-pointer"
                  onHoverStart={() => setHoveredMethod(1)}
                  onHoverEnd={() => setHoveredMethod(null)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4">
                    <motion.span 
                      className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-600"
                      animate={{ 
                        color: hoveredMethod === 1 ? "rgb(163,163,163)" : "rgb(82,82,82)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Method 02
                    </motion.span>
                  </div>
                  <h4 className="text-xl font-light text-white mb-4">
                    Waterfall + Feedback
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                    Linear flow with validation checkpoints
                  </p>
                  <div className="pt-4 border-t border-neutral-800">
                    <p className="text-xs text-neutral-600 mb-1">Best for</p>
                    <p className="text-sm text-neutral-300">Backend non-functional updates</p>
                  </div>
                </motion.div>

                {/* Prototyping */}
                <motion.div 
                  className="border-t border-neutral-800 pt-6 cursor-pointer"
                  onHoverStart={() => setHoveredMethod(2)}
                  onHoverEnd={() => setHoveredMethod(null)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4">
                    <motion.span 
                      className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-600"
                      animate={{ 
                        color: hoveredMethod === 2 ? "rgb(163,163,163)" : "rgb(82,82,82)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Method 03
                    </motion.span>
                  </div>
                  <h4 className="text-xl font-light text-white mb-4">
                    Prototyping
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                    Iterative refinement through rapid validation
                  </p>
                  <div className="pt-4 border-t border-neutral-800">
                    <p className="text-xs text-neutral-600 mb-1">Best for</p>
                    <p className="text-sm text-neutral-300">New features, UX experimentation</p>
                  </div>
                </motion.div>

                {/* Agile Engine */}
                <motion.div 
                  className="border-t border-neutral-800 pt-6 cursor-pointer"
                  onHoverStart={() => setHoveredMethod(3)}
                  onHoverEnd={() => setHoveredMethod(null)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4">
                    <motion.span 
                      className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-600"
                      animate={{ 
                        color: hoveredMethod === 3 ? "rgb(163,163,163)" : "rgb(82,82,82)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Method 04
                    </motion.span>
                  </div>
                  <h4 className="text-xl font-light text-white mb-4">
                    Agile Engine
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                    Dynamic sprints for complex, evolving requirements
                  </p>
                  <div className="pt-4 border-t border-neutral-800">
                    <p className="text-xs text-neutral-600 mb-1">Best for</p>
                    <p className="text-sm text-neutral-300">Full-scale product development</p>
                  </div>
                </motion.div>

              </div>
            </Reveal>
          </div>

          {/* Comparison Section */}
          <div className="mt-32 md:mt-40">
            <Reveal delay={250}>
              <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                  <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
                    Why Adaptive Execution
                  </h3>
                  <p className="text-neutral-400 text-lg">
                    Moving from rigid frameworks to intelligent orchestration
                  </p>
                </div>

                {/* Comparison Grid */}
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  
                  {/* Left: Traditional Approach */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="space-y-8"
                  >
                    <div className="pb-4 border-b border-neutral-800">
                      <span className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-600">
                        Traditional Approach
                      </span>
                    </div>
                    
                    <ul className="space-y-5">
                      {[
                        "Single rigid methodology",
                        "High mismatch and rework",
                        "Delayed feedback loops",
                        "Generic delivery"
                      ].map((item, idx) => (
                        <motion.li 
                          key={item}
                          className="flex items-center gap-4 group"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                          viewport={{ once: true }}
                        >
                          <div className="flex-shrink-0">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <circle cx="10" cy="10" r="9" stroke="rgb(64,64,64)" strokeWidth="1.5" />
                              <path d="M6 10L14 10" stroke="rgb(115,115,115)" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </div>
                          <p className="text-neutral-500 line-through text-base">
                            {item}
                          </p>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Center Divider with Arrow */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M8 20L32 20M32 20L26 14M32 20L26 26" stroke="rgb(115,115,115)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Right: Decacorn Approach */}
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="space-y-8"
                  >
                    <div className="pb-4 border-b border-white">
                      <span className="text-xs font-medium tracking-[0.2em] uppercase text-white">
                        Decacorn Approach
                      </span>
                    </div>
                    
                    <ul className="space-y-5">
                      {[
                        "Adaptive methodology orchestration",
                        "Precision-driven delivery",
                        "Continuous validation",
                        "Outcome-driven execution"
                      ].map((item, idx) => (
                        <motion.li 
                          key={item}
                          className="flex items-center gap-4 group"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                          viewport={{ once: true }}
                        >
                          <div className="flex-shrink-0">
                            <motion.svg 
                              width="20" 
                              height="20" 
                              viewBox="0 0 20 20" 
                              fill="none"
                              initial={{ scale: 0, rotate: -180 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              transition={{ duration: 0.4, delay: 0.3 + (idx * 0.1) }}
                              viewport={{ once: true }}
                            >
                              <circle cx="10" cy="10" r="9" stroke="rgb(255,255,255)" strokeWidth="1.5" />
                              <path d="M6 10L9 13L14 7" stroke="rgb(255,255,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </motion.svg>
                          </div>
                          <p className="text-white font-light text-base">
                            {item}
                          </p>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                </div>
              </div>
            </Reveal>
          </div>

          {/* Metrics */}
          <div className="mt-32 md:mt-40">
            <Reveal delay={300}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                
                {[
                  { value: "4×", label: "Faster Delivery" },
                  { value: "60%", label: "Less Rework" },
                  { value: "95%", label: "Success Rate" },
                  { value: "100%", label: "Adaptability" }
                ].map((metric, idx) => (
                  <motion.div 
                    key={metric.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl md:text-5xl font-light text-white mb-2">
                      {metric.value}
                    </div>
                    <p className="text-sm text-neutral-500">{metric.label}</p>
                  </motion.div>
                ))}

              </div>
            </Reveal>
          </div>

          {/* Closing Statement */}
          <Reveal delay={350}>
            <div className="mt-32 md:mt-40 max-w-3xl">
              <div className="border-l-2 border-white pl-8 md:pl-12">
                <p className="text-2xl md:text-3xl font-light text-white leading-relaxed mb-6">
                  This isn't theory. It's what execution looks like when you remove the inefficiencies we've learned to accept.
                </p>
                <p className="text-lg text-neutral-400 leading-relaxed">
                  Every platform we build is a hardened implementation of one of these stages.
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* Single Footer - no duplicate smoke background */}
      <MethodologyFooter />
    </div>
  );
}