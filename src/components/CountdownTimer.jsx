import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';

export default function CountdownTimer({ t, lang }) {
  // Target wedding date: November 22, 2026 19:30:00 IST
  const targetDate = new Date('2026-11-22T19:30:00+05:30').getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: t.countdown.days, value: timeLeft.days },
    { label: t.countdown.hours, value: timeLeft.hours },
    { label: t.countdown.minutes, value: timeLeft.minutes },
    { label: t.countdown.seconds, value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-[#450510] via-[#5c0a1a] to-[#7a0f24] text-white overflow-hidden text-center">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-200 text-xs font-cinzel tracking-widest uppercase mb-3">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          <span>{t.countdown.title}</span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-bold font-devanagari text-white mb-2">
          {t.countdown.subtitle}
        </h3>
        <p className="text-xs sm:text-sm text-amber-200/80 font-cinzel tracking-wider mb-8">
          22 November 2026 • 07:30 PM
        </p>

        {/* Counter Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-2xl mx-auto">
          {timeUnits.map((unit, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-6 rounded-2xl bg-black/40 backdrop-blur-md border-2 border-amber-400/70 shadow-2xl flex flex-col items-center justify-center transform hover:scale-105 transition-transform"
            >
              <span className="text-2xl sm:text-5xl font-extrabold text-amber-300 font-cinzel drop-shadow-md">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-100/80 font-semibold mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
