import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { SpotLight } from '@react-three/drei';
import { Vector3, SpotLight as ThreeSpotLight, Object3D, MathUtils } from 'three';
import { useGameStore } from '../../store/gameStore';

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
  const { isOn, color, intensity, range, angle, flickerConfig } = useGameStore(
    (state) => state.torch
  );

  // Add the target object to the scene graph manually so the SpotLight can track it.
  // We do this because the target needs to exist in the world, but not necessarily 
  // as a child of the Torch component if we want absolute positioning logic.
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
      // Combine two sine waves for a more irregular pulse
      const noise = Math.sin(time * flickerConfig.speed) + 
                    Math.sin(time * flickerConfig.speed * 2.5) * 0.5;
      
      // Apply variance
      const flickerFactor = 1 + (noise * flickerConfig.variance);
      
      // Clamp to ensure we don't get negative light (unless intended)
      currentIntensity = MathUtils.clamp(intensity * flickerFactor, 0.1, intensity * 2);
    }

    // Apply final intensity (0 if off)
    lightRef.current.intensity = isOn ? currentIntensity : 0;
  });

  return (
    <SpotLight
      ref={lightRef}
      color={color}
      distance={range}
      angle={angle}
      attenuation={5}
      anglePower={5} // High anglePower creates a sharper edge, more like a flashlight
      penumbra={0.2} // Soft edge
      castShadow
      shadow-bias={-0.0001}
    />
  );
};
