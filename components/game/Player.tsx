import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls, useKeyboardControls } from '@react-three/drei';
import { Vector3, Box3, Sphere, Mesh } from 'three';
import { Torch } from './Torch';
import { useGameStore } from '../../store/gameStore';
import { usePhysicsStore } from '../../store/physicsStore';

const SPEED = 5;
const PLAYER_RADIUS = 0.5;
const PLAYER_HEIGHT = 1.8;

export const Player: React.FC = () => {
  const { camera } = useThree();
  const [sub, get] = useKeyboardControls();
  const phase = useGameStore((state) => state.phase);
  const colliders = usePhysicsStore((state) => state.colliders);
  
  // Physics scratchpad objects to avoid GC
  const velocity = useRef(new Vector3());
  const direction = useRef(new Vector3());
  const playerBox = useRef(new Box3());
  const nextPos = useRef(new Vector3());

  useEffect(() => {
    // Spawn in the middle of the room (z=0) instead of z=5 to avoid wall collision
    camera.position.set(0, 1.7, 0);
  }, [camera]);

  useFrame((state, delta) => {
    if (phase !== 'PLAYING') return;

    // 1. Input
    const { forward, backward, left, right } = get();

    direction.current.set(0, 0, 0);
    if (forward) direction.current.z -= 1;
    if (backward) direction.current.z += 1;
    if (left) direction.current.x -= 1;
    if (right) direction.current.x += 1;
    direction.current.normalize();

    if (forward || backward || left || right) {
      // Calculate intended velocity
      velocity.current.copy(direction.current);
      velocity.current.applyQuaternion(camera.quaternion);
      velocity.current.y = 0;
      velocity.current.normalize().multiplyScalar(SPEED * delta);

      // 2. Collision Detection (AABB)
      nextPos.current.copy(camera.position).add(velocity.current);
      
      // Define player bounds at next position (Simple box for now)
      playerBox.current.setFromCenterAndSize(
        nextPos.current, 
        new Vector3(PLAYER_RADIUS * 2, PLAYER_HEIGHT, PLAYER_RADIUS * 2)
      );

      let collided = false;
      
      // Check against all static colliders
      // Optimization: In a real app, use an Octree here.
      const worldBox = new Box3();
      for (const object of colliders) {
        // We assume colliders are Meshes with geometry
        const mesh = object as Mesh;
        if (!mesh.geometry) continue;

        if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
        
        // Transform local box to world
        worldBox.copy(mesh.geometry.boundingBox!).applyMatrix4(mesh.matrixWorld);
        
        if (playerBox.current.intersectsBox(worldBox)) {
          collided = true;
          // Very basic sliding: just don't move. 
          // Phase 2 Upgrade: Project velocity vector along wall plane.
          break;
        }
      }

      if (!collided) {
        camera.position.copy(nextPos.current);
      }
    }
  });

  return (
    <>
      <PointerLockControls selector="#game-root" />
      <Torch />
    </>
  );
};