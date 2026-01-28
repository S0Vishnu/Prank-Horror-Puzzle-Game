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
  color: string;
  intensity: number;
  range: number;
  angle: number;
  flickerConfig: FlickerConfig;
}

/**
 * Global Game State.
 */
interface GameState {
  // --- Torch Slice ---
  torch: TorchState;
  toggleTorch: () => void;
  setTorchProperties: (props: Partial<TorchState>) => void;
  setTorchFlicker: (active: boolean, speed?: number, variance?: number) => void;

  // --- Level/World Slice (Placeholder for Phase 4) ---
  levelIndex: number;
  isPaused: boolean;
}

export const useGameStore = create<GameState>((set) => ({
  // Initial Torch State
  torch: {
    isOn: true,
    color: '#FDFBD3', // Warm tungsten default
    intensity: 2.0,
    range: 12,
    angle: 0.6,
    flickerConfig: {
      active: false,
      speed: 10,
      variance: 0.2,
    },
  },

  // Initial World State
  levelIndex: 0,
  isPaused: false,

  // --- Actions ---

  toggleTorch: () =>
    set((state) => ({
      torch: { ...state.torch, isOn: !state.torch.isOn },
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
