import React from 'react';
import { Text } from '@react-three/drei';
import { useGameStore } from '../../../store/gameStore';

interface HiddenMessageProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  text: string;
  size?: number;
}

export const HiddenMessage: React.FC<HiddenMessageProps> = ({ 
  position, 
  rotation = [0, 0, 0], 
  text, 
  size = 0.5 
}) => {
  const isUV = useGameStore((state) => state.torch.isUV);

  return (
    <group position={position} rotation={rotation}>
      <Text
        fontSize={size}
        color={isUV ? "#00FF00" : "#222"} // Invisible dark grey vs Glowing Green
        anchorX="center"
        anchorY="middle"
        fillOpacity={isUV ? 1 : 0} // Fully invisible if not UV, strictly
      >
        {text}
      </Text>
      {/* Decal Background only visible in UV */}
      {isUV && (
        <mesh position={[0, 0, -0.01]}>
           <planeGeometry args={[text.length * size * 0.6, size * 1.5]} />
           <meshBasicMaterial color="#110033" opacity={0.5} transparent />
        </mesh>
      )}
    </group>
  );
};