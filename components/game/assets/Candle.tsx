import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointLight } from 'three';

interface CandleProps {
  position?: [number, number, number];
  intensity?: number;
  color?: string;
}

export const Candle: React.FC<CandleProps> = ({ 
  position = [0, 0, 0],
  intensity = 1,
  color = "#ffaa00"
}) => {
  const lightRef = useRef<PointLight>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      // Gentle flicker logic
      const t = clock.elapsedTime;
      const flicker = Math.sin(t * 10) * 0.1 + Math.cos(t * 23) * 0.1 + Math.sin(t * 43) * 0.05;
      lightRef.current.intensity = intensity + flicker;
      lightRef.current.position.y = 0.3 + flicker * 0.05; // Slight movement
    }
  });

  return (
    <group position={position}>
      {/* Wax Body */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.2, 12]} />
        <meshStandardMaterial color="#eecfa1" roughness={0.3} />
      </mesh>
      
      {/* Wick */}
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.04, 6]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      
      {/* Flame Visual (Billboard-ish) */}
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#ff5500" />
      </mesh>

      {/* Light Source */}
      <pointLight 
        ref={lightRef}
        position={[0, 0.3, 0]} 
        distance={4} 
        decay={2} 
        color={color} 
        castShadow
        shadow-bias={-0.001}
      />
    </group>
  );
};