import React, { useState } from 'react';
import { WEBHOOK_URL } from '../config.ts';
import { Terminal, Copy, Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { LeadFormData } from '../types.ts';
import { motion, AnimatePresence } from 'motion/react';

interface DeveloperToolbarProps {
  currentData: LeadFormData;
  onFillSample: () => void;
  onClear: () => void;
}

export const DeveloperToolbar: React.FC<DeveloperToolbarProps> = ({
  currentData,
  onFillSample,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const copyToClipboard = (text: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  return (
    <aside aria-label="Developer & Testing Bar" className="mt-12 pt-6 border-t border-white/[0.08] text-xs text-zinc-400">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11141d]/80 border border-white/10 rounded-2xl px-4 py-3 shadow-md backdrop-blur-md">
        <div className="flex items-center gap-2 max-w-full overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-[#D8B18A] shadow-[0_0_8px_#D8B18A]" />
          <span className="font-semibold text-zinc-200 shrink-0">Webhook Target:</span>
          <code className="px-2 py-0.5 rounded-lg bg-black/50 border border-white/[0.08] text-[#e3c7a5] font-mono text-[11px] max-w-[200px] sm:max-w-md truncate">
            {WEBHOOK_URL}
          </code>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onFillSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2a2319] hover:bg-[#382f22] border border-[#D8B18A]/40 text-[#f3dec7] font-medium text-xs transition cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D8B18A]" />
            Fill Test Data
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 font-medium text-xs transition cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>{isOpen ? 'Hide Payload' : 'Inspect Payload'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 p-4 bg-[#0B0D13] text-zinc-300 rounded-2xl border border-white/10 font-mono text-xs space-y-3 shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-zinc-400 font-semibold">Active Transmit Payload (to n8n Webhook):</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(JSON.stringify(currentData, null, 2), setCopiedPayload)}
                  className="text-zinc-300 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  {copiedPayload ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedPayload ? 'Copied' : 'Copy JSON'}
                </button>
              </div>
            </div>

            <pre className="max-h-60 overflow-y-auto p-3 bg-black/60 rounded-xl text-zinc-300 text-[11px] leading-relaxed border border-white/[0.04]">
              {JSON.stringify(currentData, null, 2)}
            </pre>

            <div className="text-[11px] text-zinc-400 pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                💡 In n8n, click <em>"Listen for test event"</em> on your Webhook node before clicking Submit.
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(WEBHOOK_URL, setCopiedUrl)}
                className="text-zinc-300 hover:text-white inline-flex items-center gap-1 cursor-pointer"
              >
                {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedUrl ? 'Copied URL' : 'Copy Webhook URL'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

