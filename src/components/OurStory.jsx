import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function OurStory({ t, lang }) {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-[#580816] via-[#700c20] to-[#450510] text-white overflow-hidden">
      {/* Decorative Ornate Lantern Hanging (Top Right) */}
      <div className="absolute top-0 right-6 sm:right-16 z-20 pointer-events-none flex flex-col items-center">
        <div className="w-0.5 h-16 sm:h-24 bg-gradient-to-b from-amber-400 to-amber-600"></div>
        <div className="relative w-12 sm:w-16 h-20 sm:h-24 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-700 rounded-2xl shadow-2xl border-2 border-amber-200 flex items-center justify-center animate-swing">
          <div className="w-5 h-8 bg-gradient-to-t from-yellow-300 to-white rounded-full blur-[2px] animate-flicker"></div>
          <div className="absolute -inset-2 bg-amber-400/30 rounded-full blur-xl pointer-events-none"></div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="relative rounded-[3rem] p-8 sm:p-14 bg-gradient-to-b from-[#600918]/90 via-[#4e0714]/95 to-[#3b050f] border-4 border-amber-400/80 shadow-2xl text-center deep-red-shadow">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/60 text-amber-200 text-xs font-cinzel tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.ourStory.tag}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-script text-amber-200 mb-6 drop-shadow-md">
            {t.ourStory.title}
          </h2>

          <div className="w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-8"></div>

          <div className="space-y-3 mb-10 max-w-xl mx-auto">
            {t.ourStory.poem.map((line, idx) => (
              <p
                key={idx}
                className="text-base sm:text-lg font-garamond italic tracking-wide text-amber-100/95 leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>

          {/* Ornate Baroque Gold Frame with Couple Photo */}
          <div className="relative inline-block mx-auto mt-2">
            <div className="p-3 sm:p-4 rounded-3xl bg-gradient-to-br from-amber-200 via-yellow-500 to-amber-700 shadow-2xl border-4 border-amber-300/80">
              <div className="p-1 rounded-2xl bg-amber-950">
                <div className="relative w-64 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src="/assets/couple_story.jpg"
                    alt="Aditi & Rohit"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 border border-amber-400/60 backdrop-blur-md">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span className="text-sm font-bold font-cinzel text-amber-200 tracking-wider">
                Aditi & Rohit
              </span>
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
