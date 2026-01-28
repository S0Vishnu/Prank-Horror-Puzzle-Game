# Phase 1: Asset Confirmation (LOCKED)

**STATUS: LOCKED**
**DATE:** 2023-10-27
**NO NEW ASSETS PERMITTED**

## Confirmed Asset Manifest

The following assets are confirmed available and will be the **ONLY** assets used for the duration of the project. All gameplay, level design, and visual mechanics must be achievable using only these items or code-generated primitives.

### 1. 3D Models (GLB/GLTF)
*   **Modular House Pieces:**
    *   Walls (Solid, Doorway, Windowed)
    *   Floors (Wood, Tile, Carpet)
    *   Ceilings
    *   Stairs (Straight, Spiral)
*   **Character Model:**
    *   Humanoid Rigger
*   **Interactive Props:**
    *   Furniture (Chairs, Tables, Cabinets)
    *   Light Fixtures (Lamps, Chandeliers)
    *   Doors (Separate mesh for frame and door)
    *   Keys / Collectibles

### 2. Animations (Baked)
*   **Character:**
    *   Idle
    *   Walk
    *   Run
    *   Interact/Reach
*   **Environment:**
    *   Door Open/Close

### 3. Audio
*   Basic sound effects (Sfx) and Voice placeholders (synthesized).

---

## Design Constraints based on Assets
1.  **Reuse:** Levels must be built by instancing the "Modular House Pieces" heavily.
2.  **Visuals:** Geometry complexity is limited to these assets. Variety must come from **lighting**, **post-processing**, and **creative placement** (scaling/rotation).
3.  **Interaction:** All interactables must map to the "Interact" animation of the character.
