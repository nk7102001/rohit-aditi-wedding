import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export default function RsvpSection({ t, lang }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attending: 'yes',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [wishes, setWishes] = useState([
    {
      name: lang === 'hi' ? 'अमित एवं प्रिया शर्मा' : 'Amit & Priya Sharma',
      message: lang === 'hi' ? 'अदिति और रोहित को जीवन के नए सफर की ढेर सारी शुभकामनाएं! सदा खुश रहो!' : 'Warmest congratulations to Aditi & Rohit! Wishing you both a lifetime of love and joy!',
      time: lang === 'hi' ? '2 घंटे पहले' : '2 hours ago'
    },
    {
      name: lang === 'hi' ? 'विकास वर्मा' : 'Vikas Verma',
      message: lang === 'hi' ? 'बहुत-बहुत बधाई मेरे भाई! शादी में खूब धमाल मचाएंगे!' : 'Hearty congratulations Rohit brother! Looking forward to the grand celebrations!',
      time: lang === 'hi' ? '5 घंटे पहले' : '5 hours ago'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#10b981']
    });

    if (formData.message.trim()) {
      setWishes([
        {
          name: formData.name,
          message: formData.message,
          time: lang === 'hi' ? 'अभी-अभी' : 'Just now'
        },
        ...wishes
      ]);
    }

    setSubmitted(true);
    setFormData({ name: '', phone: '', attending: 'yes', message: '' });
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[#450510] via-[#5c0a1a] to-[#30030b] text-white">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-200 text-xs font-cinzel tracking-widest uppercase mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>{t.rsvp.title}</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-devanagari text-white">
            {lang === 'hi' ? 'मंगलकामनाएं एवं उपस्थिति' : 'Send Your Love & Blessings'}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/80 font-sans mt-2">
            {t.rsvp.subtitle}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-gradient-to-b from-[#3d040e] to-[#260207] p-6 sm:p-10 rounded-3xl border-2 border-amber-400/70 shadow-2xl gold-box-shadow mb-12">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="text-2xl font-bold font-devanagari text-amber-200">
                {t.rsvp.thankYou}
              </h3>
              <p className="text-sm text-gray-300">
                {lang === 'hi'
                  ? 'आपकी उपस्थिति और स्नेह हमारे लिए अत्यंत अनमोल है।'
                  : 'Your heartfelt wishes and presence mean the world to us.'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-full border border-amber-400/60 text-xs font-cinzel text-amber-200 hover:bg-amber-400/10 transition-colors"
              >
                {lang === 'hi' ? 'दूसरा संदेश भेजें' : 'Send Another Blessing'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-amber-200 font-cinzel uppercase tracking-wider mb-1">
                    {lang === 'hi' ? 'आपका नाम *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.rsvp.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-amber-400/50 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-amber-300 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-200 font-cinzel uppercase tracking-wider mb-1">
                    {lang === 'hi' ? 'फ़ोन नंबर (वैकल्पिक)' : 'Phone Number (Optional)'}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.rsvp.phonePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-amber-400/50 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-amber-300 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-200 font-cinzel uppercase tracking-wider mb-1">
                  {t.rsvp.attendingLabel}
                </label>
                <select
                  value={formData.attending}
                  onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-amber-400/50 text-white text-sm focus:outline-none focus:border-amber-300 transition-colors"
                >
                  {t.rsvp.options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-neutral-900 text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-200 font-cinzel uppercase tracking-wider mb-1">
                  {lang === 'hi' ? 'शुभकामना संदेश' : 'Blessing Message'}
                </label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.rsvp.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-amber-400/50 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-amber-300 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-amber-950 font-bold font-cinzel text-xs uppercase tracking-wider shadow-xl hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t.rsvp.submitBtn}</span>
              </button>
            </form>
          )}
        </div>

        {/* Recent Wishes Wall */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-300 font-cinzel text-sm font-semibold">
            <MessageSquare className="w-4 h-4" />
            <span>{t.rsvp.recentWishes}</span>
          </div>

          <div className="space-y-3">
            {wishes.map((w, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-black/30 border border-amber-400/30 backdrop-blur-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm text-amber-200 font-devanagari">
                    {w.name}
                  </span>
                  <span className="text-[10px] text-gray-400">{w.time}</span>
                </div>
                <p className="text-xs text-gray-200 leading-relaxed font-sans italic">
                  "{w.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
