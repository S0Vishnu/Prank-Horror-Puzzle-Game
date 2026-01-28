import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { SpotLight } from '@react-three/drei';
import { Vector3, SpotLight as ThreeSpotLight, Object3D, MathUtils } from 'three';
import { useGameStore } from '../../store/gameStore';

// Simple pseudo-random noise generator
const noise = (x: number) => {
  return Math.sin(x) * 0.5 + Math.sin(x * 2.3) * 0.3 + Math.sin(x * 4.7) * 0.2;
};

/**
 * A state-driven flashlight component.
 * It strictly follows the camera position (simulating a held item)
 * and reacts to global state changes for color, intensity, and flicker.
 */
export const Torch: React.FC = () => {
  const lightRef = useRef<ThreeSpotLight>(null);
  const targetRef = useRef<Object3D>(new Object3D());
  const scene = useThree((state) => state.scene);

  // Subscribe to store state
  const { isOn, isUV, color, intensity, range, angle, flickerConfig } = useGameStore(
    (state) => state.torch
  );

  // Add the target object to the scene graph manually so the SpotLight can track it.
  useEffect(() => {
    scene.add(targetRef.current);
    return () => {
      scene.remove(targetRef.current);
    };
  }, [scene]);

  useFrame(({ camera, clock }) => {
    if (!lightRef.current) return;

    // 1. POSITIONING
    // Offset the torch slightly to the right and down to simulate holding it in the right hand.
    const handOffset = new Vector3(0.25, -0.3, 0.1); 
    handOffset.applyQuaternion(camera.quaternion);
    
    // Copy camera position + offset
    lightRef.current.position.copy(camera.position).add(handOffset);

    // 2. TARGETING
    // Calculate where the camera is looking
    const lookDir = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const targetDistance = 5; // Target is 5 units ahead
    
    // Update target position
    targetRef.current.position.copy(camera.position).add(lookDir.multiplyScalar(targetDistance));
    
    // Update the light's target reference
    lightRef.current.target = targetRef.current;

    // 3. FLICKER LOGIC
    let currentIntensity = intensity;
    
    if (isOn && flickerConfig.active) {
      const time = clock.elapsedTime;
      // Multi-layered sine waves for "organic" bad connection feel
      const n = noise(time * flickerConfig.speed);
      
      // Occasional deep dips (simulating loose contact)
      const sharpDip = Math.random() > 0.95 ? 0.0 : 1.0;
      
      // Apply variance
      // Base intensity + (Noise * Variance * Intensity)
      // Then multiply by sharpDip to simulate total cutouts
      const flickerMod = 1 + (n * flickerConfig.variance);
      currentIntensity = MathUtils.clamp(intensity * flickerMod * sharpDip, 0, intensity * 2);
    }

    // Apply final intensity (0 if off)
    lightRef.current.intensity = isOn ? currentIntensity : 0;
  });

  // Determine active color: UV Purple or State Color
  const activeColor = isUV ? '#8800FF' : color;

  return (
    <SpotLight
      ref={lightRef}
      color={activeColor}
      distance={range}
      angle={angle}
      attenuation={5}
      anglePower={5}
      penumbra={0.2} 
      castShadow
      shadow-bias={-0.0001}
    />
  );
};