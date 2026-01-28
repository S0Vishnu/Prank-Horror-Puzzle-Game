import React from 'react';
import { Lock, Gamepad2, Cpu, CheckCircle2, LayoutTemplate } from 'lucide-react';
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
      </button>

      <div className="pt-4 mt-4 border-t border-neutral-800">
        <div className="px-4 py-2 text-xs text-neutral-600 font-mono">
          Pending:
        </div>
        <div className="px-4 py-1 text-sm text-neutral-500 flex items-center gap-2 opacity-50">
          <LayoutTemplate className="w-3 h-3" /> Level Design
        </div>
      </div>
    </aside>
  );
};
