import React from 'react';
import { MapPin, Navigation, Calendar, Car } from 'lucide-react';

export default function VenueSection({ t, lang }) {
  const openMaps = () => {
    const query = encodeURIComponent("The Taj Palace, Bhawani Singh Road, Jaipur, Rajasthan");
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[#7a0f24] via-[#5c0a1a] to-[#450510] text-white">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-200 text-xs font-cinzel tracking-widest uppercase mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.venueSection.title}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-devanagari text-white">
            {t.venueSection.hotelName}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/90 font-sans mt-2 max-w-md mx-auto">
            {t.venueSection.address}
          </p>
        </div>

        {/* Venue Card Container */}
        <div className="bg-gradient-to-b from-[#3d040e] to-[#2b030a] rounded-3xl p-6 sm:p-10 border-2 border-amber-400/60 shadow-2xl gold-box-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Palace Map Visual / Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-amber-200 font-cinzel">
                    {lang === 'hi' ? 'सुगम आवागमन' : 'Easy Access'}
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed mt-1">
                    {lang === 'hi'
                      ? 'जयपुर अंतरराष्ट्रीय हवाई अड्डे से 25 मिनट एवं रेलवे स्टेशन से 15 मिनट की दूरी पर।'
                      : '25 mins from Jaipur International Airport & 15 mins from Jaipur Railway Station.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-amber-200 font-cinzel">
                    {lang === 'hi' ? 'वैले पार्किंग सुविधा' : 'Valet Parking'}
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed mt-1">
                    {lang === 'hi'
                      ? 'सभी सम्मानीय अतिथियों के लिए नि:शुल्क वैले पार्किंग उपलब्ध है।'
                      : 'Complimentary valet parking available for all gracious guests.'}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={openMaps}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-amber-950 font-bold font-cinzel text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{t.venueSection.getDirections}</span>
                </button>
              </div>
            </div>

            {/* Styled Map Preview Frame */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-xl h-64 bg-slate-900">
              <iframe
                title="Taj Palace Jaipur Map"
                src="https://maps.google.com/maps?q=Taj%20Jai%20Mahal%20Palace%20Jaipur&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(1.2)' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
