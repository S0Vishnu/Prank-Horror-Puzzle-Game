import React from 'react';
import { Cpu, Code, Flashlight } from 'lucide-react';
import { useGameStore } from '../../../store/gameStore';

export const SystemsView: React.FC = () => {
  // We can consume the store here to display debug info if we want
  const torchState = useGameStore((state) => state.torch);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-purple-900/10 border border-purple-900/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">System Architecture Implemented</h2>
        </div>
        <p className="text-sm text-purple-300 mb-6">
          Core gameplay systems are being implemented. The <strong>Torch System</strong> and <strong>State Store</strong> are now live in the codebase.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Store Card */}
          <div className="bg-black/40 p-4 rounded border border-neutral-800 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-4 h-4 text-neutral-500" />
                <h3 className="font-bold text-white">Game Store (Zustand)</h3>
              </div>
              <ul className="text-sm text-neutral-400 space-y-2 font-mono">
                <li className="flex justify-between">
                  <span>torch.isOn</span>
                  <span className={torchState.isOn ? "text-green-500" : "text-red-500"}>
                    {torchState.isOn.toString()}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>torch.flicker.active</span>
                  <span className="text-yellow-500">{torchState.flickerConfig.active.toString()}</span>
                </li>
                <li className="flex justify-between">
                  <span>actions</span>
                  <span className="text-blue-500">setters</span>
                </li>
              </ul>
          </div>

          {/* Torch Component Card */}
          <div className="bg-black/40 p-4 rounded border border-neutral-800 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Flashlight className="w-4 h-4 text-neutral-500" />
                <h3 className="font-bold text-white">Torch Component</h3>
              </div>
              <div className="space-y-2 text-sm text-neutral-400">
                <p>Attached to Camera (R3F).</p>
                <p>Properties:</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-neutral-800 rounded text-xs">SpotLight</span>
                  <span className="px-2 py-1 bg-neutral-800 rounded text-xs">Vector3 Offset</span>
                  <span className="px-2 py-1 bg-neutral-800 rounded text-xs">Target Ref</span>
                </div>
              </div>
          </div>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <h3 className="text-lg font-bold text-white mb-2">System Design Specs</h3>
        <div className="space-y-4">
          <div className="p-4 border-l-2 border-purple-500 bg-neutral-800/30">
            <h4 className="font-bold text-purple-400">Torchlight System</h4>
            <p className="text-sm text-neutral-400 mt-1">
              State-driven. Defaults to warm white. Can shift to Red (danger) or UV (puzzle). Flicker logic uses Perlin-like noise simulation in the render loop.
            </p>
          </div>
          <div className="p-4 border-l-2 border-blue-500 bg-neutral-800/30">
            <h4 className="font-bold text-blue-400">Narrator System</h4>
            <p className="text-sm text-neutral-400 mt-1">
              Queue-based audio. Priorities: Critical > Reactive > Idle. Integration with Supabase for global prank stats.
            </p>
          </div>
          <div className="p-4 border-l-2 border-red-500 bg-neutral-800/30">
            <h4 className="font-bold text-red-400">Prank System</h4>
            <p className="text-sm text-neutral-400 mt-1">
              Deterministic scene graph manipulation. Triggers based on Region (AABB) or Gaze (Raycast). Not random.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
