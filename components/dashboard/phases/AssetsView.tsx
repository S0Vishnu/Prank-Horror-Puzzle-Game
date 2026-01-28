import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const AssetsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-emerald-900/10 border border-emerald-900/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Assets Confirmed & Locked</h2>
            <p className="text-emerald-500/80 text-sm">No new assets will be introduced beyond this point.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-black/40 p-4 rounded border border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-300 mb-2 uppercase tracking-wide">01. Models (GLB/GLTF)</h3>
            <ul className="text-sm text-neutral-400 space-y-1 list-disc list-inside">
              <li>Modular House (Walls, Floors, Stairs)</li>
              <li>Character (Humanoid)</li>
              <li>Furniture & Props</li>
              <li>Doors (Separated frames)</li>
            </ul>
          </div>
          <div className="bg-black/40 p-4 rounded border border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-300 mb-2 uppercase tracking-wide">02. Animations</h3>
            <ul className="text-sm text-neutral-400 space-y-1 list-disc list-inside">
              <li>Walk / Run / Idle</li>
              <li>Interact / Reach</li>
              <li>Door Open / Close</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
