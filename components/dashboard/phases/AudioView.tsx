import React from 'react';
import { Volume2, Mic2, Music4, Ear, Activity } from 'lucide-react';

export const AudioView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center gap-3 mb-2">
        <Volume2 className="w-6 h-6 text-teal-400" />
        <h2 className="text-xl font-bold text-white">Audio Landscape</h2>
      </div>
      <p className="text-neutral-400 text-sm">
        "Silence is Tension." The audio system uses 3D spatialization to mislead the player.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        
        {/* Narrator */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-teal-500/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Mic2 className="w-4 h-4 text-teal-500" /> Narrator Voice
            </h3>
            <span className="text-xs bg-teal-900/50 text-teal-300 px-2 py-1 rounded">Stereo + Spatial</span>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-black/40 rounded border border-neutral-800 text-sm text-neutral-400 italic">
              "Oh, I wouldn't go that way. It sounds... wet."
            </div>
            <p className="text-xs text-neutral-500">
              <strong>Logic:</strong> Mostly head-locked (intercom style). Occasionally switches to 3D positional audio behind the player's ear for jumpscares.
            </p>
          </div>
        </div>

        {/* Ambient */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-teal-500/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-500" /> Procedural Ambience
            </h3>
            <span className="text-xs bg-teal-900/50 text-teal-300 px-2 py-1 rounded">Generative</span>
          </div>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li className="flex justify-between">
              <span>Base Layer</span>
              <span className="text-neutral-600">60Hz Hum</span>
            </li>
            <li className="flex justify-between">
              <span>Stress (Low)</span>
              <span className="text-neutral-600">Wood settling</span>
            </li>
            <li className="flex justify-between">
              <span>Stress (High)</span>
              <span className="text-red-900/70">Wall scratching</span>
            </li>
          </ul>
        </div>

        {/* Pranks */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-teal-500/30 transition-colors col-span-1 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Ear className="w-4 h-4 text-teal-500" /> Audio Pranks (The Phantom Runner)
            </h3>
          </div>
          <div className="relative h-24 bg-black/50 rounded-lg overflow-hidden flex items-center justify-center border border-neutral-800">
             {/* Visualization of sound moving towards center */}
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-teal-500/50 rounded-full animate-pulse blur-md" />
             <div className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500/50 rounded-full blur-xl animate-[ping_1s_ease-in-out_infinite]" />
             <p className="z-10 text-xs text-neutral-400 font-mono">
               Sound Source: Heavy Footsteps -> Approaches Player -> Cuts Silent at 1m distance
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};
