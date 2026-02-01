"use client";

import { motion } from "framer-motion";

export default function Confirmation({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <h3 className="text-xl font-semibold mb-2">Request received</h3>
      <p className="text-white/60 text-sm mb-6">
        Our team will reach out to you shortly.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={onClose}
        className="px-6 py-2 rounded-lg bg-white text-black text-sm"
      >
        Close
      </motion.button>
    </motion.div>
  );
}
