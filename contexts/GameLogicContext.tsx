import React, { createContext, useContext, ReactNode, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { triggerNarrator } from '../components/game/systems/Narrator';

// Placeholder for future System classes
class NarratorSystem {
  speak(text: string) { 
    triggerNarrator(text);
  }
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
  const narratorRef = useRef(new NarratorSystem());
  const prankRef = useRef(new PrankSystem());
  
  const startGame = () => {
    useGameStore.getState().startGame();
    triggerNarrator("Welcome to the initiative. Walk through the door.");
  };

  const pauseGame = () => {
    useGameStore.setState({ phase: 'PAUSED' });
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