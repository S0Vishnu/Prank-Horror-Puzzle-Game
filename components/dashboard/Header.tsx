import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-black font-bold">
            PH
          </div>
          <h1 className="font-bold tracking-tight text-lg text-neutral-200">Prank-Horror Project</h1>
          <span className="px-2 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-xs text-neutral-400 font-mono">
            DEV DASHBOARD
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm font-mono text-neutral-500">
          <span>R3F</span>
          <span>ZUSTAND</span>
          <span>CONTEXT</span>
        </div>
      </div>
    </header>
  );
};
