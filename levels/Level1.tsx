import React, { useState } from 'react';
import { Wall, Floor, DoorFrame } from '../components/game/assets/ModularKit';
import { TriggerVolume } from '../components/game/systems/TriggerVolume';
import { FallingDoor } from '../components/game/pranks/FallingDoor';
import { HiddenMessage } from '../components/game/assets/HiddenMessage';
import { triggerNarrator } from '../components/game/systems/Narrator';

export const Level1: React.FC = () => {
  const [prankTriggered, setPrankTriggered] = useState(false);

  const handleTrigger = () => {
    setPrankTriggered(true);
    triggerNarrator("Oh. Budget cuts.");
  };

  return (
    <group>
      {/* --- Room 1: The Start --- */}
      <Floor position={[0, 0, 0]} size={[10, 10]} />
      <Wall position={[0, 2, 5]} width={10} />
      <Wall position={[-5, 2, 0]} width={10} rotation={[0, Math.PI/2, 0]} />
      <Wall position={[5, 2, 0]} width={10} rotation={[0, Math.PI/2, 0]} />
      
      {/* Hidden Message on the left wall */}
      <HiddenMessage 
        position={[-4.9, 2, 0]} 
        rotation={[0, Math.PI/2, 0]} 
        text="TRUST NOTHING" 
      />

      {/* Front Wall with Gap */}
      <Wall position={[-3, 2, -5]} width={4} />
      <Wall position={[3, 2, -5]} width={4} />
      <DoorFrame position={[0, 0, -5]} />

      {/* --- Hallway --- */}
      <Floor position={[0, 0, -15]} size={[4, 20]} color="#222" />
      <Wall position={[-2, 2, -15]} width={20} rotation={[0, Math.PI/2, 0]} />
      <Wall position={[2, 2, -15]} width={20} rotation={[0, Math.PI/2, 0]} />

      {/* --- The Fake Door (End of Hall) --- */}
      <Wall position={[0, 2, -25]} width={4} color="#111" />
      
      {/* The Prank: Door pivot is at the bottom, so position y=0 */}
      <FallingDoor position={[0, 0, -24.9]} triggered={prankTriggered} />

      {/* The Trigger: 5 units before the door */}
      <TriggerVolume 
        position={[0, 1, -20]} 
        size={[4, 2, 2]} 
        onEnter={handleTrigger} 
        debug={false} // Set true to see the red wireframe box
      />

    </group>
  );
};