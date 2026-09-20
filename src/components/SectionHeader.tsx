import React from 'react';

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title, subtitle }) => {
  return (
    <div className="border-b border-white/[0.08] pb-3.5 mb-6">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[#181C26] text-[#D8B18A] border border-[#D8B18A]/30 shadow-[0_0_10px_rgba(216,177,138,0.1)]">
          {number}
        </span>
        <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-zinc-100">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 pl-9 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

