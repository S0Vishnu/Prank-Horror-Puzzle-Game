# Phase 6: Audio Design

## Audio Philosophy: "Silence is Tension, Noise is Information"

The audio landscape is sparse but highly detailed. Every sound serves a purpose: to inform, to terrify, or to lie.

## 1. Ambient Layers (The "Room Tone")

### Base Layer
A low-frequency industrial hum (40-60Hz) mixed with "empty room" air noise. This plays globally and loops seamlessly.

### Procedural Stingers
Randomly triggered sounds based on player stress (Torch flicker state):
*   **Low Stress:** Distant pipes, wood settling (creaks).
*   **High Stress:** "Breathing" walls, scratching inside drywall, faint whispers.

## 2. The Torch (Diegetic Interface)

The torch is the only persistent audio object attached to the player.
*   **Toggle:** Sharp, metallic "Click-Clack".
*   **Hum:** A barely audible high-pitched coil whine (14kHz) that fades in when the battery/intensity is unstable.
*   **Flicker:** Short bursts of white noise/static synchronized with the light intensity graph.

## 3. The Narrator System

### Voice Profile
Male, mid-range, dry wit. Think: A bored bureaucrat or a disappointed professor.
*   **Filter chain:** EQ (High pass + Low pass for "Intercom" feel) -> Slight Saturation -> Compressor.

### Spatial Logic
*   **Mode A (Standard):** Stereo, non-spatial (Head-locked). "Voice of God".
*   **Mode B (Prank):** Switches to `PositionalAudio`. The voice moves to a specific coordinate (e.g., right behind the player's left ear) to whisper, "Don't turn around."

## 4. Foley & Interaction

### Footsteps
Raycast downward detects material:
*   `Wood`: Hollow thuds.
*   `Carpet`: Muffled shuffling.
*   `Void/Glass`: Sharp clicks.

### UI Sounds (The "Glitch" UI)
*   **Hover:** Standard mechanical click.
*   **Hover (Trap Button):** A subtle, discordant piano note or low buzz.
*   **Error:** Instead of a generic "beep", play a Windows/OS system sound (USB disconnect) to break immersion.

## 5. Audio Pranks

### The "Phantom Runner"
Use `PositionalAudio` to simulate heavy footsteps running *towards* the player from a dark corridor. The sound stops abruptly 1 meter away.

### The "Volume" Lie
In the settings menu:
*   Turning "Master Volume" **DOWN** actually makes the ambient hum **LOUDER** (perceived quietness of the 'game' vs the 'room').
*   Muting the Narrator plays a clip: "I can still hear you."

### The "Fake Cue"
Video games teach players that specific sounds mean specific things (e.g., a "ding" means a door opened).
*   **Prank:** Play the "Door Open" sound. When the player turns to look, the door is still closed. It opens silently 5 seconds later.

## 6. Technical Stack
*   **Web Audio API:** Core.
*   **R3F / Drei:** `<PositionalAudio />` for 3D sounds.
*   **Howler.js (Optional):** If precise sprite management is needed, otherwise standard Audio objects.
