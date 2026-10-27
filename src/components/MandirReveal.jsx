import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function MandirReveal({ t, lang }) {
  return (
    <section className="relative bg-[#fdf8ee] pt-4 pb-20 px-3 sm:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* The Grand Ram Mandir Facade with the Sacred Dwar (Entrance Door) */}
        <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-amber-400/90 shadow-2xl bg-[#fffefb] gold-box-shadow">
          {/* Authentic Mandir & Dwar Header Image */}
          <div className="relative w-full h-80 sm:h-[460px] overflow-hidden">
            <img
              src="/assets/mandir_dwar_arch.jpg"
              alt="Mandir Dwar"
              className="w-full h-full object-cover object-top filter contrast-[1.05]"
            />
            {/* Soft fade at the bottom of the temple arch into the inner sanctum */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fffefb] via-[#fffefb]/80 to-transparent"></div>
          </div>

          {/* Invitation Text Placed Directly Inside the Mandir Dwar - Exact as in Video! */}
          <div className="relative -mt-16 sm:-mt-24 px-6 sm:px-14 pb-12 text-center bg-[#fffefb]">
            {/* Shloka Header */}
            <div className="space-y-2 mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#8b1329] font-devanagari tracking-wide">
                {t.invitation.ganeshShloka}
              </h2>
              <p className="text-xs sm:text-sm text-amber-900/80 font-garamond italic max-w-md mx-auto leading-relaxed">
                "{t.invitation.intro}"
              </p>
            </div>

            <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6"></div>

            {/* "निमंत्रण" Badge */}
            <div className="inline-block px-6 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs font-bold text-amber-900 font-cinzel tracking-widest uppercase mb-6 shadow-sm">
              {t.invitation.heading}
            </div>

            {/* Groom & Bride Calligraphy */}
            <div className="space-y-4 my-6">
              <div>
                <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 font-devanagari tracking-wide">
                  {t.invitation.groomName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-sans mt-1">
                  {t.invitation.groomParents}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <span className="h-[1px] w-12 bg-amber-300"></span>
                <span className="text-base font-script font-bold text-[#8b1329] italic px-2">
                  {lang === 'hi' ? 'संग' : 'weds'}
                </span>
                <span className="h-[1px] w-12 bg-amber-300"></span>
              </div>

              <div>
                <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 font-devanagari tracking-wide">
                  {t.invitation.brideName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-sans mt-1">
                  {t.invitation.brideParents}
                </p>
              </div>
            </div>

            {/* Invitation Note */}
            <p className="text-xs sm:text-sm text-gray-600 font-garamond italic max-w-md mx-auto my-6 leading-relaxed">
              {t.invitation.invitationNote}
            </p>

            {/* Button to Events Section */}
            <div className="pt-2">
              <a
                href="#events"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#8b1329] via-[#a31a33] to-[#680c1d] text-amber-200 border border-amber-400 font-bold font-cinzel text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <span>{t.invitation.sectionBtn}</span>
                <span>👇</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
