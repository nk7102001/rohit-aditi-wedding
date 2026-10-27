import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function MandirVarmalaSection({ lang }) {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#f7f0e3] via-[#fffbf2] to-[#4a0612] text-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Second Mandir: Couple in Wedding Attire (Shaadi Ke Jode Mein) at Temple Steps */}
        <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-amber-400 shadow-2xl bg-[#fffefb] gold-box-shadow">
          <div className="relative h-88 sm:h-[480px] w-full overflow-hidden bg-slate-900">
            {/* The Authentic Temple Couple Scene from the Video */}
            <video
              src="/assets/temple_couple_loop.mp4"
              autoPlay
              loop
              muted
              playsInline
              poster="/assets/temple_couple_wedding.jpg"
              className="w-full h-full object-cover object-center filter contrast-[1.05]"
            />

            {/* Bottom Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"></div>

            {/* Floating Wedding Blessing Card at bottom */}
            <div className="absolute bottom-6 left-4 right-4 text-white text-center pointer-events-none">
              {/* Stepped Lotus & Kalash Emblems */}
              <div className="flex justify-center items-center gap-6 mb-3">
                <span className="text-3xl filter drop-shadow animate-float-slow">🪷</span>
                <span className="text-4xl filter drop-shadow animate-pulse-slow">🏺</span>
                <span className="text-3xl filter drop-shadow animate-float-slow">🪷</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-bold font-devanagari text-amber-200 drop-shadow-md">
                {lang === 'hi' ? '॥ पाणिग्रहण एवं सात फेरे ॥' : 'The Sacred Seven Vows (Saptapadi)'}
              </h3>

              <p className="text-xs sm:text-sm font-garamond italic text-amber-100 max-w-lg mx-auto mt-2 leading-relaxed">
                {lang === 'hi'
                  ? 'श्री राम एवं माता जानकी के पावन सानिध्य में सात वचनों का पवित्र संकल्प।'
                  : 'Taking the seven sacred vows under the divine blessings of Prabhu Shri Ram and Mata Sita.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
