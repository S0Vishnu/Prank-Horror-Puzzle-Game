# Phase 2: Core Game Design

## 1. Game Pillars

### A. Unreliable Reality (The "Level Devil" Influence)
The game world is hostile and deceptive. Rules learned in Level 1 may be inverted in Level 2.
*   **Mechanic:** Pranks.
*   **Examples:** Stairs that flatten into a ramp, doors that walk away, gravity that flips, invisible walls that appear when you hold a light.

### B. The Antagonist Narrator (The "Stanley Parable" Influence)
A disembodied voice that claims to be helpful but finds amusement in your failure.
*   **Mechanic:** Reactive Audio.
*   **Examples:** "Oh, I wouldn't go through that door," (Door is actually safe, the other one is a trap). Laughs when you die.

### C. Light is Knowledge (And Danger)
The player holds a flashlight (Torch).
*   **Mechanic:** Dynamic Visibility.
*   **Twist:** Some objects only exist when lit. Others *chase* you only when lit.

---

## 2. Tech Stack & Architecture

### Frontend (Rendering & Input)
*   **Engine:** React Three Fiber (R3F).
*   **Physics:** **NONE**. Custom AABB (Axis-Aligned Bounding Box) collision detection for deterministic control.
*   **Camera:** First-person or tight Third-person (depending on character rig).
*   **State:** `zustand`. Single store for flags (`hasKey`, `doorOpen`, `narratorLineIndex`).

### Backend (Persistence & Multiplayer)
*   **Supabase:**
    *   **Auth:** Anonymous sign-in (Guest).
    *   **DB:** `global_death_counter`, `player_progress`.
    *   **Realtime:** See other players' "ghosts" (simple position syncing) or death markers.

### Systems Overview

#### The "Director" (Game Loop)
A custom hook `useGameLoop` that runs every frame.
1.  Update Player Position (Velocity + Collision).
2.  Check Interaction Raycast.
3.  Update Prank State (e.g., if player is at X > 50, move Door to Y + 10).
4.  Trigger Narrator Lines.

#### The Prank System
Pranks are NOT random. They are deterministic triggers.
*   `Trigger`: Region (Enter Box), State (Has Key), Time (Wait 5s).
*   `Action`: Transform Object, Play Sound, Kill Player, Fake Crash (UI).

---

## 3. Gameplay Loop

1.  **Spawn:** Player appears in a "Safe Room" (Lobby).
2.  **Objective:** Narrator states a simple goal ("Walk through the door").
3.  **Obstacle:** The environment shifts (The door is painted on the wall).
4.  **Adaptation:** Player finds the real mechanism (The window is the door).
5.  **Completion:** Exit level -> Load next Scene.
6.  **Failure:** Instant reset to start of level + Mocking voice line.
