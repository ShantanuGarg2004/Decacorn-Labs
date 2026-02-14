export const STACK_LAYERS = [
  {
    id: "integration",
    index: 0,
    title: "Integration Layer",
    subtitle: "API Gateway & Service Mesh",
    leftLabel: "Integration\nLayer",
    rightLabel: "Service\nMesh",
    description:
      "Unified access layer for AI services with authentication, rate limiting, and protocol translation across all infrastructure components.",
    capabilities: [
      "RESTful and gRPC API endpoints with automatic schema validation",
      "OAuth 2.0 and API key authentication with role-based access control",
      "Request routing, load balancing, and circuit breaker patterns",
      "Protocol translation between HTTP, WebSocket, and message queues",
    ],
    technologies: [
      "Kong Gateway",
      "Istio Mesh",
      "GraphQL Federation",
      "Apache Kafka",
      "Redis Cache",
    ],
  },
  {
    id: "data",
    index: 1,
    title: "Data Layer",
    subtitle: "Storage & Processing Pipeline",
    leftLabel: "Data\nLayer",
    rightLabel: "Vector\nStorage",
    description:
      "Distributed data infrastructure for ingestion, transformation, and retrieval at petabyte scale with real-time processing capabilities.",
    capabilities: [
      "Real-time streaming ingestion with exactly-once semantics",
      "Petabyte-scale object storage with automatic tiering",
      "Vector embeddings store with semantic search capabilities",
      "ETL pipelines with lineage tracking and data versioning",
    ],
    technologies: [
      "PostgreSQL + pgvector",
      "Apache Spark",
      "MinIO Storage",
      "Apache Airflow",
      "Pinecone/Weaviate",
    ],
  },
  {
    id: "intelligence",
    index: 2,
    title: "Intelligence Layer",
    subtitle: "Model Orchestration & Inference",
    leftLabel: "Intelligence\nLayer",
    rightLabel: "ML\nRuntime",
    description:
      "Multi-model serving infrastructure with dynamic routing and optimization for cost-effective, low-latency AI inference at scale.",
    capabilities: [
      "Multi-framework model serving with A/B testing support",
      "Intelligent model selection based on cost and latency",
      "GPU resource pooling with automatic scaling",
      "Prompt caching and response streaming optimization",
    ],
    technologies: [
      "TensorFlow Serving",
      "NVIDIA Triton",
      "vLLM",
      "Ray Serve",
      "ONNX Runtime",
    ],
  },
  {
    id: "deployment",
    index: 3,
    title: "Deployment Layer",
    subtitle: "Orchestration & Observability",
    leftLabel: "Deployment\nLayer",
    rightLabel: "",
    description:
      "Container orchestration with monitoring, logging, and automated incident response for zero-downtime deployments and real-time observability.",
    capabilities: [
      "Zero-downtime deployments with automated rollback",
      "Horizontal pod autoscaling based on custom metrics",
      "Distributed tracing across service boundaries",
      "Real-time alerting with anomaly detection",
    ],
    technologies: [
      "Kubernetes",
      "Prometheus + Grafana",
      "OpenTelemetry",
      "ArgoCD",
      "PagerDuty",
    ],
  },
] as const;