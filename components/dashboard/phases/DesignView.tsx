import React from 'react';
import { FileText, ShieldAlert, Ghost, Flashlight } from 'lucide-react';

export const DesignView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Core Pillars */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
          <FileText className="w-6 h-6 text-blue-500" />
          Core Game Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-neutral-800/50 border border-neutral-700 rounded-xl hover:border-neutral-600 transition-colors">
            <ShieldAlert className="w-8 h-8 text-red-400 mb-3" />
            <h3 className="font-bold text-white mb-2">Unreliable Reality</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Inspired by <em>Level Devil</em>. The physics and geometry are actively hostile. Stairs flatten, doors fake you out.
            </p>
          </div>
          <div className="p-5 bg-neutral-800/50 border border-neutral-700 rounded-xl hover:border-neutral-600 transition-colors">
            <Ghost className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="font-bold text-white mb-2">Antagonist Narrator</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Inspired by <em>The Stanley Parable</em>. A voice that mocks failure and lies about safety.
            </p>
          </div>
          <div className="p-5 bg-neutral-800/50 border border-neutral-700 rounded-xl hover:border-neutral-600 transition-colors">
            <Flashlight className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white mb-2">Light is Danger</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Your torch reveals the path but also triggers traps. Some enemies only move when lit.
            </p>
          </div>
        </div>
      </section>

      {/* Stack Architecture */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-800 flex justify-between items-center">
          <h3 className="font-bold text-lg text-white">System Architecture</h3>
          <div className="text-xs font-mono text-neutral-500">PHASE_2_SPEC</div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-blue-400 font-mono text-sm mb-4">FRONTEND & LOGIC</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-1 h-full bg-blue-500/50 rounded-full" />
                <div>
                  <strong className="block text-neutral-200">React Three Fiber (R3F)</strong>
                  <span className="text-sm text-neutral-500">Scene graph & Rendering. No physics engine; custom AABB collision for deterministic gameplay.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-1 h-full bg-blue-500/50 rounded-full" />
                <div>
                  <strong className="block text-neutral-200">Zustand Store</strong>
                  <span className="text-sm text-neutral-500">Central bus for Game Flags, Narrator Queue, and Level State.</span>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-green-400 font-mono text-sm mb-4">BACKEND (SUPABASE)</h4>
              <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-1 h-full bg-green-500/50 rounded-full" />
                <div>
                  <strong className="block text-neutral-200">Anonymous Auth</strong>
                  <span className="text-sm text-neutral-500">Instant play. No friction.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-1 h-full bg-green-500/50 rounded-full" />
                <div>
                  <strong className="block text-neutral-200">Global Prank Tracking</strong>
                  <span className="text-sm text-neutral-500">Track total deaths and "trophies" across all players.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
