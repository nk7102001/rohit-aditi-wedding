import React from 'react';
import { Globe } from 'lucide-react';

export default function LanguageToggle({ lang, setLang }) {
  return (
    <div className="fixed top-5 right-5 z-50">
      <div className="bg-gradient-to-r from-[#580816]/90 via-[#7a0f24]/90 to-[#580816]/90 backdrop-blur-md p-1 rounded-full border-2 border-amber-400/80 shadow-2xl flex items-center gap-1">
        <button
          onClick={() => setLang('hi')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 font-devanagari flex items-center gap-1.5 ${
            lang === 'hi'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 shadow-md scale-105'
              : 'text-amber-200 hover:text-white'
          }`}
        >
          <span>हिन्दी</span>
        </button>

        <button
          onClick={() => setLang('en')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 font-cinzel flex items-center gap-1.5 ${
            lang === 'en'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 shadow-md scale-105'
              : 'text-amber-200 hover:text-white'
          }`}
        >
          <span>English</span>
        </button>
      </div>
    </div>
  );
}
