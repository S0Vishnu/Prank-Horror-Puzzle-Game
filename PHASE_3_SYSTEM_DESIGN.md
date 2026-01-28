# Phase 3: System Design

## 1. Torchlight System (State-Driven)

The Torch is the player's primary tool and the game's primary way of signaling danger. It is not just a light source; it is a gameplay mechanic.

### State Properties (`TorchState`)
*   **`isOn`**: Global toggle.
*   **`color`**: 
    *   `#FDFBD3` (Warm White): Default / Safe.
    *   `#FF0000` (Red): Danger / Chase sequence.
    *   `#8800FF` (UV/Purple): Puzzle solving (reveals invisible ink).
*   **`range`**: Distance of the beam. Shortens when the "air is heavy" or during claustrophobic events.
*   **`intensity`**: Brightness.
*   **`flickerConfig`**: Deterministic flicker patterns (e.g., "SOS", "Dying Battery", "Demon presence").

### Implementation Details
*   **Component:** `Torch.tsx` attached to the Camera (First Person).
*   **Visuals:** Uses `@react-three/drei` `SpotLight` for high-quality shadows and volumetric feel (via `volumetric` prop if available, or fake cone).
*   **Logic:** `useFrame` hook interpolates position (smooth lag) and applies flicker noise.

---

## 2. Narrator System (The "Director")

A queue-based audio manager that reacts to player actions with personality.

### Architecture
*   **`NarratorStore`**: Manages the queue of lines to play.
*   **Priority Levels**:
    1.  **Critical**: Plot movement (cannot be interrupted).
    2.  **Reactive**: Prank success/fail (e.g., "Oh, you fell.").
    3.  **Idle**: Filler lines when player is stuck.
*   **Triggers**:
    *   `onEnterRegion(regionId)`
    *   `onInteract(objectId)`
    *   `onDeath(cause)`

---

## 3. Interaction System (Raycast)

Deterministic interaction system avoiding complex physics colliders for small objects.

### Logic (`useInteraction` hook)
1.  **Raycast**: Every frame (or every 100ms) from center of screen.
2.  **Filter**: Only hit objects with `userData: { interactable: true }`.
3.  **UI Feedback**: Show "E to Interact" HUD element when hit.
4.  **Execution**: On click/keypress, fire `object.onClick()` stored in the object's logic or look up `interactionMap[objectId]` in the store.

---

## 4. Procedural House Generation (Node-Based)

Levels are generated (or pseudo-generated) using a node graph to ensure solvability while allowing layout randomization.

### Room Graph Nodes
*   **StartNode**: Safe zone.
*   **ConnectorNode**: Hallways, stairs (places where pranks happen).
*   **PuzzleNode**: Room with a key/lock mechanic.
*   **TrapNode**: Room that looks like a PuzzleNode but is a trap.
*   **EndNode**: Level exit.

### Generation Step
1.  Select a "Theme" (e.g., Victorian, Hospital).
2.  Instantiate `StartNode`.
3.  Append `ConnectorNode` (Hallway).
4.  Branch to 1-3 `PuzzleNodes`.
5.  Link valid path to `EndNode`.
6.  **Prank Pass**: Iterate through generated nodes and inject `PrankTriggers` based on difficulty curve.

---

## 5. Deterministic Prank System

Pranks are scripted events that manipulate the scene graph directly.

### Prank Types
*   **Transform Prank**: `Door` moves 1 unit right when player looks away.
*   **Geometry Prank**: `Stairs` collider disables, mesh remains (phantom stairs).
*   **Light Prank**: All lights turn off except one distant red light.
*   **Loop Prank**: Exiting a room leads back to the same room entrance.

### Execution
*   **`PrankManager`**: A system that listens to `GameStore` state changes.
*   **Trigger**: `useRegionTrigger(bounds, callback)` hook in R3F.

---

## 6. Collision System (Custom AABB)

No heavy physics engine (Cannon/Rapier) to save performance and ensure tight control.

### Implementation
*   **Static World**: Octree or simple array of bounding boxes for walls/floors.
*   **Player Controller**:
    *   Calculate velocity.
    *   Propose new position.
    *   Check overlap with Static World AABBs.
    *   Slide along wall normal if collision detected.
*   **Stairs**: Handled as "Ramps" (special slope handling) or "Step Offset" (snap up if height diff < 0.3m).
