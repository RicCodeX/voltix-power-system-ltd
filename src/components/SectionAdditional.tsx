import React from 'react';
import { SectionHeader } from './SectionHeader.tsx';
import { MessageSquareText, Lightbulb } from 'lucide-react';

interface SectionAdditionalProps {
  message: string;
  onChange: (field: string, value: string) => void;
}

export const SectionAdditional: React.FC<SectionAdditionalProps> = ({
  message,
  onChange,
}) => {
  return (
    <section id="section-additional" className="space-y-4">
      <SectionHeader
        number="04"
        title="Additional Details"
        subtitle="Any logistics, commercial terms, compliance prerequisites, or special context."
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label
            htmlFor="field-message"
            className="text-xs sm:text-sm font-semibold text-zinc-200 flex items-center gap-1.5"
          >
            <MessageSquareText className="w-4 h-4 text-[#D8B18A]" />
            Anything else we should know?
          </label>
          <span className="text-[11px] text-zinc-500 font-medium">Optional</span>
        </div>

        <div className="relative">
          <textarea
            id="field-message"
            name="message"
            rows={4}
            value={message}
            onChange={(e) => onChange('message', e.target.value)}
            placeholder="Tell us any extra details — existing generator rating (e.g. 20kVA Perkins/Mikano), roof type (stone-coated tile, corrugated aluminum, or flat concrete), prepaid meter setup, or preferred inspection time."
            aria-describedby="message-helper"
            className="w-full p-4 rounded-xl border border-white/[0.08] hover:border-white/20 bg-[#131620]/90 text-sm text-zinc-100 placeholder:text-zinc-500 transition-all duration-200 focus:outline-none focus:border-[#D8B18A]/70 focus:ring-2 focus:ring-[#D8B18A]/20 focus:bg-[#161a26] leading-relaxed resize-y min-h-[110px]"
          />
        </div>

        <div
          id="message-helper"
          className="flex items-start gap-2.5 p-3.5 bg-[#171b26]/70 border border-[#D8B18A]/20 rounded-xl text-xs text-zinc-400 leading-relaxed"
        >
          <Lightbulb className="w-4 h-4 text-[#D8B18A] shrink-0 mt-0.5" />
          <span>
            <strong className="text-zinc-200 font-medium">Helpful context:</strong> For example:{" "}
            <em className="text-zinc-300">"We currently spend over ₦450,000 monthly on diesel for our clinic. We want a 15kVA solar setup with lithium backup to keep laboratory equipment and vaccine cold-storage running 24/7."</em>
          </span>
        </div>
      </div>
    </section>
  );
};

