import React from 'react';
import { useCollider } from './ModularKit';

interface TableProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const Table: React.FC<TableProps> = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0] 
}) => {
  // Register collision for the tabletop
  const topRef = useCollider();

  return (
    <group position={position} rotation={rotation}>
      {/* Table Top */}
      <mesh ref={topRef} position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.1, 3]} />
        <meshStandardMaterial color="#3d2817" roughness={0.6} />
      </mesh>
      
      {/* Legs (Visual only, player collider will likely hit the top first or we can add small colliders) */}
      <mesh position={[-0.6, 0.4, -1.3]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#2d1c0f" />
      </mesh>
      <mesh position={[0.6, 0.4, -1.3]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#2d1c0f" />
      </mesh>
      <mesh position={[-0.6, 0.4, 1.3]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#2d1c0f" />
      </mesh>
      <mesh position={[0.6, 0.4, 1.3]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#2d1c0f" />
      </mesh>
    </group>
  );
};