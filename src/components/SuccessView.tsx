import React from 'react';
import { CheckCircle2, RotateCcw, Calendar, Mail, Phone, FileText, Check } from 'lucide-react';
import { LeadFormData } from '../types.ts';
import { motion } from 'motion/react';

interface SuccessViewProps {
  data: LeadFormData;
  onReset: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ data, onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -16 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#12151d]/90 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(0,0,0,0.5)] p-6 sm:p-12 text-center max-w-xl mx-auto relative overflow-hidden"
    >
      {/* Subtle top edge metallic glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D8B18A]/50 to-transparent pointer-events-none" />

      {/* Animated Glowing Ring & Checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
        className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full bg-[#D8B18A]/20 blur-xl animate-pulse" />
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#2a241b] via-[#483928] to-[#1c1813] border border-[#D8B18A]/60 flex items-center justify-center shadow-[0_0_25px_rgba(216,177,138,0.3)]">
          <Check className="w-8 h-8 text-[#f7e4ce] stroke-[2.5]" />
        </div>
      </motion.div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
        Engineering Request Dispatched
      </h2>

      <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
        Thank you, <span className="text-zinc-100 font-semibold">{data.full_name}</span>. Your solar & power specifications have been routed to the Voltix engineering team. A technical engineer is reviewing your load profile and will follow up shortly.
      </p>

      {/* Confirmation Summary Card */}
      <div className="mt-8 text-left bg-[#0D1017]/90 rounded-2xl p-5 sm:p-6 border border-white/[0.08] text-xs sm:text-sm space-y-3.5 shadow-inner">
        <div className="font-semibold text-zinc-300 uppercase tracking-wider text-[11px] pb-2.5 border-b border-white/[0.08] flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[#D8B18A]">
            <CheckCircle2 className="w-3.5 h-3.5" /> Transmitted Project Specification
          </span>
          <span className="font-mono text-zinc-500 font-normal">
            {new Date(data.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-zinc-300">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span className="truncate">{data.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span className="truncate">{data.phone}</span>
          </div>
          {data.timeline && (
            <div className="flex items-center gap-2 sm:col-span-2 text-zinc-400">
              <Calendar className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>Target Timeline: <strong className="text-zinc-200">{data.timeline}</strong></span>
            </div>
          )}
          {data.budget_range && (
            <div className="flex items-center gap-2 sm:col-span-2 text-zinc-400">
              <span className="text-[#D8B18A] font-bold text-xs">₦</span>
              <span>Budget Estimate: <strong className="text-zinc-200">{data.budget_range}</strong></span>
            </div>
          )}
        </div>

        <div className="pt-2.5 border-t border-white/[0.08]">
          <div className="flex items-start gap-2">
            <FileText className="w-3.5 h-3.5 text-[#D8B18A] shrink-0 mt-0.5" />
            <p className="text-zinc-300 line-clamp-3 italic leading-relaxed">
              "{data.need}"
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-zinc-200 hover:bg-white/[0.08] hover:border-white/30 font-medium text-sm transition focus:outline-none focus:ring-2 focus:ring-[#D8B18A] cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#D8B18A]" />
          Submit Another Power Assessment
        </button>
      </div>
    </motion.div>
  );
};

