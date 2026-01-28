import React from 'react';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls, Sky, Stars } from '@react-three/drei';
import { Player } from './Player';
import { useGameStore } from '../../store/gameStore';
import { Level1 } from '../../levels/Level1';

// Keyboard mapping
const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
  { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
  { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
  { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
  { name: 'interact', keys: ['e', 'E'] },
  { name: 'jump', keys: ['Space'] },
];

export const World: React.FC = () => {
  const phase = useGameStore((state) => state.phase);

  return (
    <div id="game-root" className="w-full h-screen bg-black">
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ fov: 75 }}>
          {/* --- Environment --- */}
          <color attach="background" args={['#050505']} />
          <Sky sunPosition={[0, 0, -1]} inclination={0.2} azimuth={180} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <ambientLight intensity={0.1} />
          
          {/* --- Game Objects --- */}
          {phase === 'PLAYING' && <Player />}

          {/* --- Level Management --- */}
          <Level1 />
          
        </Canvas>
      </KeyboardControls>
    </div>
  );
};
