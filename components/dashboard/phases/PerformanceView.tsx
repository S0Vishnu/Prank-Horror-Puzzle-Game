import React from 'react';
import { Zap, Layers, Box, Eye, BarChart2 } from 'lucide-react';

export const PerformanceView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center gap-3 mb-2">
        <Zap className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-bold text-white">Performance & Optimization</h2>
      </div>
      <p className="text-neutral-400 text-sm">
        Targeting stable 60 FPS by aggressively budgeting lights, draw calls, and physics calculations.
      </p>

      {/* Stats Mockup */}
      <div className="grid grid-cols-3 gap-4 mt-6 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-mono font-bold text-white">60</div>
          <div className="text-xs text-neutral-500 uppercase tracking-wide">Target FPS</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-mono font-bold text-emerald-400">1</div>
          <div className="text-xs text-neutral-500 uppercase tracking-wide">Dynamic Shadow Lights</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-mono font-bold text-blue-400">&lt;100</div>
          <div className="text-xs text-neutral-500 uppercase tracking-wide">Max Draw Calls</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Instancing */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-yellow-500/30 transition-colors">
          <h3 className="text-white font-bold flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-yellow-500" /> Mesh Instancing
          </h3>
          <p className="text-sm text-neutral-400 mb-4">
            The modular house (walls, floors) is repeated hundreds of times. We use <code>&lt;InstancedMesh /&gt;</code> to render 500 walls in a single draw call.
          </p>
          <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 w-[95%]" title="Optimization Impact: High"></div>
          </div>
        </div>

        {/* Custom Physics */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-yellow-500/30 transition-colors">
          <h3 className="text-white font-bold flex items-center gap-2 mb-3">
            <Box className="w-4 h-4 text-yellow-500" /> Grid-Based Collision
          </h3>
          <p className="text-sm text-neutral-400 mb-4">
            No heavy physics engine. We use a lightweight 2D spatial grid. The player only checks collision against walls in their immediate 3x3 grid cell neighborhood.
          </p>
           <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 w-[80%]" title="Optimization Impact: High"></div>
          </div>
        </div>

        {/* Room Loading */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-yellow-500/30 transition-colors">
          <h3 className="text-white font-bold flex items-center gap-2 mb-3">
            <Eye className="w-4 h-4 text-yellow-500" /> Lazy Room Loading
          </h3>
          <p className="text-sm text-neutral-400 mb-4">
            Rooms are React components. We only mount the <code>CurrentNode</code> and its immediate neighbors. Distant rooms are unmounted to free up GPU resources.
          </p>
           <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 w-[60%]" title="Optimization Impact: Medium"></div>
          </div>
        </div>

        {/* Monitoring */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-yellow-500/30 transition-colors">
          <h3 className="text-white font-bold flex items-center gap-2 mb-3">
            <BarChart2 className="w-4 h-4 text-yellow-500" /> R3F-Perf Integration
          </h3>
          <p className="text-sm text-neutral-400 mb-4">
            Real-time monitoring of Geometries, Textures, and Shaders. Automated alerts triggered if texture memory exceeds 500MB.
          </p>
           <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 w-[40%]" title="Optimization Impact: Low"></div>
          </div>
        </div>

      </div>
    </div>
  );
};
