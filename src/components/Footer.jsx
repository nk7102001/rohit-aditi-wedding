import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer({ t, lang }) {
  return (
    <footer className="relative bg-[#1a0206] text-amber-100 py-16 px-4 border-t-4 border-amber-400/80 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-center items-center gap-3">
          <span className="h-[1px] w-12 bg-amber-400/60"></span>
          <span className="text-2xl filter drop-shadow">🪔</span>
          <span className="h-[1px] w-12 bg-amber-400/60"></span>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-amber-300 font-cinzel mb-2">
            {t.footer.compliments}
          </p>
          <h4 className="text-xl sm:text-2xl font-bold font-devanagari text-white">
            {t.footer.family1}
          </h4>
          <h4 className="text-xl sm:text-2xl font-bold font-devanagari text-white mt-1">
            {t.footer.family2}
          </h4>
        </div>

        {/* Wedding Hashtag */}
        <div className="inline-block px-6 py-2 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 font-bold font-cinzel tracking-widest text-sm">
          {t.footer.hashtag}
        </div>

        <p className="text-xs text-amber-200/50 font-sans pt-4 border-t border-amber-900/50">
          {t.footer.copyright} • © 2026 Aditi & Rohit
        </p>
      </div>
    </footer>
  );
}
