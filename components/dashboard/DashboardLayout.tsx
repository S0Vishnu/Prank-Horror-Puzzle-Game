import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { AssetsView } from './phases/AssetsView';
import { DesignView } from './phases/DesignView';
import { SystemsView } from './phases/SystemsView';
import { LevelsView } from './phases/LevelsView';
import { UiUxView } from './phases/UiUxView';
import { AudioView } from './phases/AudioView';
import { MultiplayerView } from './phases/MultiplayerView';
import { PerformanceView } from './phases/PerformanceView';
import { useDashboard } from '../../contexts/DashboardContext';

export const DashboardLayout: React.FC = () => {
  const { activeTab } = useDashboard();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-200 font-sans selection:bg-emerald-500/30 flex flex-col">
      <Header />

      <main className="max-w-6xl w-full mx-auto p-6 grid grid-cols-12 gap-8 flex-1">
        <Sidebar />
        
        <div className="col-span-12 md:col-span-9">
          {activeTab === 'assets' && <AssetsView />}
          {activeTab === 'design' && <DesignView />}
          {activeTab === 'systems' && <SystemsView />}
          {activeTab === 'levels' && <LevelsView />}
          {activeTab === 'ui' && <UiUxView />}
          {activeTab === 'audio' && <AudioView />}
          {activeTab === 'multiplayer' && <MultiplayerView />}
          {activeTab === 'optimization' && <PerformanceView />}
        </div>
      </main>
    </div>
  );
};
