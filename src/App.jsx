import React, { useState } from 'react';
import { invitationData } from './data/invitationData';
import LanguageToggle from './components/LanguageToggle';
import AudioPlayer from './components/AudioPlayer';
import FallingPetals from './components/FallingPetals';
import HeroSection from './components/HeroSection';
import MandirReveal from './components/MandirReveal';
import EventDeck from './components/EventDeck';
import MandirVarmalaSection from './components/MandirVarmalaSection';
import OurStory from './components/OurStory';
import CountdownTimer from './components/CountdownTimer';
import VenueSection from './components/VenueSection';
import RsvpSection from './components/RsvpSection';
import Footer from './components/Footer';

export default function App() {
  const [lang, setLang] = useState('hi');
  const t = invitationData[lang];

  return (
    <div className="min-h-screen bg-[#1a0409] text-gray-900 selection:bg-amber-300 selection:text-amber-950 font-sans relative">
      {/* Background Falling Rose & Marigold Petals */}
      <FallingPetals />

      {/* Floating Interactive Controls */}
      <LanguageToggle lang={lang} setLang={setLang} />
      <AudioPlayer lang={lang} />

      {/* Main Wedding Content Flow */}
      <main className="relative z-10">
        {/* Section 1: Azure Sky & Calligraphy Hero with Saffron Flag */}
        <HeroSection t={t} lang={lang} />

        {/* Section 2 & 3: Mandir Architecture & Sacred Royal Archway Invitation */}
        <MandirReveal t={t} lang={lang} />

        {/* Section 4: Event Celebrations (Haldi, Mehndi, Sangeet, Baraat, Wedding) */}
        <EventDeck events={t.events} lang={lang} />

        {/* Section 5: Mandir Steps & Sacred Seven Vows */}
        <MandirVarmalaSection lang={lang} />

        {/* Section 6: Meet The Bride & Groom / Our Story with Golden Lantern */}
        <OurStory t={t} lang={lang} />

        {/* Section 7: Live Auspicious Muhurat Countdown */}
        <CountdownTimer t={t} lang={lang} />

        {/* Section 8: Royal Venue & Directions */}
        <VenueSection t={t} lang={lang} />

        {/* Section 9: RSVP & Heartfelt Blessings Wall */}
        <RsvpSection t={t} lang={lang} />

        {/* Section 10: Family Compliments & Footer */}
        <Footer t={t} lang={lang} />
      </main>
    </div>
  );
}
