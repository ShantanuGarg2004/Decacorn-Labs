"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  description: string;
};

export default function GetStartedModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hovered, setHovered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* Email debounce validation */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setErrors((e) => ({ ...e, email: "Invalid email address" }));
      } else {
        setErrors((e) => {
          const { email, ...rest } = e;
          return rest;
        });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [form.email]);

  const isValid =
    form.name &&
    form.email &&
    form.company &&
    form.service &&
    Object.keys(errors).length === 0;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!isValid || submitting) return;

    setSubmitting(true);

    await fetch("/api/get-started", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                ✕
              </button>

              {!submitted ? (
                <>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Let’s build something real
                  </h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Tell us how we can reach you.
                  </p>

                  <div className="space-y-4">
                    <Input name="name" placeholder="Your name *" onChange={handleChange} />
                    <Input name="email" placeholder="Email *" onChange={handleChange} />
                    {errors.email && (
                      <p className="text-red-400 text-xs">{errors.email}</p>
                    )}
                    <Input name="phone" placeholder="Phone (optional)" onChange={handleChange} />
                    <Input name="company" placeholder="Company *" onChange={handleChange} />

                    <select
                      name="service"
                      onChange={handleChange}
                      className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-sm text-gray-400"
                    >
                      <option value="">What are you building? *</option>
                      <option value="ai-product">AI Product</option>
                      <option value="saas">SaaS</option>
                      <option value="automation">Automation</option>
                    </select>

                    <textarea
                      name="description"
                      onChange={handleChange}
                      placeholder="Brief description (optional)"
                      className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-sm resize-none min-h-[90px]"
                    />
                  </div>

                  {/* CTA */}
                  <div className="mt-8 flex justify-center">
                    <motion.button
                      disabled={!isValid || submitting}
                      onClick={handleSubmit}
                      onHoverStart={() => isValid && setHovered(true)}
                      onHoverEnd={() => setHovered(false)}
                      className={`px-10 py-3 rounded-xl text-sm font-medium transition ${
                        isValid
                          ? "bg-white text-black hover:bg-gray-200"
                          : "bg-white/10 text-white/40 cursor-not-allowed"
                      }`}
                    >
                      {submitting
                        ? "Sending…"
                        : hovered
                        ? "Start the conversation →"
                        : "Send"}
                    </motion.button>
                  </div>
                </>
              ) : (
                <Confirmation onClose={onClose} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* INPUT */
function Input(props: any) {
  return (
    <input
      {...props}
      className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none"
    />
  );
}

/* CONFIRMATION */
function Confirmation({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-10">
      <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
      <p className="text-gray-400 text-sm mb-6">
        We’ll get back to you shortly.
      </p>
      <button
        onClick={onClose}
        className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm"
      >
        Close
      </button>
    </div>
  );
}
