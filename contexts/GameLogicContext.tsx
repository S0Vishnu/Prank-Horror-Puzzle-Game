import React, { createContext, useContext, ReactNode, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

// Placeholder for future System classes
class NarratorSystem {
  speak(text: string) { console.log(`[Narrator]: ${text}`); }
}

class PrankSystem {
  trigger(id: string) { console.log(`[Prank]: Triggered ${id}`); }
}

interface GameLogicContextType {
  narrator: NarratorSystem;
  pranks: PrankSystem;
  startGame: () => void;
  pauseGame: () => void;
}

const GameLogicContext = createContext<GameLogicContextType | undefined>(undefined);

export const GameLogicProvider = ({ children }: { children: ReactNode }) => {
  // We use refs for systems to avoid re-renders when internal system state changes
  // This is crucial for game loop performance vs React render cycle
  const narratorRef = useRef(new NarratorSystem());
  const prankRef = useRef(new PrankSystem());
  
  // Access zustand store for state updates
  const setGamePaused = useGameStore((state) => (paused: boolean) => {
     // implementation would go here if we exposed a setPaused action in store
     console.log("Game Pause State:", paused);
  });

  const startGame = () => {
    console.log("Initializing Game Loop...");
    narratorRef.current.speak("Welcome to the test environment.");
  };

  const pauseGame = () => {
    console.log("Pausing Game Loop...");
  };

  return (
    <GameLogicContext.Provider value={{
      narrator: narratorRef.current,
      pranks: prankRef.current,
      startGame,
      pauseGame
    }}>
      {children}
    </GameLogicContext.Provider>
  );
};

export const useGameLogic = () => {
  const context = useContext(GameLogicContext);
  if (!context) {
    throw new Error('useGameLogic must be used within a GameLogicProvider');
  }
  return context;
};
