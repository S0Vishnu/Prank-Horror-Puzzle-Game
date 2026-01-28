import React from 'react';
import { World } from './components/game/World';
import { useGameStore } from './store/gameStore';
import { NarratorOverlay } from './components/game/systems/Narrator';
import { useGameLogic } from './contexts/GameLogicContext';

const App: React.FC = () => {
  // Split selectors to avoid object identity issues triggering re-renders
  const phase = useGameStore((state) => state.phase);
  const torch = useGameStore((state) => state.torch);
  const toggleUV = useGameStore((state) => state.toggleUV);
  
  const { startGame } = useGameLogic();

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 3D Scene */}
      <World />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
        
        {/* Narrator Subtitles */}
        <NarratorOverlay />

        {/* Lobby UI */}
        {phase === 'LOBBY' && (
          <div className="pointer-events-auto bg-black/80 p-8 rounded-2xl border border-neutral-800 text-center backdrop-blur-md">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tighter">PRANK PROTOCOL</h1>
            <p className="text-neutral-400 mb-8 font-mono text-sm">Do not trust the geometry.</p>
            <button 
              onClick={startGame}
              className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-neutral-200 transition-colors"
            >
              INITIATE
            </button>
          </div>
        )}

        {/* HUD (Playing) */}
        {phase === 'PLAYING' && (
          <div className="absolute inset-0">
             {/* Reticle */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/80 rounded-full mix-blend-difference" />
             
             {/* Controls Hint */}
             <div className="absolute bottom-8 left-8 text-white/30 text-xs font-mono">
               WASD to Move<br/>
               MOUSE to Look<br/>
               ESC to Unlock Cursor
             </div>

             {/* UV Toggle Button */}
             <div className="absolute bottom-8 right-8 pointer-events-auto">
               <button
                 onClick={toggleUV}
                 className={`px-4 py-2 rounded font-bold font-mono transition-all border-2 ${
                   torch.isUV 
                     ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]' 
                     : 'bg-black/50 border-neutral-600 text-neutral-400 hover:bg-neutral-800'
                 }`}
               >
                 {torch.isUV ? 'UV ACTIVE' : 'UV OFF'}
               </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;