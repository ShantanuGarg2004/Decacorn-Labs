import {
  Database,
  FileText,
  Share2,
  Brain,
  Sparkles,
  GitBranch,
  Cpu,
  Cloud,
  Server,
} from "lucide-react";

/* =========================================================
   SERVICE GRAPH TYPES
   ---------------------------------------------------------
   This file defines a directed, layered service graph
   following a neural-network metaphor:
   Input Layer → Hidden Layer → Output Layer
   ========================================================= */

export type ServiceLayer = "input" | "hidden" | "output";

/**
 * A ServiceNode represents a single node in the service graph.
 * - `x` and `y` are normalized layout coordinates (0–100),
 *   interpreted by the visual renderer (NeuralMatrix).
 * - `icon` is a visual identifier only; no behavior is attached.
 */
export type ServiceNode = {
  id: string;
  label: string;
  layer: ServiceLayer;
  x: number;
  y: number;
  icon: any;
  title: string;
  subtitle: string;
  capabilities: string[];
  technologies: string[];
};

/* =========================================================
   NODE DEFINITIONS
   ---------------------------------------------------------
   3–4–2 layered neural network:
   - 3 Input nodes
   - 4 Hidden nodes
   - 2 Output nodes
   ========================================================= */

export const nodes: ServiceNode[] = [
  /* ---------------- INPUT LAYER ---------------- */
  {
    id: "data",
    label: "Data Sources",
    layer: "input",
    x: 15,
    y: 25,
    icon: Database,
    title: "Enterprise Data Integration",
    subtitle: "Transform raw data into intelligent insights",
    capabilities: [
      "Real-time streaming analytics with sub-second latency for mission-critical applications",
      "Multi-source aggregation across SQL, NoSQL, and data lake architectures",
      "Automated ETL pipelines with built-in data quality validation and monitoring",
      "AI-optimized data preprocessing and feature engineering at scale",
    ],
    technologies: ["PostgreSQL", "MongoDB", "Apache Kafka", "Snowflake", "Delta Lake"],
  },
  {
    id: "documents",
    label: "Documents & Knowledge",
    layer: "input",
    x: 15,
    y: 50,
    icon: FileText,
    title: "Intelligent Document Processing",
    subtitle: "Extract meaning from unstructured content",
    capabilities: [
      "Advanced OCR and document understanding with 99%+ accuracy across formats",
      "Semantic search and retrieval across millions of documents in milliseconds",
      "Automated knowledge graph construction from enterprise documentation",
      "Multi-language support with context-aware translation and summarization",
    ],
    technologies: ["Tesseract", "Elasticsearch", "LangChain", "Pinecone", "Weaviate"],
  },
  {
    id: "systems",
    label: "External Systems",
    layer: "input",
    x: 15,
    y: 75,
    icon: Share2,
    title: "Seamless System Integration",
    subtitle: "Connect your entire tech ecosystem",
    capabilities: [
      "Pre-built connectors for 200+ enterprise platforms and SaaS applications",
      "Custom API development with REST, GraphQL, and webhook support",
      "Event-driven architectures for real-time synchronization across systems",
      "Enterprise-grade security with OAuth 2.0, SSO, and encrypted data transit",
    ],
    technologies: ["Zapier", "MuleSoft", "REST APIs", "GraphQL", "RabbitMQ"],
  },

  /* ---------------- HIDDEN LAYER ---------------- */
  {
    id: "llm",
    label: "LLM Intelligence",
    layer: "hidden",
    x: 50,
    y: 20,
    icon: Brain,
    title: "Large Language Model Orchestration",
    subtitle: "Production-grade AI reasoning at enterprise scale",
    capabilities: [
      "Multi-model deployment with GPT-4, Claude, and custom fine-tuned models",
      "Context-aware prompt engineering with retrieval-augmented generation (RAG)",
      "Cost-optimized inference routing based on complexity and latency requirements",
      "Continuous learning pipelines with human feedback integration and model monitoring",
    ],
    technologies: ["OpenAI API", "Anthropic Claude", "Hugging Face", "LangChain", "LlamaIndex"],
  },
  {
    id: "agents",
    label: "AI Agents",
    layer: "hidden",
    x: 50,
    y: 40,
    icon: Sparkles,
    title: "Autonomous Agent Systems",
    subtitle: "Self-directed AI that executes complex workflows",
    capabilities: [
      "Goal-oriented agents with planning, execution, and self-correction capabilities",
      "Multi-agent collaboration frameworks for distributed problem-solving",
      "Human-in-the-loop systems with intelligent escalation and approval workflows",
      "Memory systems for persistent context and learning across conversations",
    ],
    technologies: ["AutoGPT", "LangGraph", "CrewAI", "Semantic Kernel", "AgentGPT"],
  },
  {
    id: "reasoning",
    label: "Reasoning Engine",
    layer: "hidden",
    x: 50,
    y: 60,
    icon: GitBranch,
    title: "Advanced Decision Intelligence",
    subtitle: "Strategic reasoning and automated decision-making",
    capabilities: [
      "Graph-based reasoning with causal inference and probabilistic modeling",
      "Dynamic tool selection and orchestration for complex multi-step tasks",
      "Chain-of-thought prompting with verified reasoning paths and explanations",
      "Real-time decision trees with A/B testing and continuous optimization",
    ],
    technologies: ["Neo4j", "NetworkX", "PyTorch", "TensorFlow", "LangChain"],
  },
  {
    id: "orchestration",
    label: "Orchestration Layer",
    layer: "hidden",
    x: 50,
    y: 80,
    icon: Cpu,
    title: "Workflow Automation Engine",
    subtitle: "Coordinate AI systems at enterprise scale",
    capabilities: [
      "Distributed task scheduling with fault tolerance and automatic retry logic",
      "Resource optimization with intelligent load balancing and auto-scaling",
      "End-to-end observability with real-time monitoring and alerting dashboards",
      "Version control for AI workflows with rollback and audit trail capabilities",
    ],
    technologies: ["Apache Airflow", "Prefect", "Temporal", "Kubernetes", "Docker"],
  },

  /* ---------------- OUTPUT LAYER ---------------- */
  {
    id: "cloud",
    label: "Cloud Platforms",
    layer: "output",
    x: 85,
    y: 37.5,
    icon: Cloud,
    title: "Scalable Cloud Infrastructure",
    subtitle: "Deploy AI solutions with confidence",
    capabilities: [
      "Multi-cloud deployment across AWS, Azure, and GCP with unified management",
      "Auto-scaling infrastructure that adapts to demand with 99.99% uptime SLA",
      "Serverless architectures for cost-efficient, event-driven AI applications",
      "Global CDN integration for low-latency access across all geographic regions",
    ],
    technologies: ["AWS Lambda", "Azure Functions", "Google Cloud Run", "Vercel", "Cloudflare"],
  },
  {
    id: "infrastructure",
    label: "Infrastructure & APIs",
    layer: "output",
    x: 85,
    y: 62.5,
    icon: Server,
    title: "Enterprise API Delivery",
    subtitle: "Production-ready endpoints with enterprise guarantees",
    capabilities: [
      "RESTful and GraphQL APIs with comprehensive documentation and SDKs",
      "Rate limiting, caching, and CDN optimization for global performance",
      "Enterprise security with API keys, JWT authentication, and role-based access",
      "Real-time WebSocket connections for streaming AI responses and updates",
    ],
    technologies: ["FastAPI", "Express.js", "Nginx", "Redis", "PostgreSQL"],
  },
];

/* =========================================================
   GRAPH TOPOLOGY
   ---------------------------------------------------------
   Edges are derived, not manually authored.
   This enforces a strictly layered neural architecture:
   Input → Hidden → Output
   ========================================================= */

const inputNodes = nodes.filter((n) => n.layer === "input");
const hiddenNodes = nodes.filter((n) => n.layer === "hidden");
const outputNodes = nodes.filter((n) => n.layer === "output");

export const edges = {
  // Fully connected: Input → Hidden (3 × 4)
  inputToHidden: inputNodes.flatMap((input) =>
    hiddenNodes.map((hidden) => ({
      from: input.id,
      to: hidden.id,
    }))
  ),

  // Fully connected: Hidden → Output (4 × 2)
  hiddenToOutput: hiddenNodes.flatMap((hidden) =>
    outputNodes.map((output) => ({
      from: hidden.id,
      to: output.id,
    }))
  ),
};
