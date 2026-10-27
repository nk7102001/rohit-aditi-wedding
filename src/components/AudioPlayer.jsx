import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer({ lang }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt auto-play on first user interaction anywhere on the screen
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {
            // Browser prevented autoplay without explicit button press
          });
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const toggleAudio = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Audio play error:", err));
      setHasInteracted(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <audio
        ref={audioRef}
        src="/wedding_song.mp3"
        loop
        preload="auto"
      />
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-[#8b1329] via-[#a31a33] to-[#680c1d] text-amber-200 border-2 border-amber-400/80 rounded-full px-4 py-2.5 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md"
      >
        {/* Equalizer animation when playing */}
        <div className="flex items-end gap-1 h-5 w-5 justify-center">
          {isPlaying ? (
            <>
              <span className="w-1 bg-amber-300 rounded-full animate-[bounce_0.6s_ease-in-out_infinite] h-3"></span>
              <span className="w-1 bg-amber-400 rounded-full animate-[bounce_0.8s_ease-in-out_0.2s_infinite] h-5"></span>
              <span className="w-1 bg-amber-300 rounded-full animate-[bounce_0.7s_ease-in-out_0.4s_infinite] h-2"></span>
              <span className="w-1 bg-amber-400 rounded-full animate-[bounce_0.9s_ease-in-out_0.1s_infinite] h-4"></span>
            </>
          ) : (
            <Music className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
          )}
        </div>

        <span className="text-xs font-semibold tracking-wider font-cinzel text-amber-100 uppercase">
          {isPlaying ? (lang === 'hi' ? 'संगीत चालू' : 'Playing') : (lang === 'hi' ? 'संगीत सुनें' : 'Play Song')}
        </span>

        {/* Pulse glow effect */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full bg-amber-400/20 animate-ping pointer-events-none -z-10"></span>
        )}
      </button>
    </div>
  );
}
