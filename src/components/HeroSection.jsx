import React from 'react';
import { ChevronDown, Calendar, Sparkles } from 'lucide-react';

export default function HeroSection({ t, lang }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#1877d5] via-[#3a9af7] to-[#7fc0f9] text-white pt-14 pb-0 px-4">
      {/* Soft Moving Cloud Silhouettes */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute top-10 -left-20 w-80 h-32 bg-white/40 rounded-full blur-2xl animate-[float_14s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 -right-20 w-96 h-40 bg-white/30 rounded-full blur-2xl animate-[float_18s_ease-in-out_2s_infinite]"></div>
      </div>

      {/* Top Header Shloka */}
      <div className="relative z-10 text-center mt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-amber-200/50 text-amber-100 text-xs tracking-widest uppercase font-cinzel">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span>{lang === 'hi' ? '॥ ॐ श्री गणेशाय नमः ॥' : '|| SHREE GANESHAY NAMAH ||'}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
        </div>
      </div>

      {/* Central Couple Typography - Exact Calligraphy from Video */}
      <div className="relative z-10 text-center my-auto py-4">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-wide drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] text-white font-devanagari">
          {t.hero.groom}
        </h1>

        <div className="flex items-center justify-center gap-4 my-2">
          <span className="h-[1px] w-16 md:w-28 bg-gradient-to-r from-transparent via-amber-300 to-amber-400"></span>
          <span className="text-2xl md:text-3xl font-script text-amber-200 px-2 italic font-semibold">
            {t.hero.and}
          </span>
          <span className="h-[1px] w-16 md:w-28 bg-gradient-to-l from-transparent via-amber-300 to-amber-400"></span>
        </div>

        <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-wide drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] text-white font-devanagari">
          {t.hero.bride}
        </h1>

        {/* Date and Location Badge */}
        <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-6 py-2 rounded-2xl bg-black/25 backdrop-blur-md border border-amber-300/60 shadow-xl">
          <div className="flex items-center gap-2 text-amber-200 font-cinzel text-xs sm:text-sm font-semibold">
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>{t.hero.dateBadge}</span>
          </div>
          <span className="hidden sm:inline text-amber-300/60">•</span>
          <span className="text-white/95 text-xs sm:text-sm font-sans tracking-wide">
            {t.hero.venueBadge}
          </span>
        </div>
      </div>

      {/* Mandir Top Pinnacle with Saffron Flag Mounted on It - Exact Match to Video! */}
      <div className="relative z-20 w-full max-w-lg flex flex-col items-center">
        {/* Animated Saffron Temple Flag (Dhwaja) mounted on the golden spire */}
        <div className="relative -mb-6 z-30 flex flex-col items-center">
          <div className="w-1.5 h-16 bg-gradient-to-b from-amber-400 to-amber-700 rounded-t-sm shadow-md"></div>
          <div
            className="absolute top-0 left-1.5 w-16 h-10 bg-gradient-to-r from-[#ff6000] via-[#ff8800] to-[#ff4800] shadow-xl animate-flag"
            style={{
              clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
            }}
          >
            <div className="absolute left-2.5 top-2 text-[10px] text-amber-100 font-bold font-devanagari">
              🚩 ॐ
            </div>
          </div>
        </div>

        {/* Golden Mandir Shikhara Top Peak */}
        <div className="relative w-72 sm:w-88 h-44 overflow-hidden flex flex-col items-center">
          <img
            src="/assets/hero_mandir_shikhara.jpg"
            alt="Temple Pinnacle"
            className="w-full h-full object-cover object-bottom filter contrast-[1.08] drop-shadow-2xl"
          />
          {/* Subtle gradient blending at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#fdf8ee] to-transparent"></div>
        </div>

        {/* Scroll Prompt */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce-gentle z-30">
          <ChevronDown className="w-5 h-5 text-amber-900 drop-shadow" />
        </div>
      </div>
    </section>
  );
}
