import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader.tsx';
import {
  BUDGET_OPTIONS,
  BUDGET_STATUS_OPTIONS,
  TIMELINE_OPTIONS,
  DECISION_STAGE_OPTIONS,
} from '../config.ts';
import { ChevronDown, Plus, Minus, DollarSign, Calendar, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SectionBudgetTimingProps {
  budgetRange: string;
  budgetCustom: string;
  budgetStatus: string;
  timeline: string;
  timelineCustom: string;
  decisionStage: string;
  onChange: (field: string, value: string) => void;
}

export const SectionBudgetTiming: React.FC<SectionBudgetTimingProps> = ({
  budgetRange,
  budgetCustom,
  budgetStatus,
  timeline,
  timelineCustom,
  decisionStage,
  onChange,
}) => {
  const [showCustomBudget, setShowCustomBudget] = useState(Boolean(budgetCustom));
  const [showCustomTimeline, setShowCustomTimeline] = useState(Boolean(timelineCustom));

  return (
    <section id="section-budget-timing" className="space-y-5">
      <SectionHeader
        number="03"
        title="Budget & Timing"
        subtitle="Helps our renewable energy team align equipment tiers, lithium battery sizing, and installation timelines."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Budget Dropdown */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="field-budget-range" className="block text-xs sm:text-sm font-semibold text-zinc-200">
              What's your expected budget?
            </label>
            <span className="text-[11px] text-zinc-500 font-medium">Optional</span>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#D8B18A] transition-colors">
              <DollarSign className="w-4 h-4" />
            </div>
            <select
              id="field-budget-range"
              name="budget_range"
              value={budgetRange}
              onChange={(e) => onChange('budget_range', e.target.value)}
              className="w-full appearance-none pl-10 pr-10 py-3 rounded-xl border border-white/[0.08] hover:border-white/20 bg-[#131620]/90 text-sm text-zinc-100 transition-all duration-200 focus:outline-none focus:border-[#D8B18A]/70 focus:ring-2 focus:ring-[#D8B18A]/20 focus:bg-[#161a26] cursor-pointer"
            >
              <option value="" className="bg-[#141722] text-zinc-400">Select a budget range (Optional)</option>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt} className="bg-[#141722] text-zinc-100">
                  {opt}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Progressive disclosure toggle for specific custom amount */}
          {!showCustomBudget && !budgetCustom && (
            <button
              type="button"
              onClick={() => setShowCustomBudget(true)}
              className="mt-2 text-xs text-zinc-400 hover:text-[#D8B18A] font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#D8B18A]" /> Have a specific budget figure?
            </button>
          )}

          <AnimatePresence>
            {(showCustomBudget || budgetCustom) && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.98 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="mt-3 p-3.5 bg-[#171b26]/90 rounded-xl border border-[#D8B18A]/30 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="field-budget-custom" className="text-xs font-semibold text-[#D8B18A]">
                    Specific budget figure
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      onChange('budget_custom', '');
                      setShowCustomBudget(false);
                    }}
                    className="text-[11px] text-zinc-400 hover:text-rose-400 inline-flex items-center gap-0.5 transition-colors cursor-pointer"
                  >
                    <Minus className="w-3 h-3" /> Remove
                  </button>
                </div>
                <input
                  id="field-budget-custom"
                  type="text"
                  name="budget_custom"
                  value={budgetCustom}
                  onChange={(e) => onChange('budget_custom', e.target.value)}
                  placeholder="e.g. ₦7,500,000"
                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#0E1118] text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#D8B18A] focus:ring-1 focus:ring-[#D8B18A]"
                />
                <p className="mt-1 text-[11px] text-zinc-400">
                  Optional — enter a specific amount if you'd prefer.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Budget Approval Status */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="field-budget-status" className="block text-xs sm:text-sm font-semibold text-zinc-200">
              How ready is the budget?
            </label>
            <span className="text-[11px] text-zinc-500 font-medium">Optional</span>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#D8B18A] transition-colors">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <select
              id="field-budget-status"
              name="budget_status"
              value={budgetStatus}
              onChange={(e) => onChange('budget_status', e.target.value)}
              className="w-full appearance-none pl-10 pr-10 py-3 rounded-xl border border-white/[0.08] hover:border-white/20 bg-[#131620]/90 text-sm text-zinc-100 transition-all duration-200 focus:outline-none focus:border-[#D8B18A]/70 focus:ring-2 focus:ring-[#D8B18A]/20 focus:bg-[#161a26] cursor-pointer"
            >
              <option value="" className="bg-[#141722] text-zinc-400">Select readiness status (Optional)</option>
              {BUDGET_STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt} className="bg-[#141722] text-zinc-100">
                  {opt}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-1.5 text-xs text-zinc-500">
            Helps us understand your internal approvals or allocation state.
          </p>
        </div>

        {/* Timeline Dropdown */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="field-timeline" className="block text-xs sm:text-sm font-semibold text-zinc-200">
              When are you looking to get started?
            </label>
            <span className="text-[11px] text-zinc-500 font-medium">Optional</span>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#D8B18A] transition-colors">
              <Calendar className="w-4 h-4" />
            </div>
            <select
              id="field-timeline"
              name="timeline"
              value={timeline}
              onChange={(e) => onChange('timeline', e.target.value)}
              className="w-full appearance-none pl-10 pr-10 py-3 rounded-xl border border-white/[0.08] hover:border-white/20 bg-[#131620]/90 text-sm text-zinc-100 transition-all duration-200 focus:outline-none focus:border-[#D8B18A]/70 focus:ring-2 focus:ring-[#D8B18A]/20 focus:bg-[#161a26] cursor-pointer"
            >
              <option value="" className="bg-[#141722] text-zinc-400">Select expected timeline (Optional)</option>
              {TIMELINE_OPTIONS.map((opt) => (
                <option key={opt} value={opt} className="bg-[#141722] text-zinc-100">
                  {opt}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Progressive disclosure toggle for specific date */}
          {!showCustomTimeline && !timelineCustom && (
            <button
              type="button"
              onClick={() => setShowCustomTimeline(true)}
              className="mt-2 text-xs text-zinc-400 hover:text-[#D8B18A] font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#D8B18A]" /> Have a fixed delivery or deadline date?
            </button>
          )}

          <AnimatePresence>
            {(showCustomTimeline || timelineCustom) && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.98 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="mt-3 p-3.5 bg-[#171b26]/90 rounded-xl border border-[#D8B18A]/30 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="field-timeline-custom" className="text-xs font-semibold text-[#D8B18A]">
                    Specific delivery or start date?
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      onChange('timeline_custom', '');
                      setShowCustomTimeline(false);
                    }}
                    className="text-[11px] text-zinc-400 hover:text-rose-400 inline-flex items-center gap-0.5 transition-colors cursor-pointer"
                  >
                    <Minus className="w-3 h-3" /> Remove
                  </button>
                </div>
                <input
                  id="field-timeline-custom"
                  type="text"
                  name="timeline_custom"
                  value={timelineCustom}
                  onChange={(e) => onChange('timeline_custom', e.target.value)}
                  placeholder="e.g. Before 15 December"
                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#0E1118] text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#D8B18A] focus:ring-1 focus:ring-[#D8B18A]"
                />
                <p className="mt-1 text-[11px] text-zinc-400">
                  Optional — provide a target date or deadline if applicable.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Decision Readiness Stage */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="field-decision-stage" className="block text-xs sm:text-sm font-semibold text-zinc-200">
              Where are you in the decision process?
            </label>
            <span className="text-[11px] text-zinc-500 font-medium">Optional</span>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#D8B18A] transition-colors">
              <TrendingUp className="w-4 h-4" />
            </div>
            <select
              id="field-decision-stage"
              name="decision_stage"
              value={decisionStage}
              onChange={(e) => onChange('decision_stage', e.target.value)}
              className="w-full appearance-none pl-10 pr-10 py-3 rounded-xl border border-white/[0.08] hover:border-white/20 bg-[#131620]/90 text-sm text-zinc-100 transition-all duration-200 focus:outline-none focus:border-[#D8B18A]/70 focus:ring-2 focus:ring-[#D8B18A]/20 focus:bg-[#161a26] cursor-pointer"
            >
              <option value="" className="bg-[#141722] text-zinc-400">Select decision stage (Optional)</option>
              {DECISION_STAGE_OPTIONS.map((opt) => (
                <option key={opt} value={opt} className="bg-[#141722] text-zinc-100">
                  {opt}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-1.5 text-xs text-zinc-500">
            Enables us to prepare the appropriate technical or commercial materials.
          </p>
        </div>
      </div>
    </section>
  );
};

