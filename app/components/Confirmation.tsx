"use client";

import { motion } from "framer-motion";

export default function Confirmation({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="p-8 md:p-10 text-center"
    >
      {/* Success indicator */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center
                   bg-white/10 border border-white/20"
      >
        <span className="text-white text-xl">✓</span>
      </motion.div>

      {/* Heading */}
      <h3 className="text-xl font-semibold text-white mb-2">
        Request received
      </h3>

      {/* Primary message */}
      <p className="text-white/60 text-sm mb-3">
        We’re reviewing your details and will get back to you within 24 hours.
      </p>

      {/* Secondary reassurance */}
      <p className="text-white/40 text-xs mb-6">
        If it’s urgent, you can reply directly to the confirmation email.
      </p>

      {/* Close action */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="px-6 py-2 rounded-lg bg-white text-black text-sm font-medium"
      >
        Close
      </motion.button>
    </motion.div>
  );
}
