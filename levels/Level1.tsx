import React, { useState } from 'react';
import { Wall, Floor, Ceiling, Stairs } from '../components/game/assets/ModularKit';
import { Table } from '../components/game/assets/Furniture';
import { Candle } from '../components/game/assets/Candle';
import { Door } from '../components/game/interactables/Door';
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
      {/* --- ROOM 1: The Start --- */}
      {/* Structure */}
      <Floor position={[0, 0, 0]} size={[10, 10]} />
      <Ceiling position={[0, 4, 0]} size={[10, 10]} />
      
      {/* Walls */}
      <Wall position={[0, 2, 5]} width={10} /> {/* Back */}
      <Wall position={[-5, 2, 0]} width={10} rotation={[0, Math.PI/2, 0]} /> {/* Left */}
      <Wall position={[5, 2, 0]} width={10} rotation={[0, Math.PI/2, 0]} /> {/* Right */}
      <Wall position={[-3, 2, -5]} width={4} /> {/* Front Left */}
      <Wall position={[3, 2, -5]} width={4} /> {/* Front Right */}
      <Wall position={[0, 3.5, -5]} width={2} height={1} /> {/* Door Header */}

      {/* Interactive Door Leading Out */}
      <Door position={[0, 0, -5]} />

      {/* Decor */}
      <HiddenMessage 
        position={[-4.9, 2, 0]} 
        rotation={[0, Math.PI/2, 0]} 
        text="TRUST NOTHING" 
      />
      
      <Table position={[3, 0, 2]} rotation={[0, -0.4, 0]} />
      <Candle position={[3.2, 0.8, 2.1]} intensity={0.8} />
      <Candle position={[2.8, 0.8, 1.9]} intensity={0.6} />

      {/* --- HALLWAY SECTION --- */}
      
      {/* Segment 1: Upper Landing */}
      <Floor position={[0, 0, -10]} size={[4, 10]} color="#222" />
      <Ceiling position={[0, 4, -10]} size={[4, 10]} />
      <Wall position={[-2, 2, -10]} width={10} rotation={[0, Math.PI/2, 0]} />
      <Wall position={[2, 2, -10]} width={10} rotation={[0, Math.PI/2, 0]} />

      {/* Segment 2: The Dip (Stairs) */}
      <Stairs position={[0, -2, -15]} rotation={[0, Math.PI, 0]} /> {/* Down */}
      <Floor position={[0, -2, -18]} size={[4, 4]} color="#111" />   {/* Bottom Landing */}
      <Ceiling position={[0, 2, -18]} size={[4, 10]} />              {/* Lower Ceiling */}
      <Wall position={[-2, 0, -18]} width={6} height={8} rotation={[0, Math.PI/2, 0]} />
      <Wall position={[2, 0, -18]} width={6} height={8} rotation={[0, Math.PI/2, 0]} />

      <Stairs position={[0, -2, -21]} /> {/* Up */}

      {/* Segment 3: The End Corridor */}
      <Floor position={[0, 0, -24]} size={[4, 4]} />
      <Ceiling position={[0, 4, -24]} size={[4, 4]} />
      <Wall position={[-2, 2, -24]} width={4} rotation={[0, Math.PI/2, 0]} />
      <Wall position={[2, 2, -24]} width={4} rotation={[0, Math.PI/2, 0]} />

      {/* --- THE PRANK --- */}
      <Wall position={[0, 2, -26.1]} width={4} color="#000" /> {/* Backstop Wall */}
      <FallingDoor position={[0, 0, -26]} triggered={prankTriggered} />

      <TriggerVolume 
        position={[0, 1, -22]} 
        size={[4, 2, 2]} 
        onEnter={handleTrigger} 
        debug={false} 
      />

    </group>
  );
};