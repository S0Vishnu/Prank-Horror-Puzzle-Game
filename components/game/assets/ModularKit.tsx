import React, { useEffect, useRef } from 'react';
import { Mesh, Box3 } from 'three';
import { usePhysicsStore } from '../../../store/physicsStore';

// --- Types ---
interface BaseProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  color?: string;
}

// --- Helper Hook for Collision ---
const useCollider = () => {
  const ref = useRef<Mesh>(null);
  const register = usePhysicsStore((state) => state.registerCollider);
  const unregister = usePhysicsStore((state) => state.unregisterCollider);

  useEffect(() => {
    if (ref.current) {
      // Ensure the bounding box is up to date
      ref.current.geometry.computeBoundingBox();
      register(ref.current);
    }
    return () => {
      if (ref.current) unregister(ref.current);
    };
  }, [register, unregister]);

  return ref;
};

// --- Components ---

export const Floor: React.FC<BaseProps & { size?: [number, number] }> = ({ 
  position = [0, 0, 0], 
  rotation = [-Math.PI / 2, 0, 0], 
  color = '#333',
  size = [10, 10]
}) => {
  const ref = useCollider();
  return (
    <mesh ref={ref} position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
};

export const Wall: React.FC<BaseProps & { width?: number; height?: number }> = ({
  position = [0, 2, 0], // Center height default 2m (4m tall wall)
  rotation = [0, 0, 0],
  color = '#555',
  width = 4,
  height = 4
}) => {
  const ref = useCollider();
  return (
    <mesh ref={ref} position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={[width, height, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export const DoorFrame: React.FC<BaseProps> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  // Simple frame shape
  return (
    <group position={position} rotation={rotation}>
      {/* Left Post */}
      <Wall position={[-1.1, 2, 0]} width={0.2} height={4} color="#222" />
      {/* Right Post */}
      <Wall position={[1.1, 2, 0]} width={0.2} height={4} color="#222" />
      {/* Header */}
      <Wall position={[0, 3.5, 0]} width={2.4} height={1} color="#222" />
    </group>
  );
};
