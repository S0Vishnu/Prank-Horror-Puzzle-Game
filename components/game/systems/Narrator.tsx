import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../../store/gameStore';

// Simple Event Bus for Narrator triggers
export const narratorEvents = new EventTarget();

export const triggerNarrator = (text: string) => {
  narratorEvents.dispatchEvent(new CustomEvent('speak', { detail: text }));
};

export const NarratorOverlay: React.FC = () => {
  const [subtitle, setSubtitle] = useState<string | null>(null);
  
  useEffect(() => {
    const handleSpeak = (e: Event) => {
      const text = (e as CustomEvent).detail;
      setSubtitle(text);
      
      // Browser TTS
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 0.8; // Lower pitch for serious tone
      utterance.rate = 0.9;  // Slightly slower
      window.speechSynthesis.cancel(); // Interrupt previous
      window.speechSynthesis.speak(utterance);

      // Clear subtitle after estimated duration
      const duration = Math.max(2000, text.length * 50);
      setTimeout(() => setSubtitle(null), duration);
    };

    narratorEvents.addEventListener('speak', handleSpeak);
    return () => narratorEvents.removeEventListener('speak', handleSpeak);
  }, []);

  if (!subtitle) return null;

  return (
    <div className="absolute bottom-20 left-0 right-0 text-center pointer-events-none">
      <div className="inline-block bg-black/70 px-6 py-3 rounded-xl border border-yellow-500/30 backdrop-blur-sm">
        <p className="text-yellow-400 font-bold font-mono text-lg shadow-black drop-shadow-md">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
