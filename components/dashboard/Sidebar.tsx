import React from 'react';
import { Lock, Gamepad2, Cpu, CheckCircle2, LayoutTemplate, Monitor, Volume2, Globe2, Zap } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useDashboard();

  return (
    <aside className="col-span-12 md:col-span-3 space-y-2">
      <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 px-2">
        Project Phases
      </div>
      
      <button
        onClick={() => setActiveTab('assets')}
        className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-3 group ${
          activeTab === 'assets'
            ? 'bg-neutral-800 border-neutral-600 text-white'
            : 'border-transparent text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300'
        }`}
      >
        <Lock className={`w-4 h-4 ${activeTab === 'assets' ? 'text-emerald-400' : ''}`} />
        <span>Phase 1: Assets</span>
        {activeTab !== 'assets' && <CheckCircle2 className="w-3 h-3 ml-auto text-emerald-500" />}
      </button>

      <button
        onClick={() => setActiveTab('design')}
        className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-3 ${
          activeTab === 'design'
            ? 'bg-neutral-800 border-neutral-600 text-white'
            : 'border-transparent text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300'
        }`}
      >
        <Gamepad2 className={`w-4 h-4 ${activeTab === 'design' ? 'text-blue-400' : ''}`} />
        <span>Phase 2: Core Design</span>
        {activeTab !== 'design' && <CheckCircle2 className="w-3 h-3 ml-auto text-blue-500" />}
      </button>

      <button
        onClick={() => setActiveTab('systems')}
        className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-3 ${
          activeTab === 'systems'
            ? 'bg-neutral-800 border-neutral-600 text-white'
            : 'border-transparent text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300'
        }`}
      >
        <Cpu className={`w-4 h-4 ${activeTab === 'systems' ? 'text-purple-400' : ''}`} />
        <span>Phase 3: Systems</span>
        {activeTab !== 'systems' && <CheckCircle2 className="w-3 h-3 ml-auto text-purple-500" />}
      </button>

      <button
        onClick={() => setActiveTab('levels')}
        className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-3 ${
          activeTab === 'levels'
            ? 'bg-neutral-800 border-neutral-600 text-white'
            : 'border-transparent text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300'
        }`}
      >
        <LayoutTemplate className={`w-4 h-4 ${activeTab === 'levels' ? 'text-indigo-400' : ''}`} />
        <span>Phase 4: Level Design</span>
        {activeTab !== 'levels' && <CheckCircle2 className="w-3 h-3 ml-auto text-indigo-500" />}
      </button>

      <button
        onClick={() => setActiveTab('ui')}
        className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-3 ${
          activeTab === 'ui'
            ? 'bg-neutral-800 border-neutral-600 text-white'
            : 'border-transparent text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300'
        }`}
      >
        <Monitor className={`w-4 h-4 ${activeTab === 'ui' ? 'text-pink-400' : ''}`} />
        <span>Phase 5: UI / UX</span>
        {activeTab !== 'ui' && <CheckCircle2 className="w-3 h-3 ml-auto text-pink-500" />}
      </button>

      <button
        onClick={() => setActiveTab('audio')}
        className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-3 ${
          activeTab === 'audio'
            ? 'bg-neutral-800 border-neutral-600 text-white'
            : 'border-transparent text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300'
        }`}
      >
        <Volume2 className={`w-4 h-4 ${activeTab === 'audio' ? 'text-teal-400' : ''}`} />
        <span>Phase 6: Audio</span>
        {activeTab !== 'audio' && <CheckCircle2 className="w-3 h-3 ml-auto text-teal-500" />}
      </button>

      <button
        onClick={() => setActiveTab('multiplayer')}
        className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-3 ${
          activeTab === 'multiplayer'
            ? 'bg-neutral-800 border-neutral-600 text-white'
            : 'border-transparent text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300'
        }`}
      >
        <Globe2 className={`w-4 h-4 ${activeTab === 'multiplayer' ? 'text-cyan-400' : ''}`} />
        <span>Phase 7: Multiplayer</span>
        {activeTab !== 'multiplayer' && <CheckCircle2 className="w-3 h-3 ml-auto text-cyan-500" />}
      </button>

      <button
        onClick={() => setActiveTab('optimization')}
        className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-3 ${
          activeTab === 'optimization'
            ? 'bg-neutral-800 border-neutral-600 text-white'
            : 'border-transparent text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300'
        }`}
      >
        <Zap className={`w-4 h-4 ${activeTab === 'optimization' ? 'text-yellow-500' : ''}`} />
        <span>Phase 8: Optimization</span>
      </button>
    </aside>
  );
};
