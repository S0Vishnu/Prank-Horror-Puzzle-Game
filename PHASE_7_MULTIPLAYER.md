# Phase 7: Multiplayer (Asynchronous)

## Philosophy: "You are alone, but the ghosts of failure surround you."

We do not implement real-time player meshes. Instead, we persist the *traces* of other players to build an atmosphere of collective struggle. The Narrator uses this data to statistically prove your incompetence.

## 1. Supabase Schema Design

### A. Tables

#### `profiles` (Anonymous Auth)
*   `id`: UUID (Primary Key)
*   `created_at`: Timestamp
*   `total_deaths`: Integer
*   `current_level`: Integer
*   `sanity_score`: Float (calculated based on erratic movement/idling)

#### `death_markers` (The "Dark Souls" Bloodstains)
*   `id`: UUID
*   `level_id`: Integer
*   `position`: JSONB `{x: 0, y: 0, z: 0}`
*   `cause`: String (e.g., "FELL", "TRAPPED", "GAVE_UP")
*   `created_at`: Timestamp

#### `global_stats` (The Community Aggregator)
*   `key`: String (PK) (e.g., "doors_opened", "total_jumpscares")
*   `value`: BigInt

### B. Security (RLS)
*   **Read:** Public (everyone needs to see the ghosts).
*   **Write:** Authenticated users only (Anonymous).
*   **Update:** Users can only update their own rows.

## 2. Tracked Behavior & "Ghost" Data

### The Death Heatmap
When a player dies, we log the `{x, y, z}` coordinate.
*   **Client Rendering:** In R3F, we query `death_markers` for the current level.
*   **Visual:** Faint, chalk-like outlines or scorch marks appear on the floor where others died.
*   **Performance:** Limit to latest 50 markers per room to avoid draw call spam.

### The Vote (Social Engineering)
In levels with binary choices (e.g., Level 5 "Do The Opposite"):
*   We track the choice: `red_door_entries` vs `blue_door_entries`.
*   **In-Game UI:** A digital counter above the door shows the percentage of players who chose it. "82% chose this door. They all died."

## 3. Global Prank Escalation

The game difficulty or logic shifts based on global aggregates.

### The "Weighted" Door
A specific door in the Hub is locked. It has a counter: **0 / 10,000**.
*   Every time *any* player worldwide attempts to open it, the counter increments via a Supabase Edge Function.
*   When it hits 10,000, it unlocks for *everyone*, revealing a secret trophy room (or just a brick wall, for the prank).

### Narrative Infection
If a specific player (e.g., `User-XYZ`) dies 50 times in Level 2:
*   The Narrator might mention them to *you*: "I miss User-XYZ. They were persistent. Unlike you."

## 4. Narrator Integration

The Narrator pulls dynamic strings from the database on level load.

### Script Templates
*   **High Death Rate:** "Welcome to the meat grinder. {count} people died in this hallway. Try not to slip."
*   **Rare Achievement:** "Oh, you found the corner. Only {percent}% of subjects bother looking there."
*   **Speedrun Mockery:** "You are moving slower than the global average. Fascinating."

## 5. Technical Implementation

*   **Client:** `@supabase/supabase-js`
*   **Realtime:** Subscribe to `global_stats` for live counter updates.
*   **Batching:** Do not send every footstep. Send batches of events on `LevelExit` or `PlayerDeath` to save bandwidth/API quotas.
