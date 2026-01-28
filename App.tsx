import React from 'react';
import { DashboardProvider } from './contexts/DashboardContext';
import { GameLogicProvider } from './contexts/GameLogicContext';
import { DashboardLayout } from './components/dashboard/DashboardLayout';

const App: React.FC = () => {
  return (
    <DashboardProvider>
      <GameLogicProvider>
        <DashboardLayout />
      </GameLogicProvider>
    </DashboardProvider>
  );
};

export default App;
