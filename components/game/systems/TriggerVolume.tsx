import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box3, Vector3 } from 'three';

interface TriggerVolumeProps {
  position: [number, number, number];
  size: [number, number, number];
  onEnter: () => void;
  debug?: boolean;
}

export const TriggerVolume: React.FC<TriggerVolumeProps> = ({ position, size, onEnter, debug = false }) => {
  const { camera } = useThree();
  const box = useRef(new Box3());
  const triggered = useRef(false);

  // Pre-calculate bounds
  const center = new Vector3(...position);
  const halfSize = new Vector3(...size).multiplyScalar(0.5);
  box.current.min.copy(center).sub(halfSize);
  box.current.max.copy(center).add(halfSize);

  useFrame(() => {
    if (triggered.current) return;
    
    if (box.current.containsPoint(camera.position)) {
      triggered.current = true;
      onEnter();
    }
  });

  return debug ? (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial color="red" wireframe />
    </mesh>
  ) : null;
};
