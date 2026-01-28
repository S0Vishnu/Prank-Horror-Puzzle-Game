# Phase 4: Level Design

## Level 1: "Too Easy"
*A tutorial that teaches the player not to trust their eyes.*

### Room Graph
`StartNode` (Small 4x4 room) -> `HallwayNode` (Straight, 10m) -> `EndNode` (Visible Door).

### The Prank (The Cardboard Cutout)
1.  **Setup:** The player sees a lit door at the end of the hall.
2.  **Trigger:** When Player gets within 2m of the door.
3.  **Action:** The "Door" object un-parents from the wall and applies physics, falling flat forward like a cardboard cutout. It creates a loud *slap* sound.
4.  **Completion:** The *real* exit is actually the wall behind the player's starting position, which silently slides open when the cardboard door falls.

### Torch Behavior
*   Standard Warm White.
*   No special states.

### Narrator Script
*   **Entry:** "Welcome to the initiative. Your task is complex: Walk through the door."
*   **On Prank:** (Dry chuckle) "Oh. Budget cuts."
*   **Success:** "Competent. Barely."

---

## Level 2: "Repeat Offender"
*A non-euclidean loop that punishes insanity.*

### Room Graph
`Lobby` -> `Corridor` -> `Door` -> (Teleports to `Lobby`).

### The Prank (The Loop)
1.  **Setup:** A standard corridor.
2.  **Action:** Walking through the door seamlessly teleports the player back to the start coordinate.
3.  **Progression:**
    *   **Loop 1:** Standard.
    *   **Loop 2:** The light flickers. A painting on the wall changes to a frowning face.
    *   **Loop 3:** The Torch turns **RED**. The corridor appears rusted/decayed.
4.  **Completion:** In Loop 3, while the Torch is RED, an invisible message appears on the floor in UV ink (simulated): *"LOOK UP"*. The real exit is a trapdoor in the ceiling that only opens when the player looks strictly up for 3 seconds.

### Narrator Script
*   **Entry:** "Deja vu is a glitch in the brain. Don't worry about it."
*   **Loop 1:** "Back again?"
*   **Loop 2:** "I admire the persistence. I really do."
*   **Success:** "Finally. My neck was starting to hurt watching you."

---

## Level 3: "Trust Issues"
*Introduction to the invisible collision mechanics.*

### Room Graph
`Entry` -> `ChasmRoom` (Large gap) -> `Exit`.

### The Prank (The Phantom Bridge)
1.  **Setup:** A visible stone bridge spans a dark pit.
2.  **Action:** The visible bridge has `collision: false`. Stepping on it causes the player to fall into the void (Reset).
3.  **Completion:** An *invisible* winding path exists to the left of the bridge. It is only revealed when the Torch flashes (The torch auto-flickers in this room).
4.  **Death Handling:** Player hits a trigger volume at Y=-10. Teleport to Start.

### Narrator Script
*   **Entry:** "Mind the gap. The architecture is... mostly theoretical."
*   **Death:** "Gravity works. Confirmed."
*   **Success:** "You have trust issues. Good."

---

## Level 4: "Stop Trying"
*A mechanic based on player velocity.*

### Room Graph
`InfiniteHallway` (Procedural segments add themselves).

### The Prank (The Running Man)
1.  **Setup:** The door is visible 20m away.
2.  **Action:** The door moves away from the player at `PlayerSpeed * 1.2`. If the player sprints, the door flees faster.
3.  **Completion:** The player must **stop moving** completely.
    *   After 3 seconds of idle, the door curiously creeps *towards* the player (Weeping Angel style, but friendly-ish).
    *   If the player moves, the door snaps back to distance.
    *   Once the door is within reach, it stays put.

### Narrator Script
*   **Entry:** "There is no rush. Seriously."
*   **Running:** "Run, Forrest, Run!" / "Faster! You almost caught physics!"
*   **Idle (Success):** "See? things come to those who wait."

---

## Level 5: "Do The Opposite"
*Direct disobedience training.*

### Room Graph
`Hub` -> Splits to `RedDoor` and `BlueDoor`.

### The Prank (Simon Says Die)
1.  **Setup:** Two doors.
2.  **Action:** Narrator gives a command.
    *   "Go through the Red Door."
3.  **Logic:**
    *   `RedDoor`: Trigger `Death`.
    *   `BlueDoor`: Trigger `Success`.
4.  **Variation:** The signs above the doors swap text when the player blinks (camera look away), but the colors stay the same.

### Narrator Script
*   **Entry:** "Simple instructions. Go through the Red Door."
*   **Approach Red:** "Yes, the Red one. Excellent obedience."
*   **Death (Red):** "I lied."
*   **Success (Blue):** "An anarchist. I hate anarchists."
