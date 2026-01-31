"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    title: "AI & LLM Systems",
    short: "Custom AI solutions, LLM pipelines, and intelligent automation.",
    content: `
Decacorn Labs builds production-grade AI systems for real-world applications.

• Custom GPT & LLM-based systems
• AI copilots and chatbots
• Intelligent automation workflows
• AI-driven decision systems
• Enterprise AI solutions
    `,
  },
  {
    title: "RAG & Knowledge Systems",
    short: "AI systems powered by private knowledge and data.",
    content: `
We design Retrieval-Augmented Generation (RAG) systems for organizations.

• Knowledge-based AI systems
• Private data AI search
• Document intelligence
• Semantic search pipelines
• Enterprise knowledge graphs
    `,
  },
  {
    title: "AI Automation",
    short: "AI-driven workflows and intelligent process automation.",
    content: `
We automate complex workflows using AI and orchestration systems.

• AI workflow orchestration
• Business process automation
• AI agents and task automation
• Integration with enterprise tools
• Custom automation engines
    `,
  },
  {
    title: "SaaS & Product Engineering",
    short: "Scalable SaaS platforms and modern digital products.",
    content: `
We design and build scalable SaaS products from MVP to enterprise.

• SaaS architecture design
• Multi-tenant platforms
• Product lifecycle engineering
• Scalable backend systems
• High-performance frontend systems
    `,
  },
  {
    title: "Web & App Development",
    short: "Modern web and mobile applications.",
    content: `
We build modern, fast, and scalable digital applications.

• Full-stack web development
• Mobile app development
• Performance optimization
• Modern UI/UX systems
• Progressive web applications (PWA)
    `,
  },
  {
    title: "API & Platform Engineering",
    short: "Robust APIs and platform ecosystems.",
    content: `
We build API-first platforms and developer-friendly systems.

• REST & GraphQL APIs
• Platform architecture
• SDK & developer tools
• Integration frameworks
• Scalable service ecosystems
    `,
  },
  {
    title: "Cloud & DevOps",
    short: "Cloud-native systems and DevOps pipelines.",
    content: `
We architect secure and scalable cloud systems.

• AWS / Azure / Cloud-native systems
• CI/CD pipelines
• Containerization & orchestration
• DevOps automation
• Cloud security and governance
    `,
  },
  {
    title: "Scalable Infrastructure",
    short: "High-performance infrastructure for modern systems.",
    content: `
We design infrastructure built for scale and reliability.

• Distributed systems
• Microservices architecture
• High-availability systems
• Load balancing & scaling
• Infrastructure optimization
    `,
  },
  {
    title: "System Architecture",
    short: "Enterprise-grade system design and architecture.",
    content: `
We design complex system architectures for enterprises.

• System design & architecture
• Enterprise software design
• Modular system frameworks
• Scalability planning
• Technical strategy consulting
    `,
  },
  {
    title: "Automation & Digital Systems",
    short: "Intelligent digital ecosystems and workflows.",
    content: `
We build digital ecosystems that connect systems and processes.

• Workflow automation
• Internal enterprise tools
• System integrations
• Custom dashboards
• Intelligent digital platforms
    `,
  },
  {
    title: "Data & Analytics",
    short: "Data pipelines, analytics, and intelligence systems.",
    content: `
We build data systems that power AI and decision-making.

• Data pipelines & ETL
• Analytics platforms
• Real-time data processing
• AI-ready data architecture
• Business intelligence systems
    `,
  },
  {
    title: "Custom Enterprise Solutions",
    short: "Tailored digital solutions for enterprises.",
    content: `
We design custom solutions for complex enterprise needs.

• Custom enterprise software
• Domain-specific systems
• Industry-focused platforms
• Large-scale digital transformation
• Long-term system evolution
    `,
  },
];

export default function ExpandableServicesSection() {
  const [active, setActive] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleServices = showAll ? services : services.slice(0, 4);

  return (
    <section id="services" className="bg-black text-white py-32 px-8">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Our Services
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Decacorn Labs builds intelligent systems, scalable platforms, and future-ready digital infrastructure.
          </p>
        </motion.div>

        {/* Expandable Cards */}
        <div className="mt-16 space-y-5">
          <AnimatePresence>
            {visibleServices.map((service, index) => {
              const isActive = active === index;

              return (
                <motion.div
                  key={service.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setActive(isActive ? null : index)}
                  className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-5 hover:bg-white/10 transition"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <motion.h3 layout className="text-lg md:text-xl font-medium">
                        {service.title}
                      </motion.h3>
                      <motion.p layout className="mt-1 text-white/60 text-sm">
                        {service.short}
                      </motion.p>
                    </div>

                    <motion.div
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/60 text-xl select-none"
                    >
                      +
                    </motion.div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="mt-4 overflow-hidden"
                      >
                        <div className="text-white/70 text-sm leading-relaxed whitespace-pre-line border-t border-white/10 pt-4">
                          {service.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Show More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-sm text-white hover:bg-white/20 transition backdrop-blur-md"
          >
            {showAll ? "Show Less" : "Show More"}
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
