import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { SectionContact } from './components/SectionContact.tsx';
import { SectionRequirements } from './components/SectionRequirements.tsx';
import { SectionBudgetTiming } from './components/SectionBudgetTiming.tsx';
import { SectionAdditional } from './components/SectionAdditional.tsx';
import { SuccessView } from './components/SuccessView.tsx';
import { WEBHOOK_URL, FORM_SOURCE } from './config.ts';
import { LeadFormData, FormErrors, FormSubmissionState } from './types.ts';
import { ArrowRight, Loader2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import studioBg from './assets/images/luxury_dark_studio_1789926944662.jpg';

const INITIAL_FORM_STATE: Omit<LeadFormData, 'submitted_at' | 'source'> = {
  full_name: '',
  email: '',
  phone: '',
  need: '',
  budget_range: '',
  budget_custom: '',
  budget_status: '',
  timeline: '',
  timeline_custom: '',
  decision_stage: '',
  location: '',
  message: '',
};

export default function App() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<FormSubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [lastSubmittedPayload, setLastSubmittedPayload] = useState<LeadFormData | null>(null);

  // Handle field update
  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for field as user types
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }

    if (submissionState === 'error') {
      setSubmissionState('idle');
      setErrorMessage('');
    }
  };

  // Validate required fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Please provide your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address (e.g. name@company.com).';
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a contact phone number.';
    } else if (formData.phone.trim().length < 6) {
      newErrors.phone = 'Please enter a complete phone number.';
    }

    if (!formData.need.trim()) {
      newErrors.need = 'Please describe what product, service, or specifications you need.';
    } else if (formData.need.trim().length < 5) {
      newErrors.need = 'Please provide a bit more detail about your requirements.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent accidental double clicks
    if (submissionState === 'submitting') {
      return;
    }

    const isValid = validateForm();
    if (!isValid) {
      // Scroll to first invalid field
      const firstErrorKey = Object.keys(errors)[0] || 'need';
      const el = document.getElementById(`field-${firstErrorKey.replace('_', '-')}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
      return;
    }

    setSubmissionState('submitting');
    setErrorMessage('');

    // Construct the payload with exact specifications
    const payload: LeadFormData = {
      full_name: formData.full_name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      need: formData.need.trim(),
      budget_range: formData.budget_range,
      budget_custom: formData.budget_custom.trim(),
      budget_status: formData.budget_status,
      timeline: formData.timeline,
      timeline_custom: formData.timeline_custom.trim(),
      decision_stage: formData.decision_stage,
      location: formData.location.trim(),
      message: formData.message.trim(),
      submitted_at: new Date().toISOString(),
      source: FORM_SOURCE,
    };

    // Controller for request timeout (25 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // n8n returns 200 OK on successful webhook receipt
      if (response.ok) {
        setLastSubmittedPayload(payload);
        setSubmissionState('success');
      } else {
        const errorText = await response.text().catch(() => '');
        console.error('n8n Webhook responded with HTTP error:', response.status, errorText);
        setSubmissionState('error');
        setErrorMessage(
          `We couldn't submit your request right now. (Status ${response.status}). Please try again.`
        );
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      console.error('Webhook transmission failure:', err);

      let customerMessage = "We couldn't submit your request right now. Please try again.";

      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          customerMessage = 'The request timed out. Please check your network connection and try again.';
        } else if (err.message && err.message.toLowerCase().includes('failed to fetch')) {
          customerMessage =
            "We couldn't reach the submission endpoint. This can happen if the development tunnel is temporarily paused or blocking cross-origin requests. Please verify and try again.";
        }
      }

      setSubmissionState('error');
      setErrorMessage(customerMessage);
    }
  };

  // Reset form to submit another enquiry
  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setSubmissionState('idle');
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper for developers to test against n8n with realistic test data in 1 click
  const handleFillSample = () => {
    setFormData({
      full_name: 'John Doe',
      email: 'john@example.com',
      phone: '+234 800 000 0000',
      need: 'We need 20 units of the 5000L stainless steel model with delivery to our facility.',
      budget_range: '₦5M – ₦10M',
      budget_custom: '',
      budget_status: 'Budget is approved and available',
      timeline: 'Within 1 week',
      timeline_custom: '',
      decision_stage: 'Ready to proceed',
      location: 'Lagos, Nigeria',
      message: 'Budget has already been approved. We can pay 80% upfront and 20% on delivery.',
    });
    setErrors({});
    setSubmissionState('idle');
    setErrorMessage('');
  };

  // Live preview payload for developer bar
  const livePreviewPayload: LeadFormData = {
    ...formData,
    submitted_at: new Date().toISOString(),
    source: FORM_SOURCE,
  };

  return (
    <div className="relative min-h-screen bg-[#090B10] text-zinc-100 overflow-x-hidden selection:bg-[#D8B18A] selection:text-black">
      {/* Background Image Layer inspired by the reference image */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={studioBg}
          alt="Studio Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 sm:opacity-40 filter blur-[1px] transform scale-105"
        />
        {/* Dark radial and gradient overlays for luxury contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090B10]/80 via-[#0B0D14]/90 to-[#090B10]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(216,177,138,0.12)_0%,_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(15,20,30,0.8)_0%,_transparent_70%)]" />
      </div>

      <main className="relative z-10 min-h-screen py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Header />

          <AnimatePresence mode="wait">
            {submissionState === 'success' && lastSubmittedPayload ? (
              <SuccessView key="success-view" data={lastSubmittedPayload} onReset={handleReset} />
            ) : (
              <motion.div
                key="form-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl bg-[#12151e]/85 backdrop-blur-2xl border border-white/[0.12] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Form Top Accent Bar with Metallic Bronze Gradient */}
                <div className="h-1 bg-gradient-to-r from-transparent via-[#D8B18A] to-transparent w-full opacity-80" />

                <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-10 space-y-10">
                  {/* Section 01: Contact Information */}
                  <SectionContact
                    fullName={formData.full_name}
                    email={formData.email}
                    phone={formData.phone}
                    location={formData.location}
                    errors={errors}
                    onChange={handleFieldChange}
                  />

                  {/* Section 02: Your Requirements */}
                  <SectionRequirements
                    need={formData.need}
                    errors={errors}
                    onChange={handleFieldChange}
                  />

                  {/* Section 03: Budget & Timing */}
                  <SectionBudgetTiming
                    budgetRange={formData.budget_range}
                    budgetCustom={formData.budget_custom}
                    budgetStatus={formData.budget_status}
                    timeline={formData.timeline}
                    timelineCustom={formData.timeline_custom}
                    decisionStage={formData.decision_stage}
                    onChange={handleFieldChange}
                  />

                  {/* Section 04: Additional Details */}
                  <SectionAdditional
                    message={formData.message}
                    onChange={handleFieldChange}
                  />

                  {/* Error Banner if submission failed */}
                  <AnimatePresence>
                    {submissionState === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        role="alert"
                        className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200 flex items-start gap-3 shadow-lg"
                      >
                        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        <div className="space-y-1 text-sm">
                          <p className="font-semibold text-rose-100">Submission Unsuccessful</p>
                          <p className="text-rose-300 leading-relaxed text-xs sm:text-sm">{errorMessage}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form Actions */}
                  <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div className="order-2 sm:order-1 flex items-center gap-2 text-xs text-zinc-400 text-center sm:text-left">
                      <ShieldCheck className="w-4 h-4 text-[#D8B18A] shrink-0 hidden sm:block" />
                      <span>
                        Official engineering assessment. All details remain strictly confidential under NDA.
                      </span>
                    </div>

                    {/* Executive Submit Button styled like the reference "Sign In" button */}
                    <motion.button
                      id="submit-button"
                      type="submit"
                      disabled={submissionState === 'submitting'}
                      whileHover={{ scale: submissionState === 'submitting' ? 1 : 1.015 }}
                      whileTap={{ scale: submissionState === 'submitting' ? 1 : 0.985 }}
                      className="group relative w-full sm:w-auto min-w-[240px] order-1 sm:order-2 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#24211b] via-[#483928] to-[#24211b] hover:from-[#352c1e] hover:via-[#5c4a35] hover:to-[#352c1e] text-[#f7e4ce] font-semibold text-sm transition-all duration-300 border border-[#D8B18A]/40 hover:border-[#D8B18A]/80 shadow-[0_4px_25px_rgba(216,177,138,0.2)] focus:outline-none focus:ring-2 focus:ring-[#D8B18A]/60 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {/* Subtle button sheen */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-white/[0.04] to-white/[0.12] pointer-events-none" />

                      {submissionState === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#D8B18A]" />
                          <span>Dispatching audit request...</span>
                        </>
                      ) : (
                        <>
                          <span className="tracking-wide">Request Power Audit</span>
                          <ArrowRight className="w-4 h-4 text-[#D8B18A] group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Authentic Corporate Footer */}
          <footer className="mt-12 pt-8 border-t border-white/[0.07] text-zinc-500 text-xs">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div>
                <p className="font-semibold text-zinc-300 text-sm">Voltix Power Systems Limited</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  RC: 1782941 • COREN Registered Renewable Energy Engineers • ISO 9001:2015 Compliant
                </p>
              </div>
              <div className="text-[11px] text-zinc-400 flex flex-col md:items-end gap-0.5">
                <p>Lagos: Plot 14 Commercial Ave, Ikeja GRA | Abuja: Churchgate Towers, CBD</p>
                <p className="text-[#D8B18A]">WhatsApp / Direct Engineering Desk: +234 814 900 2480</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-600">
              <p>© {new Date().getFullYear()} Voltix Power Systems Ltd. All rights reserved.</p>
              <p className="text-zinc-500">
                Encrypted n8n Lead Qualification Protocol Active
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

