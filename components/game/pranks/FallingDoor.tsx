import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { usePhysicsStore } from '../../../store/physicsStore';

interface FallingDoorProps {
  position: [number, number, number];
  triggered: boolean;
}

export const FallingDoor: React.FC<FallingDoorProps> = ({ position, triggered }) => {
  const groupRef = useRef<any>(null);
  const meshRef = useRef<Mesh>(null);
  const register = usePhysicsStore((state) => state.registerCollider);
  const unregister = usePhysicsStore((state) => state.unregisterCollider);

  const [velocity, setVelocity] = useState(0);
  const [angle, setAngle] = useState(0);

  // Register Physics
  useEffect(() => {
    if (meshRef.current) {
      // Ensure bounding box is computed for the dynamic object
      meshRef.current.geometry.computeBoundingBox();
      register(meshRef.current);
    }
    return () => {
      if (meshRef.current) unregister(meshRef.current);
    };
  }, [register, unregister]);

  useFrame((state, delta) => {
    if (triggered && angle > -Math.PI / 2) {
      // Simulate simple gravity fall
      // Increase velocity (gravity)
      const newVelocity = velocity + 15 * delta;
      
      // Apply velocity to angle
      const newAngle = Math.max(angle - newVelocity * delta, -Math.PI / 2);
      
      setVelocity(newVelocity);
      setAngle(newAngle);

      // Bounce effect at bottom
      if (newAngle <= -Math.PI / 2 && velocity > 2) {
         setVelocity(-velocity * 0.3); // Dampened bounce
         setAngle(-Math.PI / 2 + 0.01); 
      }
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[angle, 0, 0]}>
        {/* Pivot Point adjustment: The door rotates around its bottom edge */}
        <group position={[0, 1.5, 0]}> 
           <mesh ref={meshRef} castShadow receiveShadow>
             <boxGeometry args={[2, 3, 0.1]} />
             <meshStandardMaterial color="#8B4513" />
             {/* Door Knob */}
             <mesh position={[0.8, 0, 0.1]}>
               <sphereGeometry args={[0.1]} />
               <meshStandardMaterial color="gold" />
             </mesh>
           </mesh>
        </group>
    </group>
  );
};