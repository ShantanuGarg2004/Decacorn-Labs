"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronRight, Check, X, ChevronLeft, Building2, User, FileText } from "lucide-react";

type FormData = {
  // Personal Info
  name: string;
  email: string;
  phone: string;
  // Company/Project Details
  company: string;
  companyDomain: string;
  service: string;
  // Brief Description
  description: string;
};

type StepKey = 'personal' | 'company' | 'description';

const COMPANY_DOMAINS = [
  "Technology & Software",
  "Healthcare & Medical",
  "Finance & Banking",
  "E-commerce & Retail",
  "Education & Training",
  "Manufacturing & Industrial",
  "Marketing & Advertising",
  "Consulting & Services",
  "Real Estate & Construction",
  "Other",
];

const PROJECT_DOMAINS = [
  "AI & Machine Learning",
  "Web Application",
  "Mobile Application",
  "Cloud Infrastructure",
  "Data Analytics",
  "Automation & Workflows",
  "Custom Software",
  "System Integration",
  "Other",
];

export default function GetStartedModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState<StepKey>('personal');
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    companyDomain: "",
    service: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setCurrentStep('personal');
      setSubmitted(false);
    }
  }, [open]);

  // Email validation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email address" }));
      } else {
        setErrors((e) => {
          const { email, ...rest } = e;
          return rest;
        });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [form.email]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isStepValid = (step: StepKey): boolean => {
    switch (step) {
      case 'personal':
        return !!(form.name && form.email && !errors.email);
      case 'company':
        return !!(form.company && form.companyDomain && form.service);
      case 'description':
        return !!form.description;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 'personal' && isStepValid('personal')) {
      setCurrentStep('company');
    } else if (currentStep === 'company' && isStepValid('company')) {
      setCurrentStep('description');
    }
  };

  const handleBack = () => {
    if (currentStep === 'company') {
      setCurrentStep('personal');
    } else if (currentStep === 'description') {
      setCurrentStep('company');
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid('description') || submitting) return;

    setSubmitting(true);

    try {
      await fetch("/api/get-started", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      setSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      setSubmitting(false);
      console.error("Submission error:", error);
    }
  };

  const steps: { key: StepKey; title: string; icon: typeof User }[] = [
    { key: 'personal', title: 'Personal Info', icon: User },
    { key: 'company', title: 'Company Details', icon: Building2 },
    { key: 'description', title: 'Project Brief', icon: FileText },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-lg overflow-hidden bg-black border border-white/10 shadow-2xl"
              style={{
                maxHeight: 'calc(100vh - 2rem)',
              }}
            >
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <X size={18} className="text-white/70" />
              </motion.button>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col"
                    style={{
                      maxHeight: 'calc(100vh - 2rem)',
                    }}
                  >
                    {/* Header with Progress */}
                    <div className="px-8 pt-8 pb-6 border-b border-white/10">
                      <h2 className="text-2xl font-semibold text-white mb-2">
                        Let's build something real
                      </h2>
                      <p className="text-white/50 text-sm mb-6">
                        Tell us about your vision and we'll bring it to life
                      </p>

                      {/* Progress Bar */}
                      <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-white rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        />
                      </div>

                      {/* Step Indicators */}
                      <div className="flex items-center justify-between mt-4">
                        {steps.map((step, index) => {
                          const Icon = step.icon;
                          const isCompleted = index < currentStepIndex;
                          const isCurrent = index === currentStepIndex;
                          const isAccessible = index <= currentStepIndex;

                          return (
                            <div key={step.key} className="flex items-center flex-1">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                                    isCompleted
                                      ? 'bg-white border-white'
                                      : isCurrent
                                      ? 'bg-white/10 border-white'
                                      : 'bg-white/5 border-white/20'
                                  }`}
                                >
                                  {isCompleted ? (
                                    <Check size={16} className="text-black" strokeWidth={3} />
                                  ) : (
                                    <Icon
                                      size={16}
                                      className={isCurrent ? 'text-white' : 'text-white/30'}
                                    />
                                  )}
                                </div>
                                <span
                                  className={`text-xs font-medium ${
                                    isAccessible ? 'text-white' : 'text-white/30'
                                  }`}
                                >
                                  {step.title}
                                </span>
                              </div>
                              {index < steps.length - 1 && (
                                <div className="flex-1 h-px bg-white/10 mx-3" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Form Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto px-8 py-6">
                      <AnimatePresence mode="wait">
                        {currentStep === 'personal' && (
                          <StepContent key="personal">
                            <StepTitle>Personal Information</StepTitle>
                            <div className="space-y-4 mt-6">
                              <FormInput
                                name="name"
                                placeholder="Full name"
                                required
                                value={form.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("name")}
                                onBlur={() => setFocusedField(null)}
                                focused={focusedField === "name"}
                              />

                              <div>
                                <FormInput
                                  name="email"
                                  type="email"
                                  placeholder="Email address"
                                  required
                                  value={form.email}
                                  onChange={handleChange}
                                  onFocus={() => setFocusedField("email")}
                                  onBlur={() => setFocusedField(null)}
                                  focused={focusedField === "email"}
                                  error={!!errors.email}
                                />
                                <AnimatePresence>
                                  {errors.email && (
                                    <motion.p
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="text-red-400 text-xs mt-2"
                                    >
                                      {errors.email}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>

                              <FormInput
                                name="phone"
                                type="tel"
                                placeholder="Phone number (optional)"
                                value={form.phone}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("phone")}
                                onBlur={() => setFocusedField(null)}
                                focused={focusedField === "phone"}
                              />
                            </div>
                          </StepContent>
                        )}

                        {currentStep === 'company' && (
                          <StepContent key="company">
                            <StepTitle>Company & Project Details</StepTitle>
                            <div className="space-y-4 mt-6">
                              <FormInput
                                name="company"
                                placeholder="Company name"
                                required
                                value={form.company}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("company")}
                                onBlur={() => setFocusedField(null)}
                                focused={focusedField === "company"}
                              />

                              {/* Company Domain Dropdown */}
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                                  onBlur={() => setTimeout(() => setCompanyDropdownOpen(false), 200)}
                                  className="w-full rounded-lg px-4 py-3.5 text-sm text-left transition-all outline-none border flex items-center justify-between"
                                  style={{
                                    background: companyDropdownOpen
                                      ? "rgba(255, 255, 255, 0.08)"
                                      : "rgba(255, 255, 255, 0.04)",
                                    borderColor: companyDropdownOpen
                                      ? "rgba(255, 255, 255, 0.3)"
                                      : "rgba(255, 255, 255, 0.1)",
                                    color: form.companyDomain
                                      ? "rgba(255, 255, 255, 0.9)"
                                      : "rgba(255, 255, 255, 0.4)",
                                  }}
                                >
                                  <span>{form.companyDomain || "Company domain *"}</span>
                                  <ChevronRight
                                    size={16}
                                    className={`transition-transform ${
                                      companyDropdownOpen ? 'rotate-90' : ''
                                    }`}
                                  />
                                </button>

                                <AnimatePresence>
                                  {companyDropdownOpen && (
                                    <motion.div
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      transition={{ duration: 0.15 }}
                                      className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-lg overflow-hidden shadow-xl z-10"
                                    >
                                      <div className="max-h-60 overflow-y-auto">
                                        {COMPANY_DOMAINS.map((domain) => (
                                          <button
                                            key={domain}
                                            type="button"
                                            onClick={() => {
                                              setForm({ ...form, companyDomain: domain });
                                              setCompanyDropdownOpen(false);
                                            }}
                                            className="w-full px-4 py-3 text-sm text-left hover:bg-white/5 transition-colors text-white/80 border-b border-white/5 last:border-0"
                                          >
                                            {domain}
                                          </button>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              {/* Project Domain Dropdown */}
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                                  onBlur={() => setTimeout(() => setProjectDropdownOpen(false), 200)}
                                  className="w-full rounded-lg px-4 py-3.5 text-sm text-left transition-all outline-none border flex items-center justify-between"
                                  style={{
                                    background: projectDropdownOpen
                                      ? "rgba(255, 255, 255, 0.08)"
                                      : "rgba(255, 255, 255, 0.04)",
                                    borderColor: projectDropdownOpen
                                      ? "rgba(255, 255, 255, 0.3)"
                                      : "rgba(255, 255, 255, 0.1)",
                                    color: form.service
                                      ? "rgba(255, 255, 255, 0.9)"
                                      : "rgba(255, 255, 255, 0.4)",
                                  }}
                                >
                                  <span>{form.service || "Project domain *"}</span>
                                  <ChevronRight
                                    size={16}
                                    className={`transition-transform ${
                                      projectDropdownOpen ? 'rotate-90' : ''
                                    }`}
                                  />
                                </button>

                                <AnimatePresence>
                                  {projectDropdownOpen && (
                                    <motion.div
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      transition={{ duration: 0.15 }}
                                      className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-lg overflow-hidden shadow-xl z-10"
                                    >
                                      <div className="max-h-60 overflow-y-auto">
                                        {PROJECT_DOMAINS.map((domain) => (
                                          <button
                                            key={domain}
                                            type="button"
                                            onClick={() => {
                                              setForm({ ...form, service: domain });
                                              setProjectDropdownOpen(false);
                                            }}
                                            className="w-full px-4 py-3 text-sm text-left hover:bg-white/5 transition-colors text-white/80 border-b border-white/5 last:border-0"
                                          >
                                            {domain}
                                          </button>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </StepContent>
                        )}

                        {currentStep === 'description' && (
                          <StepContent key="description">
                            <StepTitle>Project Description</StepTitle>
                            <div className="mt-6">
                              <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("description")}
                                onBlur={() => setFocusedField(null)}
                                placeholder="Tell us about your project vision, goals, and any specific requirements *"
                                rows={8}
                                className="w-full rounded-lg px-4 py-3.5 text-sm transition-all outline-none border resize-none"
                                style={{
                                  background:
                                    focusedField === "description"
                                      ? "rgba(255, 255, 255, 0.08)"
                                      : "rgba(255, 255, 255, 0.04)",
                                  borderColor:
                                    focusedField === "description"
                                      ? "rgba(255, 255, 255, 0.3)"
                                      : "rgba(255, 255, 255, 0.1)",
                                  color: "rgba(255, 255, 255, 0.9)",
                                }}
                              />
                              <p className="text-xs text-white/40 mt-2">
                                Minimum 20 characters
                              </p>
                            </div>
                          </StepContent>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Footer with Navigation */}
                    <div className="px-8 py-6 border-t border-white/10 flex items-center justify-between gap-4">
                      {currentStepIndex > 0 ? (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={handleBack}
                          className="px-6 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 border border-white/10 hover:bg-white/5 text-white"
                        >
                          <ChevronLeft size={16} />
                          Back
                        </motion.button>
                      ) : (
                        <div />
                      )}

                      {currentStep !== 'description' ? (
                        <motion.button
                          disabled={!isStepValid(currentStep)}
                          onClick={handleNext}
                          whileHover={isStepValid(currentStep) ? { scale: 1.02 } : {}}
                          whileTap={isStepValid(currentStep) ? { scale: 0.98 } : {}}
                          className="px-8 py-3 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                          style={{
                            background: isStepValid(currentStep)
                              ? "white"
                              : "rgba(255, 255, 255, 0.1)",
                            color: isStepValid(currentStep) ? "#000" : "rgba(255, 255, 255, 0.3)",
                            cursor: isStepValid(currentStep) ? "pointer" : "not-allowed",
                          }}
                        >
                          Continue
                          <ChevronRight size={16} />
                        </motion.button>
                      ) : (
                        <motion.button
                          disabled={!isStepValid('description') || form.description.length < 20 || submitting}
                          onClick={handleSubmit}
                          whileHover={isStepValid('description') && form.description.length >= 20 && !submitting ? { scale: 1.02 } : {}}
                          whileTap={isStepValid('description') && form.description.length >= 20 && !submitting ? { scale: 0.98 } : {}}
                          className="px-8 py-3 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                          style={{
                            background: isStepValid('description') && form.description.length >= 20 && !submitting
                              ? "white"
                              : "rgba(255, 255, 255, 0.1)",
                            color: isStepValid('description') && form.description.length >= 20 && !submitting ? "#000" : "rgba(255, 255, 255, 0.3)",
                            cursor: isStepValid('description') && form.description.length >= 20 && !submitting ? "pointer" : "not-allowed",
                          }}
                        >
                          {submitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full"
                              />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit
                              <Check size={16} />
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <Confirmation onClose={onClose} />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* HELPER COMPONENTS */
function StepContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold text-white">
      {children}
    </h3>
  );
}

function FormInput({
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
  onFocus,
  onBlur,
  focused,
  error,
}: {
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  focused: boolean;
  error?: boolean;
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={`${placeholder}${required ? " *" : ""}`}
      className="w-full rounded-lg px-4 py-3.5 text-sm transition-all outline-none border"
      style={{
        background: focused
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(255, 255, 255, 0.04)",
        borderColor: error
          ? "rgba(239, 68, 68, 0.5)"
          : focused
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(255, 255, 255, 0.1)",
        color: "rgba(255, 255, 255, 0.9)",
      }}
    />
  );
}

/* CONFIRMATION COMPONENT */
function Confirmation({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      className="p-12 text-center"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.1,
          duration: 0.5,
          type: "spring",
          stiffness: 200,
        }}
        className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-white/10 border-2 border-white/20"
      >
        <Check size={40} className="text-white" strokeWidth={2.5} />
      </motion.div>

      {/* Text */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold text-white mb-3"
      >
        Thank you for reaching out
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white/60 text-sm mb-8 max-w-md mx-auto leading-relaxed"
      >
        We've received your submission and our team will review your project details. 
        We'll get back to you within 24 hours to discuss next steps.
      </motion.p>

      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 rounded-lg text-sm font-medium transition-all bg-white text-black hover:bg-white/90"
      >
        Close
      </motion.button>
    </motion.div>
  );
}