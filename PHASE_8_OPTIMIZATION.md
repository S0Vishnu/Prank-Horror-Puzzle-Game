# Phase 8: Performance & Optimization

## Philosophy: "Mobile Performance on Desktop Hardware"

Since the game relies on psychological tension, frame drops break immersion instantly. We target **60 FPS stable** on mid-range laptops by aggressively budgeting rendering resources.

---

## 1. Mesh Instancing (The Modular Kit)

We are using a "Modular House" asset pack. A single level might contain 500 wall segments.
*   **Problem:** 500 separate `Mesh` objects = 500 Draw Calls.
*   **Solution:** `InstancedMesh`.
*   **Implementation:**
    *   Use `@react-three/drei`'s `<Instances>`, `<Instance>` pattern.
    *   Group assets by material (e.g., `WoodFloorInstances`, `PlasterWallInstances`).
    *   **Logic:** The "Level Loader" parses the node graph and pushes transform matrices to the appropriate Instance component rather than creating new Meshes.

## 2. Lighting Strategy (Strict Budget)

Lighting is the most expensive operation in Forward Rendering.

### The Budget
*   **Dynamic Shadow Casters:** **1** (The Player's Torch).
*   **Ambient Light:** Minimal (0.1 intensity).
*   **Point Lights (Environment):** Maximum **4** active per room. Non-shadow casting.
*   **Baking:** Static lighting (AO, soft shadows) is baked into textures or vertex colors where possible. We do not use real-time Global Illumination.

### "Phantom" Lights
To simulate complex lighting without cost, we use **emissive materials** on meshes (e.g., neon signs, glowing eyes) combined with a screen-space `Bloom` effect post-processing pass.

---

## 3. Collision Optimization (Custom AABB)

Since we are **not** using a physics engine (Cannon/Rapier) to save WASM overhead:

### Spatial Partitioning
*   We do not check collision against every wall in the level.
*   **Technique:** A simplified **Grid System** or **Octree**.
*   **Process:**
    1.  Map Level Bounds to a 2D Grid (e.g., 2x2 meter cells).
    2.  Register static colliders (Walls) into these cells during Level Load.
    3.  **Runtime:** Player only checks collision against the cell they are in + 8 neighbors.

---

## 4. R3F Scene Structure & Rendering

### On-Demand Rendering?
*   **Decision:** **NO**.
*   **Reason:** The flashlight flicker and procedural ambiance require constant updates.
*   **Optimization:** However, we strictly manage `useFrame` subscriptions. Only active pranks subscribe to the frame loop. Static objects do not render logic.

### Component Lifecycle
*   **`LevelRoot`**: The parent component for a level.
*   **`Room`**: Wraps geometry.
*   **Lazy Loading:**
    *   Rooms are React Components.
    *   We track Player Node location.
    *   **Logic:** Render `CurrentNode` + `ConnectedNodes`.
    *   **Unmount:** Any node distance > 1 is unmounted (React removes from scene graph, Three.js geometry stays in memory, draw calls stop).

## 5. Memory Management & Garbage Collection

### Asset Pools
*   Geometries and Textures are loaded **once** at boot (Phase 0/1) and kept alive.
*   We do **not** dispose of the "Wall" geometry when unloading a level; we just hide the instances.
*   **Audio:** Decoded AudioBuffers are kept in a global `AudioManager` pool.

### Texture Compression
*   Format: **KTX2** or **WebP**.
*   Size: Max 2048x2048 for Atlases, 512x512 for Props.

---

## 6. Draw Call Reduction Checklist

1.  **Texture Atlasing:** Combine all "Furniture" textures into one UV map to allow single-material instancing.
2.  **Frustum Culling:** Enabled by default in Three.js, but we assist it by grouping small objects into larger bounding volumes.
3.  **UI:** The HUD is a single HTML overlay (DOM), keeping it out of the WebGL render pass entirely.

---

## 7. Performance Monitoring

*   **Tool:** `r3f-perf`.
*   **Metrics to Watch:**
    *   **Draw Calls:** Alert if > 100.
    *   **Triangles:** Alert if > 300k.
    *   **Texture Memory:** Alert if > 500MB.
