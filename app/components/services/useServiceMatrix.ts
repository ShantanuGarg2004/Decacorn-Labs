"use client";

import { useState } from "react";
import { ServiceNode } from "./serviceMap";

/**
 * Controls the active signal within the service neural matrix.
 *
 * One node can be active at a time, representing the current
 * focus of the system. This hook intentionally owns only
 * source state — all visual or relational derivations are
 * handled by consuming components.
 */
export function useServiceMatrix() {
  const [activeNode, setActiveNode] = useState<ServiceNode | null>(null);

  return {
    activeNode,
    setActiveNode,
  };
}
