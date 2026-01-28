import { create } from 'zustand';

/**
 * Configuration for the torch's flicker effect.
 */
interface FlickerConfig {
  active: boolean;
  speed: number;    // Frequency of flicker
  variance: number; // Intensity variance (0.0 to 1.0)
}

/**
 * State definitions for the Player's Torch.
 */
interface TorchState {
  isOn: boolean;
  isUV: boolean; // New: UV Mode
  color: string;
  intensity: number;
  range: number;
  angle: number;
  flickerConfig: FlickerConfig;
}

type GamePhase = 'LOBBY' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';

/**
 * Global Game State.
 */
interface GameState {
  phase: GamePhase;
  levelVersion: number; // Used to key level components for reset
  
  // --- Torch Slice ---
  torch: TorchState;
  
  // --- Actions ---
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  resetLevel: () => void;
  
  toggleTorch: () => void;
  toggleUV: () => void; // New action
  setTorchProperties: (props: Partial<TorchState>) => void;
  setTorchFlicker: (active: boolean, speed?: number, variance?: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  phase: 'LOBBY',
  levelVersion: 0,

  // Initial Torch State
  torch: {
    isOn: true,
    isUV: false,
    color: '#FDFBD3', // Warm tungsten default
    intensity: 5.0, // Increased for better visibility with ambient light
    range: 15,
    angle: 0.6,
    flickerConfig: {
      active: false,
      speed: 10,
      variance: 0.2,
    },
  },

  startGame: () => set({ phase: 'PLAYING' }),
  pauseGame: () => set({ phase: 'PAUSED' }),
  resumeGame: () => set({ phase: 'PLAYING' }),
  endGame: () => set({ phase: 'GAME_OVER' }),
  
  resetLevel: () => set((state) => ({ levelVersion: state.levelVersion + 1 })),

  toggleTorch: () =>
    set((state) => ({
      torch: { ...state.torch, isOn: !state.torch.isOn },
    })),

  toggleUV: () =>
    set((state) => ({
      torch: { ...state.torch, isUV: !state.torch.isUV },
    })),

  setTorchProperties: (props) =>
    set((state) => ({
      torch: { ...state.torch, ...props },
    })),

  setTorchFlicker: (active, speed = 10, variance = 0.2) =>
    set((state) => ({
      torch: {
        ...state.torch,
        flickerConfig: { active, speed, variance },
      },
    })),
}));