"use client";

import { useState } from "react";
import { ServiceNode } from "./serviceMap";

export function useServiceMatrix() {
  const [active, setActive] = useState<ServiceNode | null>(null);
  return { active, setActive };
}