import React from 'react';
import { ShieldCheck, Clock, Zap, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import emblemImg from '../assets/images/metallic_emblem_1789926957478.jpg';

export const Header: React.FC = () => {
  return (
    <header className="mb-8 text-center max-w-2xl mx-auto pt-2 sm:pt-4">
      {/* Top Corporate Registry Badge */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-2 text-[11px] font-mono tracking-wider text-zinc-400 uppercase mb-4"
      >
        <span className="flex items-center gap-1 text-[#D8B18A]">
          <MapPin className="w-3 h-3" /> Lagos & Abuja, Nigeria
        </span>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-400 font-semibold">RC: 1782941</span>
      </motion.div>

      {/* 3D Metallic Brand Emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center mb-5"
      >
        <div className="relative group">
          {/* Subtle ambient backglow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#d8b18a]/25 via-amber-500/10 to-[#d8b18a]/25 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />
          
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-[#D8B18A]/30 shadow-[0_15px_35px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)] bg-[#12151c]"
          >
            <img
              src={emblemImg}
              alt="Voltix Power Systems Logo Emblem"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform scale-105"
            />
            {/* Top glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/50 pointer-events-none" />
          </motion.div>
        </div>
      </motion.div>

      {/* Company Name & Sector Pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#D8B18A]/30 text-xs font-medium text-zinc-300 mb-3 backdrop-blur-md shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-[#D8B18A] shadow-[0_0_8px_#D8B18A] animate-pulse" />
        <span className="tracking-widest uppercase text-[11px] font-bold text-[#f0dfcc]">
          Voltix Power Systems Ltd
        </span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white"
      >
        Commercial & Residential{' '}
        <span className="bg-gradient-to-r from-[#e8cca8] via-[#f7e3cb] to-[#c79b69] bg-clip-text text-transparent drop-shadow-sm">
          Solar Solutions
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl mx-auto font-normal"
      >
        Request a formal technical quotation and energy audit for hybrid solar, high-capacity lithium storage, or industrial backup power in Nigeria.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-1 text-xs text-zinc-500 font-medium"
      >
        Submitting this form connects directly to our engineering assessment desk.
      </motion.p>

      {/* Trust & Reassurance Badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs text-zinc-300"
      >
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08]">
          <Zap className="w-3.5 h-3.5 text-[#D8B18A]" />
          <span>Tier-1 Lithium & Inverters</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D8B18A]" />
          <span>COREN Certified Engineers</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08]">
          <Clock className="w-3.5 h-3.5 text-[#D8B18A]" />
          <span>2-Hour Assessment SLA</span>
        </div>
      </motion.div>
    </header>
  );
};

