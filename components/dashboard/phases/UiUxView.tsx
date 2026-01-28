import React from 'react';
import { MousePointer2, Monitor, AlertTriangle, Terminal, VolumeX, EyeOff } from 'lucide-react';

export const UiUxView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Intro */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Monitor className="w-6 h-6 text-pink-400" />
          <h2 className="text-xl font-bold text-white">Interface Design: "The UI is a Liar"</h2>
        </div>
        <p className="text-neutral-400 text-sm">
          The HUD and Menus are not neutral. They are an extension of the antagonist. 
          Expect glitches, misleading labels, and active hostility.
        </p>
      </section>

      {/* Screen Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Lobby */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-pink-500/30 transition-colors">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-pink-500" /> The Lobby
          </h3>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex gap-2 items-start">
              <span className="text-pink-500 font-mono">BTN_01:</span>
              <span>"Start Game" button physically runs away from mouse cursor.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-pink-500 font-mono">BTN_02:</span>
              <span>"Quit" button plays a buzzer sound and refuses to close app.</span>
            </li>
          </ul>
        </div>

        {/* HUD */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-pink-500/30 transition-colors">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-pink-500" /> In-Game HUD
          </h3>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex gap-2 items-start">
              <span className="text-pink-500 font-mono">METER:</span>
              <span>"Sanity Meter" that fluctuates randomly (Pure cosmetic).</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-pink-500 font-mono">HINT:</span>
              <span>Objectives lie. "Run" appears when you should stand still.</span>
            </li>
          </ul>
        </div>

        {/* Loading */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-pink-500/30 transition-colors">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
             <MousePointer2 className="w-4 h-4 text-pink-500" /> Loading Screen
          </h3>
          <div className="w-full h-2 bg-neutral-800 rounded-full mb-2 overflow-hidden relative">
             <div className="absolute top-0 left-0 h-full w-3/4 bg-pink-500/50" />
          </div>
          <p className="text-xs text-neutral-500 italic">
            Bar goes to 99%, waits 10s, drops to 12%, then finishes instantly.
          </p>
        </div>

        {/* Settings */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-pink-500/30 transition-colors">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
             <VolumeX className="w-4 h-4 text-pink-500" /> Settings
          </h3>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex gap-2 items-start">
              <span className="text-pink-500 font-mono">AUDIO:</span>
              <span>Muting the Narrator causes the volume slider to spring back to 10%.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Mock Component */}
      <div className="p-4 bg-black/40 rounded-lg border border-dashed border-neutral-700 flex justify-center items-center h-32 relative overflow-hidden group">
        <button className="px-6 py-2 bg-pink-600 text-white font-bold rounded shadow-lg group-hover:translate-x-12 transition-transform duration-300">
          Try to Click Me
        </button>
        <span className="absolute bottom-2 text-xs text-neutral-600 font-mono">Interactive Preview</span>
      </div>

    </div>
  );
};
