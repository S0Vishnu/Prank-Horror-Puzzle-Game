# Phase 0: Project Bootstrap (MANDATORY)

## 1. Recommended Base React Project Structure

The project is structured to separate concern between the React UI layer (HUD, Menus) and the 3D Scene layer (R3F). We adhere to a "systems-based" approach for game logic rather than deep OOP hierarchies.

### Core Philosophy
- **State Management:** `zustand` is the single source of truth for game state (level, flags, inventory, narrator queue).
- **Rendering:** `React Three Fiber` handles the scene graph. `Drei` is used for optimized helpers.
- **Logic:** Custom hooks (`useGameLoop`, `useInteraction`) drive the gameplay.

## 2. Required Libraries & Tools

These are the libraries currently integrated or required for the next steps:

*   **Core:** `react`, `react-dom`, `typescript`, `vite`
*   **3D Graphics:** `three`, `@react-three/fiber`, `@react-three/drei`
*   **State:** `zustand`
*   **Backend/Multiplayer:** `@supabase/supabase-js`
*   **Styling:** `tailwindcss`
*   **Utils:** `uuid` (for unique interaction IDs), `clsx`/`tailwind-merge` (for UI dynamic classes)

## 3. Initial Folder Structure

```text
/
├── components/          # Reusable UI components (Button, Modal)
│   ├── ui/              # 2D HUD, Menus, Dialog Boxes
│   └── game/            # 3D R3F Components (Player, Torch, Props)
├── hooks/               # Logic hooks (useNarrator, useControls)
├── store/               # Zustand stores (gameStore.ts, narratorStore.ts)
├── systems/             # Complex logic (InteractionSystem, ProceduralGen)
├── lib/                 # Third-party configs (Supabase client)
├── types/               # TypeScript interfaces
├── constants.ts         # Global configs (Physics tags, Asset paths)
├── App.tsx              # Main entry / Routing
└── PHASE_0_BOOTSTRAP.md # This document
```

---

## 4. STOP: ASSET REQUEST

**WE CANNOT PROCEED TO PHASE 1 UNTIL THE ASSETS ARE CONFIRMED.**

To design the specific mechanics (collision bounds, interaction points, visual style), we need to know what we are working with.

**Please provide the following:**

1.  **Asset Types:** What models are available? (e.g., "Generic House Pack", "Sci-Fi Corridors", "Dungeon Kit", or "Just basic geometric shapes"?)
2.  **Asset Formats:** Do you have `.glb` / `.gltf` files ready? Or raw textures?
3.  **Animations:** Do the models have baked animations (e.g., doors opening, player walking) or will we animate them procedurally in R3F?
4.  **Audio:** Do we have sound files (wav/mp3) or are we synthesizing/using placeholders?

**Awaiting user input to proceed to Phase 1 (Asset Confirmation).**
