import React from 'react';
import { SectionHeader } from './SectionHeader.tsx';
import { AlertCircle, HelpCircle } from 'lucide-react';
import { FormErrors } from '../types.ts';
import { motion, AnimatePresence } from 'motion/react';

interface SectionRequirementsProps {
  need: string;
  errors: FormErrors;
  onChange: (field: string, value: string) => void;
}

export const SectionRequirements: React.FC<SectionRequirementsProps> = ({
  need,
  errors,
  onChange,
}) => {
  const charCount = need.trim().length;

  return (
    <section id="section-requirements" className="space-y-4">
      <SectionHeader
        number="02"
        title="Power & System Requirements"
        subtitle="Specify the capacity, target appliances, battery requirements, or project scope."
      />

      <div className="relative rounded-2xl p-4 sm:p-6 bg-[#141722]/90 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Subtle top ambient glow */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D8B18A]/40 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
          <label
            htmlFor="field-need"
            className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5"
          >
            What power setup or solar solution do you need?
            <span className="text-[#D8B18A] font-bold" title="Required">*</span>
          </label>
          <span className="text-[11px] text-[#D8B18A] font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-[#D8B18A]/10 border border-[#D8B18A]/20">
            Primary Engineering Scope
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 mb-3.5 leading-relaxed font-normal">
          Help our renewable energy engineers size the correct inverter, solar PV panel array, and lithium storage bank.
        </p>

        {/* Suggestion pills as visual inspiration */}
        <div className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
          <span className="inline-flex items-center gap-1 text-zinc-400 font-medium mr-1 text-[11px]">
            <HelpCircle className="w-3.5 h-3.5 text-[#D8B18A]" /> Example Solutions:
          </span>
          {[
            'Hybrid Solar System',
            'Lithium LiFePO4 Battery Bank',
            'Inverter (5kVA – 50kVA+)',
            'Commercial Solar Microgrid',
            'Factory / Clinic Power Backup',
            'Full Facility Energy Audit',
          ].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] text-zinc-300 font-medium text-[11px] hover:border-[#D8B18A]/40 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="relative">
          <textarea
            id="field-need"
            name="need"
            required
            rows={5}
            value={need}
            onChange={(e) => onChange('need', e.target.value)}
            placeholder="Tell us what you want to power — for example: 10kVA hybrid solar system with 15kWh LiFePO4 battery for a 4-bedroom duplex in Lekki, running 3 inverter ACs, pumping machine, deep freezer, and lighting. Or 40kVA backup system to cut diesel costs for our hospital/office."
            aria-invalid={!!errors.need}
            aria-describedby={errors.need ? 'error-need' : 'need-helper'}
            className={`w-full p-4 rounded-xl border text-sm text-zinc-100 placeholder:text-zinc-500 bg-[#0E1118]/90 transition-all duration-200 focus:outline-none leading-relaxed resize-y min-h-[140px] ${
              errors.need
                ? 'border-rose-500/80 bg-rose-950/20 ring-1 ring-rose-500/40'
                : 'border-white/[0.08] hover:border-white/20 focus:border-[#D8B18A]/70 focus:ring-2 focus:ring-[#D8B18A]/20 focus:bg-[#12151f]'
            }`}
          />
        </div>

        <div className="mt-2.5 flex flex-wrap items-center justify-between text-xs text-zinc-500 gap-2">
          <AnimatePresence>
            {errors.need ? (
              <motion.p
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                id="error-need"
                className="flex items-center gap-1 text-xs text-rose-400 font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.need}</span>
              </motion.p>
            ) : (
              <p id="need-helper" className="text-zinc-500 text-xs">
                Provide appliance details, current generator size, or target daily runtime.
              </p>
            )}
          </AnimatePresence>

          <div className="font-mono text-[11px] ml-auto">
            {charCount > 0 && (
              <span className={charCount > 40 ? 'text-[#D8B18A] font-medium' : 'text-zinc-500'}>
                {charCount} characters
                {charCount > 40 && ' — detailed specification'}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

