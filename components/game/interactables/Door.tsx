import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Group, Mesh } from 'three';
import { usePhysicsStore } from '../../../store/physicsStore';

interface DoorProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  label?: string;
  locked?: boolean;
}

export const Door: React.FC<DoorProps> = ({ 
  position, 
  rotation = [0, 0, 0], 
  label = "Open Door",
  locked = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const doorRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const register = usePhysicsStore((state) => state.registerCollider);
  const unregister = usePhysicsStore((state) => state.unregisterCollider);

  // Animation State
  const targetAngle = isOpen ? Math.PI / 2 : 0;
  const currentAngle = useRef(0);

  // Toggle Handler
  const interact = () => {
    if (locked) {
      // Future: Play "Locked" sound
      return;
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Register collider
    if (meshRef.current) {
        // Attach interact handler to userData so Player Raycast can find it
        meshRef.current.userData = {
            interactable: true,
            label: locked ? "Locked" : (isOpen ? "Close" : "Open"),
            onInteract: interact,
            // If open, set isTrigger to true so AABB collision doesn't block player 
            // (allows walking through the "doorway" without catching on the edge of the rotated mesh bounding box)
            isTrigger: isOpen
        };
        register(meshRef.current);
    }
    return () => {
        if (meshRef.current) unregister(meshRef.current);
    };
  }, [register, unregister, isOpen, locked]);

  useFrame((state, delta) => {
    // Smoothly interpolate angle
    const speed = 4; // Slightly faster for responsiveness
    currentAngle.current = MathUtils.lerp(currentAngle.current, targetAngle, speed * delta);
    
    if (doorRef.current) {
        doorRef.current.rotation.y = currentAngle.current;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Door Frame (Static) */}
      <mesh position={[-1.1, 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.2, 4, 0.4]} />
          <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[1.1, 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.2, 4, 0.4]} />
          <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0, 3.9, 0]} receiveShadow castShadow>
          <boxGeometry args={[2.4, 0.2, 0.4]} />
          <meshStandardMaterial color="#222" />
      </mesh>

      {/* The Door Pivot Group (Hinged on Left) */}
      <group position={[-1, 0, 0]}> 
        <group ref={doorRef}>
            {/* The Actual Door Mesh (Offset so pivot is at corner) */}
            <mesh 
                ref={meshRef}
                position={[1, 2, 0]} 
                castShadow 
                receiveShadow
            >
                <boxGeometry args={[2, 4, 0.2]} />
                <meshStandardMaterial color="#4A3C31" />
                {/* Knob */}
                <mesh position={[0.8, 0, 0.15]}>
                    <sphereGeometry args={[0.1]} />
                    <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.8} />
                </mesh>
            </mesh>
        </group>
      </group>
    </group>
  );
};