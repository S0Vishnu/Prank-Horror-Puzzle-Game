import React from 'react';
import { Globe2, Users, Database, Skull, BarChart3 } from 'lucide-react';

export const MultiplayerView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center gap-3 mb-2">
        <Globe2 className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-bold text-white">Asynchronous Multiplayer</h2>
      </div>
      <p className="text-neutral-400 text-sm">
        "You are alone, but the ghosts of failure surround you." 
        Using Supabase to persist death markers and global statistics.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        
        {/* Schema Design */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-500" /> Supabase Schema
            </h3>
            <span className="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded">Postgres</span>
          </div>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-2 bg-black/40 rounded border border-neutral-800">
              <span className="text-cyan-400 block mb-1">table death_markers</span>
              <ul className="text-neutral-500 pl-4 list-disc">
                <li>id: uuid (PK)</li>
                <li>level_id: int</li>
                <li>position: jsonb {'{x,y,z}'}</li>
                <li>cause: string</li>
              </ul>
            </div>
            <div className="p-2 bg-black/40 rounded border border-neutral-800">
              <span className="text-cyan-400 block mb-1">table global_stats</span>
              <ul className="text-neutral-500 pl-4 list-disc">
                <li>key: string (PK)</li>
                <li>value: bigint</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Narrator Integration */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-500" /> Data-Driven Narrator
            </h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-black/40 rounded border border-neutral-800 text-sm text-neutral-400 italic border-l-2 border-l-cyan-500">
              "Welcome to the meat grinder. <span className="text-cyan-400">8,492</span> people died in this hallway. Try not to slip."
            </div>
            <p className="text-xs text-neutral-500">
              <strong>Logic:</strong> On level load, fetch count(deaths) from Supabase. Inject value into Narrator string template.
            </p>
          </div>
        </div>

        {/* Visual Features */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-cyan-500/30 transition-colors col-span-1 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Skull className="w-4 h-4 text-cyan-500" /> The Death Heatmap
            </h3>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 bg-black/50 h-32 rounded border border-neutral-800 relative overflow-hidden">
               {/* Mock Heatmap */}
               <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-red-500/50 rounded-full blur-[2px]" />
               <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-red-500/60 rounded-full blur-[2px]" />
               <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-red-500/80 rounded-full blur-[8px]" />
               <div className="absolute bottom-2 right-2 text-xs text-neutral-600 font-mono">ROOM_01_DEATHS</div>
            </div>
            <div className="flex-1 text-sm text-neutral-400">
              <p className="mb-2">Other players' failure is visualized as faint chalk outlines or corruption in the world.</p>
              <ul className="space-y-1 text-xs text-neutral-500 list-disc list-inside">
                 <li>Updated asynchronously on level entry</li>
                 <li>Limited to top 50 recent deaths per room</li>
                 <li>Used to hint at dangerous traps (or fake traps)</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
