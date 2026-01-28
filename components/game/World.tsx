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
  const levelVersion = useGameStore((state) => state.levelVersion);

  return (
    <div id="game-root" className="w-full h-screen bg-black">
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ fov: 75 }}>
          {/* --- Environment --- */}
          <color attach="background" args={['#020202']} />
          <Sky sunPosition={[0, -10, -100]} inclination={0.2} azimuth={180} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* Mild Ambient Light so total darkness isn't pitch black */}
          <ambientLight intensity={0.2} color="#1a1a2e" />
          
          {/* --- Game Objects --- */}
          {phase === 'PLAYING' && <Player />}

          {/* --- Level Management --- */}
          {/* Keying by levelVersion forces a full re-mount of the level, resetting local state */}
          <Level1 key={levelVersion} />
          
        </Canvas>
      </KeyboardControls>
    </div>
  );
};