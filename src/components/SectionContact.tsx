import React from 'react';
import { SectionHeader } from './SectionHeader.tsx';
import { User, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import { FormErrors } from '../types.ts';
import { motion, AnimatePresence } from 'motion/react';

interface SectionContactProps {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  errors: FormErrors;
  onChange: (field: string, value: string) => void;
}

export const SectionContact: React.FC<SectionContactProps> = ({
  fullName,
  email,
  phone,
  location,
  errors,
  onChange,
}) => {
  return (
    <section id="section-contact" className="space-y-4">
      <SectionHeader
        number="01"
        title="Contact Information"
        subtitle="Direct contact details for project proposal delivery and engineering site survey coordination."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="field-full-name" className="block text-xs sm:text-sm font-semibold text-zinc-200">
              Contact / Company Name <span className="text-[#D8B18A] font-bold" title="Required">*</span>
            </label>
            <span className="text-[11px] text-zinc-500 font-medium">Required</span>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#D8B18A] transition-colors">
              <User className="w-4 h-4" />
            </div>
            <input
              id="field-full-name"
              type="text"
              name="full_name"
              required
              value={fullName}
              onChange={(e) => onChange('full_name', e.target.value)}
              placeholder="e.g. Engr. Tunde Adeleke / Apex Medical Centre"
              aria-invalid={!!errors.full_name}
              aria-describedby={errors.full_name ? 'error-full-name' : undefined}
              className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm text-zinc-100 placeholder:text-zinc-500 bg-[#131620]/90 transition-all duration-200 focus:outline-none ${
                errors.full_name
                  ? 'border-rose-500/80 bg-rose-950/20 ring-1 ring-rose-500/40'
                  : 'border-white/[0.08] hover:border-white/20 focus:border-[#D8B18A]/70 focus:ring-2 focus:ring-[#D8B18A]/20 focus:bg-[#161a26]'
              }`}
            />
          </div>
          <AnimatePresence>
            {errors.full_name && (
              <motion.p
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                id="error-full-name"
                className="mt-1.5 flex items-center gap-1 text-xs text-rose-400 font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.full_name}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email Address */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="field-email" className="block text-xs sm:text-sm font-semibold text-zinc-200">
              Email Address <span className="text-[#D8B18A] font-bold" title="Required">*</span>
            </label>
            <span className="text-[11px] text-zinc-500 font-medium">Required</span>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#D8B18A] transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="field-email"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="e.g. tunde@enterprise.ng"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'error-email' : undefined}
              className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm text-zinc-100 placeholder:text-zinc-500 bg-[#131620]/90 transition-all duration-200 focus:outline-none ${
                errors.email
                  ? 'border-rose-500/80 bg-rose-950/20 ring-1 ring-rose-500/40'
                  : 'border-white/[0.08] hover:border-white/20 focus:border-[#D8B18A]/70 focus:ring-2 focus:ring-[#D8B18A]/20 focus:bg-[#161a26]'
              }`}
            />
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                id="error-email"
                className="mt-1.5 flex items-center gap-1 text-xs text-rose-400 font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Phone Number */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="field-phone" className="block text-xs sm:text-sm font-semibold text-zinc-200">
              WhatsApp / Phone Number <span className="text-[#D8B18A] font-bold" title="Required">*</span>
            </label>
            <span className="text-[11px] text-zinc-500 font-medium">Required</span>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#D8B18A] transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="field-phone"
              type="tel"
              name="phone"
              required
              value={phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="e.g. +234 803 456 7890"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'error-phone' : 'phone-hint'}
              className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm text-zinc-100 placeholder:text-zinc-500 bg-[#131620]/90 transition-all duration-200 focus:outline-none ${
                errors.phone
                  ? 'border-rose-500/80 bg-rose-950/20 ring-1 ring-rose-500/40'
                  : 'border-white/[0.08] hover:border-white/20 focus:border-[#D8B18A]/70 focus:ring-2 focus:ring-[#D8B18A]/20 focus:bg-[#161a26]'
              }`}
            />
          </div>
          <AnimatePresence>
            {errors.phone ? (
              <motion.p
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                id="error-phone"
                className="mt-1.5 flex items-center gap-1 text-xs text-rose-400 font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.phone}</span>
              </motion.p>
            ) : (
              <p id="phone-hint" className="mt-1.5 text-xs text-zinc-500">
                Nigerian & international phone formats accepted.
              </p>
            )}
          </AnimatePresence>
        </div>

        {/* Location */}
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="field-location" className="block text-xs sm:text-sm font-semibold text-zinc-200">
              Site / Installation Location
            </label>
            <span className="text-[11px] text-zinc-500 font-medium">Optional</span>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#D8B18A] transition-colors">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              id="field-location"
              type="text"
              name="location"
              value={location}
              onChange={(e) => onChange('location', e.target.value)}
              placeholder="e.g. Lekki Phase 1, Lagos or Gwarinpa, Abuja"
              className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-white/[0.08] hover:border-white/20 text-sm text-zinc-100 placeholder:text-zinc-500 bg-[#131620]/90 transition-all duration-200 focus:outline-none focus:border-[#D8B18A]/70 focus:ring-2 focus:ring-[#D8B18A]/20 focus:bg-[#161a26]"
            />
          </div>
          <p className="mt-1.5 text-xs text-zinc-500">
            Helps our solar engineering team plan rooftop/ground-mount solar irradiance and survey logistics.
          </p>
        </div>
      </div>
    </section>
  );
};

