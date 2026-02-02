"use client";

import { motion } from "framer-motion";

const layers = [
  {
    label: "Intelligence",
    description: "Systems that think, reason, and decide.",
    services: [
      {
        title: "AI & LLM Systems",
        desc: "Production-grade AI systems built around large language models and decision intelligence.",
      },
      {
        title: "RAG & Knowledge Systems",
        desc: "Private knowledge-powered AI using retrieval, semantics, and structured intelligence.",
      },
      {
        title: "Data & Analytics",
        desc: "AI-ready data pipelines, analytics platforms, and real-time intelligence systems.",
      },
    ],
  },
  {
    label: "Execution",
    description: "Systems that act, automate, and deliver.",
    services: [
      {
        title: "AI Automation",
        desc: "AI-driven workflows, agents, and orchestration systems.",
      },
      {
        title: "SaaS & Product Engineering",
        desc: "Scalable SaaS platforms built from MVP to enterprise.",
      },
      {
        title: "Web & App Development",
        desc: "High-performance web and mobile applications with modern UI systems.",
      },
      {
        title: "API & Platform Engineering",
        desc: "API-first platforms, SDKs, and developer ecosystems.",
      },
    ],
  },
  {
    label: "Infrastructure",
    description: "Systems built to scale, endure, and evolve.",
    services: [
      {
        title: "Cloud & DevOps",
        desc: "Cloud-native architectures with automated CI/CD pipelines.",
      },
      {
        title: "Scalable Infrastructure",
        desc: "High-availability, distributed, and performance-optimized systems.",
      },
      {
        title: "System Architecture",
        desc: "Enterprise-grade system design and long-term technical strategy.",
      },
      {
        title: "Custom Enterprise Solutions",
        desc: "Tailored systems for complex, domain-specific enterprise needs.",
      },
    ],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative bg-black text-white py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Capabilities built for execution
          </h2>
          <p className="mt-4 text-white/60 max-w-3xl mx-auto">
            We design intelligence, execution, and infrastructure as one cohesive system.
          </p>
        </motion.div>

        {/* Layers */}
        <div className="mt-20 space-y-20">
          {layers.map((layer, idx) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
            >
              {/* Layer Header */}
              <div className="mb-10">
                <h3 className="text-xl font-medium text-white">
                  {layer.label}
                </h3>
                <p className="mt-1 text-white/50 text-sm">
                  {layer.description}
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {layer.services.map((service) => (
                  <motion.div
                    key={service.title}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="
                      rounded-xl
                      border border-white/10
                      bg-white/5
                      backdrop-blur-xl
                      p-6
                      hover:border-white/20
                      transition
                    "
                  >
                    <h4 className="text-lg font-medium text-white">
                      {service.title}
                    </h4>
                    <p className="mt-2 text-white/60 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background fade */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />
    </section>
  );
}
