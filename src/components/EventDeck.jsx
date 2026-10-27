import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, ChevronLeft, ChevronRight, Share2, Check } from 'lucide-react';

const eventImages = {
  haldi: '/assets/haldi_art.jpg',
  mehndi: '/assets/mehndi_art.jpg',
  sangeet: '/assets/sangeet_art.jpg',
  baraat: '/assets/baraat_art.jpg',
  wedding: '/assets/wedding_art.jpg',
  reception: '/assets/wedding_art.jpg',
};

export default function EventDeck({ events, lang }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentEvent = events[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${currentEvent.title} - Aditi & Rohit Wedding`,
        text: `${currentEvent.title} on ${currentEvent.date} at ${currentEvent.venue}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${currentEvent.title}: ${currentEvent.date}, ${currentEvent.time} @ ${currentEvent.venue}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const createCalendarEvent = (ev) => {
    const title = encodeURIComponent(`${ev.title} - Aditi & Rohit Wedding`);
    const details = encodeURIComponent(`${ev.subTitle} at ${ev.venue}, ${ev.city}. Dress code: ${ev.dressCode}`);
    const location = encodeURIComponent(`${ev.venue}, ${ev.city}`);
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };

  return (
    <section id="events" className="relative py-20 px-4 bg-gradient-to-b from-[#fdf8ee] via-[#fffbf2] to-[#f7f0e3] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs tracking-widest font-cinzel uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'hi' ? 'मांगलिक कार्यक्रम' : 'ITINERARY OF CELEBRATIONS'}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-devanagari text-[#8b1329] tracking-wide">
            {lang === 'hi' ? 'हमारे शुभ विवाह के कार्यक्रम' : 'Wedding Functions & Ceremonies'}
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-3"></div>
        </div>

        {/* Event Quick Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {events.map((ev, idx) => (
            <button
              key={ev.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                currentIndex === idx
                  ? 'bg-gradient-to-r from-[#8b1329] to-[#a31a33] text-amber-200 shadow-md scale-105 border border-amber-400'
                  : 'bg-white/90 text-gray-700 hover:bg-amber-50 border border-amber-200'
              }`}
            >
              {ev.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Main Interactive Card Frame */}
        <div className="relative max-w-lg mx-auto">
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/80 transition-all duration-500 gold-box-shadow">
            
            {/* Animated Couple Character Illustration - Gentle Living Sway / Breathe Motion! */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-gradient-to-b from-[#fefbf6] to-[#faf3e3]">
              <div className="w-full h-full flex items-center justify-center p-2 animate-[float_4s_ease-in-out_infinite]">
                <img
                  src={eventImages[currentEvent.id] || eventImages.wedding}
                  alt={currentEvent.title}
                  className="w-full h-full object-cover object-top filter contrast-[1.03] transition-transform duration-700 hover:scale-105 rounded-2xl"
                />
              </div>

              {/* Gradient blending at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

              {/* Day Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-400/95 text-amber-950 backdrop-blur-md shadow-md border border-amber-200">
                  {currentEvent.day}
                </span>
              </div>

              {/* Event Title inside bottom of the artwork */}
              <div className="absolute bottom-4 left-6 right-6 text-white z-10">
                <p className="text-xs uppercase tracking-widest text-amber-300 font-cinzel">
                  {currentEvent.subTitle}
                </p>
                <h3 className="text-3xl sm:text-4xl font-bold font-devanagari drop-shadow-md text-white mt-1">
                  {currentEvent.title}
                </h3>
              </div>
            </div>

            {/* Event Details Content */}
            <div className="p-6 sm:p-8 space-y-5 bg-gradient-to-b from-white to-[#fffcf7]">
              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="p-2.5 rounded-lg bg-amber-200 text-amber-900">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-amber-800 font-bold block">
                      {lang === 'hi' ? 'दिनांक' : 'Date'}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {currentEvent.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="p-2.5 rounded-lg bg-amber-200 text-amber-900">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-amber-800 font-bold block">
                      {lang === 'hi' ? 'समय' : 'Time'}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {currentEvent.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/80">
                <div className="p-2.5 rounded-lg bg-rose-100 text-[#8b1329] mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-rose-800 font-bold block">
                    {lang === 'hi' ? 'स्थान / वेन्यू' : 'Venue'}
                  </span>
                  <span className="text-sm font-bold text-gray-900 block">
                    {currentEvent.venue}
                  </span>
                  <span className="text-xs text-gray-600">
                    {currentEvent.city}
                  </span>
                </div>
              </div>

              {/* Dress Code */}
              <div className="text-center py-1.5 border-t border-b border-amber-200/60 text-xs text-amber-900 font-sans">
                <span className="font-semibold text-amber-800">
                  {lang === 'hi' ? 'परिधान (Dress Code): ' : 'Dress Code: '}
                </span>
                <span className="italic">{currentEvent.dressCode}</span>
              </div>

              {/* Action Buttons: Add to Calendar & Share */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => createCalendarEvent(currentEvent)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-xs tracking-wider uppercase font-cinzel shadow-md hover:from-amber-600 hover:to-amber-700 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'कैलेंडर में सेव करें' : 'Add to Calendar'}</span>
                </button>

                <button
                  onClick={handleShare}
                  aria-label="Share function details"
                  className="p-3 rounded-xl border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors shadow-sm active:scale-95 flex items-center justify-center"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            aria-label="Previous function"
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-amber-900 border-2 border-amber-400 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next function"
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-amber-900 border-2 border-amber-400 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Card Indicator Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {events.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-[#8b1329]' : 'w-2.5 bg-amber-300 hover:bg-amber-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
