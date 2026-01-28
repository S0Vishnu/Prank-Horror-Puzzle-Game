# Phase 5: UI / UX & Game Flow

## Design Philosophy: "The Interface is a Liar"

The UI is not a neutral layer; it is part of the antagonist force. It will lie, glitch, and mock the player.

---

## 1. Screen Flow & States

### A. The Lobby (The "Safe" Zone?)
*   **Visuals:** stark black void, single spotlight on a vintage TV displaying the Title.
*   **Menu Options:**
    *   `[INITIATE]` (Start Game)
    *   `[CONFIG]` (Options)
    *   `[ABORT]` (Quit)
*   **The Prank:**
    *   Hovering over `[INITIATE]` causes the button to slide 50px away. You have to "corner" it or click it fast.
    *   Clicking `[ABORT]` plays a buzzer sound and the Narrator says "I don't think so."

### B. Level Roadmap (The "Loading" Screen)
*   **Visuals:** A subway-style map of nodes. Current level blinks.
*   **Behavior:**
    *   Loading bars are fake. They go to 99%, pause for 5 seconds, then drop to 12% before instantly finishing.
    *   "Tips" displayed at the bottom are unhelpful (e.g., "Try not dying.", "Doors open if you ask nicely. Just kidding.").

### C. In-Game HUD
*   **Reticle:** A tiny white dot. turns RED when looking at something dangerous, turns GREEN when looking at something interactable.
*   **Subtitles:** Mandatory. Large, yellow font (Stanley Parable style).
*   **Fake Elements:**
    *   **"Sanity Meter":** A bar that fluctuates randomly. Has 0 effect on gameplay.
    *   **"Objective":** Text in top-left.
        *   *Real:* "Find the exit."
        *   *Prank:* Changes to "Run." when the player stands still too long.

### D. Level Failed (Death Screen)
*   **Transition:** Hard cut to black or static glitch.
*   **Content:**
    *   Big red text: **"FAILURE"** or **"DISAPPOINTING"**.
    *   Narrator insult of the moment.
    *   `[RETRY]` button.
*   **Prank:** Sometimes the `[RETRY]` button is labeled `[GIVE UP]`. Hovering it switches it back to `[RETRY]`.

### E. Game Over / Endings
*   **Fake Crash:** The game simulates a browser crash or "Connection Lost" error.
*   **The Reveal:** The "Error Code" spells out "YOU WIN".
*   **Credits:** Scroll *down* instead of up.

---

## 2. Interaction Design (UX)

### The "E" Prompt
*   **Standard:** Floating text "Press E" near object.
*   **Prank variant:**
    *   Text reads "Don't Press E".
    *   If player presses E, the button *physically falls off the UI* (simulated physics on the text element) and clatters to the 3D floor.

### Settings Menu Pranks
*   **Volume Slider:** If dragged to 0%, it springs back to 10% with a "boing" sound. "I need you to hear me," says Narrator.
*   **Invert Mouse:** Occasionally unchecks itself.

---

## 3. Technical Implementation

### Components
*   `UI_Root`: Canvas overlay (R3F `Drei` Html or absolute div).
*   `SubtitleManager`: Subscribes to `NarratorStore`.
*   `PrankButton`: A reusable button component with `onHover` logic to flee cursor.

### Animation Stack
*   **CSS Keyframes:** For simple glitch effects.
*   **Framer Motion:** For UI element physics (springs, sliding buttons).
