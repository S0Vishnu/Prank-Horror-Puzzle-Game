import React, { useEffect, useRef } from 'react';
import { Mesh } from 'three';
import { usePhysicsStore } from '../../../store/physicsStore';

// --- Types ---
interface BaseProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  color?: string;
}

// --- Helper Hook for Collision ---
export const useCollider = (isTrigger = false) => {
  const ref = useRef<Mesh>(null);
  const register = usePhysicsStore((state) => state.registerCollider);
  const unregister = usePhysicsStore((state) => state.unregisterCollider);

  useEffect(() => {
    if (ref.current) {
      if (isTrigger) ref.current.userData.isTrigger = true;
      // Ensure the bounding box is up to date
      if (!ref.current.geometry.boundingBox) ref.current.geometry.computeBoundingBox();
      register(ref.current);
    }
    return () => {
      if (ref.current) unregister(ref.current);
    };
  }, [register, unregister, isTrigger]);

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

export const Ceiling: React.FC<BaseProps & { size?: [number, number] }> = ({ 
  position = [0, 4, 0], 
  rotation = [Math.PI / 2, 0, 0], 
  color = '#1a1a1a',
  size = [10, 10]
}) => {
  // Ceilings don't strictly need collision if the player can't fly, but we add it for "thrown" objects or jump limits.
  const ref = useCollider();
  return (
    <mesh ref={ref} position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.9} />
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
  // Simple frame shape - No collision on this wrapper, but walls inside have it.
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

export const Stairs: React.FC<BaseProps & { width?: number; height?: number; depth?: number; steps?: number }> = ({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    width = 2,
    height = 2,
    depth = 4,
    steps = 8
}) => {
    const rampRef = useCollider();
    
    // Calculate hypotenuse angle for the ramp
    const rampAngle = Math.atan2(height, depth);
    const rampLength = Math.sqrt(height*height + depth*depth);

    return (
        <group position={position} rotation={rotation}>
            {/* Visual Steps */}
            {Array.from({ length: steps }).map((_, i) => {
                const stepDepth = depth / steps;
                const stepHeight = height / steps;
                return (
                    <mesh 
                        key={i} 
                        position={[0, (i * stepHeight) + stepHeight/2, -(i * stepDepth) - stepDepth/2]}
                        receiveShadow 
                        castShadow
                    >
                        <boxGeometry args={[width, stepHeight, stepDepth]} />
                        <meshStandardMaterial color="#444" />
                    </mesh>
                );
            })}

            {/* Invisible Collision Ramp */}
            {/* Positioned to cover the tips of the stairs */}
            <mesh 
                ref={rampRef} 
                position={[0, height/2, -depth/2]} 
                rotation={[rampAngle, 0, 0]}
                visible={false} // Invisible in game, but acts as collider
            >
                <boxGeometry args={[width, 0.1, rampLength]} />
                <meshBasicMaterial color="red" wireframe />
            </mesh>
        </group>
    );
};