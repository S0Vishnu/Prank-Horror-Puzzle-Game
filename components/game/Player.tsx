import React, { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls, useKeyboardControls, Text } from '@react-three/drei';
import { Vector3, Box3, Raycaster, Mesh, Intersection, Vector2 } from 'three';
import { Torch } from './Torch';
import { useGameStore } from '../../store/gameStore';
import { usePhysicsStore } from '../../store/physicsStore';

const WALK_SPEED = 5;
const GRAVITY = 15;
const JUMP_FORCE = 6; // Not requested but useful for testing
const PLAYER_RADIUS = 0.4;
const PLAYER_HEIGHT = 1.7; // Eye height
const GROUND_CHECK_OFFSET = 0.1; // How far to check below feet

export const Player: React.FC = () => {
  const { camera, scene } = useThree();
  const [sub, get] = useKeyboardControls();
  const phase = useGameStore((state) => state.phase);
  const levelVersion = useGameStore((state) => state.levelVersion);
  const colliders = usePhysicsStore((state) => state.colliders);
  
  // Interaction State
  const [interactLabel, setInteractLabel] = useState<string | null>(null);
  
  // Physics Refs
  const velocity = useRef(new Vector3(0, 0, 0));
  const isGrounded = useRef(false);
  const raycaster = useRef(new Raycaster());
  const interactionRaycaster = useRef(new Raycaster());
  const lastLevelVersion = useRef(levelVersion);

  // Constants vectors to avoid GC
  const direction = useRef(new Vector3());
  const forward = useRef(new Vector3());
  const right = useRef(new Vector3());
  const worldUp = useRef(new Vector3(0, 1, 0));
  const playerBox = useRef(new Box3());
  const centerScreen = useRef(new Vector2(0, 0));

  // Reset Player on Level Change
  useEffect(() => {
    if (levelVersion !== lastLevelVersion.current) {
      camera.position.set(0, 1.7, 0);
      velocity.current.set(0, 0, 0);
      lastLevelVersion.current = levelVersion;
    }
  }, [levelVersion, camera]);

  useFrame((state, delta) => {
    if (phase !== 'PLAYING') return;

    // --- 1. MOVEMENT INPUT ---
    const { forward: fwd, backward, left: lft, right: rgt, jump, interact } = get();

    // Get camera directions (ignore Y for movement)
    camera.getWorldDirection(forward.current);
    forward.current.y = 0;
    forward.current.normalize();
    right.current.crossVectors(forward.current, worldUp.current).normalize();

    direction.current.set(0, 0, 0);
    if (fwd) direction.current.add(forward.current);
    if (backward) direction.current.sub(forward.current);
    if (lft) direction.current.sub(right.current);
    if (rgt) direction.current.add(right.current);
    
    if (direction.current.lengthSq() > 0) {
      direction.current.normalize();
    }

    // Apply movement speed
    const moveSpeed = WALK_SPEED;
    velocity.current.x = direction.current.x * moveSpeed;
    velocity.current.z = direction.current.z * moveSpeed;

    // --- 2. GRAVITY & JUMP ---
    velocity.current.y -= GRAVITY * delta;
    
    if (isGrounded.current && jump) {
      velocity.current.y = JUMP_FORCE;
      isGrounded.current = false;
    }

    // --- 3. PHYSICS & COLLISION ---
    
    // A. Horizontal Movement (Wall Collision)
    const nextPos = camera.position.clone();
    // Apply X
    nextPos.x += velocity.current.x * delta;
    if (checkCollision(nextPos)) {
      nextPos.x = camera.position.x; // Cancel X move
    }
    // Apply Z
    nextPos.z += velocity.current.z * delta;
    if (checkCollision(nextPos)) {
      nextPos.z = camera.position.z; // Cancel Z move
    }
    
    // Apply Horizontal Result
    camera.position.x = nextPos.x;
    camera.position.z = nextPos.z;

    // B. Vertical Movement (Ground/Ceiling/Stair Collision)
    // Apply Gravity Step
    camera.position.y += velocity.current.y * delta;

    // Ground Check Raycast (Simulates feet)
    // Ray starts at center of player and goes DOWN
    // Player origin is camera (eye) -> so feet are at camera.y - PLAYER_HEIGHT
    // However, for raycasting stability, we cast from center down.
    raycaster.current.set(camera.position, new Vector3(0, -1, 0));
    
    // Filter colliders that are meshes
    const meshColliders = colliders.filter(c => c instanceof Mesh) as Mesh[];
    const intersects = raycaster.current.intersectObjects(meshColliders, false);

    isGrounded.current = false;
    
    if (intersects.length > 0) {
      // Find closest hit
      const hit = intersects[0];
      const distanceToGround = hit.distance;
      
      // "Stair/Ramp" Logic:
      // If we are close to ground, snap to it.
      // Eye height is PLAYER_HEIGHT. So distanceToGround should be PLAYER_HEIGHT.
      // We allow a small epsilon for slopes (ramps).
      // Max step up height is implicit by how fast we can move up a slope.
      
      if (distanceToGround < PLAYER_HEIGHT + GROUND_CHECK_OFFSET && velocity.current.y <= 0) {
        // We hit ground
        isGrounded.current = true;
        velocity.current.y = 0;
        // Snap eye position to: Hit Point + Eye Height
        camera.position.y = hit.point.y + PLAYER_HEIGHT;
      }
    }
    
    // Hard floor just in case (reset if falling into void)
    if (camera.position.y < -20) {
       useGameStore.getState().resetLevel();
    }

    // --- 4. INTERACTION ---
    interactionRaycaster.current.setFromCamera(centerScreen.current, camera);
    const interactables = meshColliders.filter(c => c.userData?.interactable);
    const hitInteract = interactionRaycaster.current.intersectObjects(interactables, false);
    
    if (hitInteract.length > 0 && hitInteract[0].distance < 3) {
      const target = hitInteract[0].object;
      setInteractLabel(target.userData.label || "Interact");
      
      // Check for Input
      if (interact) {
        // Debounce or consume input? 
        // For now rely on the fact that 'get().interact' is true this frame.
        // We call the handler attached to userData.
        if (target.userData.onInteract && typeof target.userData.onInteract === 'function') {
           target.userData.onInteract();
        }
      }
    } else {
      setInteractLabel(null);
    }

  });

  const checkCollision = (pos: Vector3) => {
    // Defines a box around the player
    // Note: Since we handle Y via raycast, this box is mostly for X/Z
    // But we give it height to catch walls.
    const min = new Vector3(pos.x - PLAYER_RADIUS, pos.y - PLAYER_HEIGHT + 0.5, pos.z - PLAYER_RADIUS);
    const max = new Vector3(pos.x + PLAYER_RADIUS, pos.y + 0.5, pos.z + PLAYER_RADIUS);
    playerBox.current.set(min, max);

    const worldBox = new Box3();
    for (const object of colliders) {
       if (object instanceof Mesh && object.geometry) {
         if (!object.geometry.boundingBox) object.geometry.computeBoundingBox();
         worldBox.copy(object.geometry.boundingBox!).applyMatrix4(object.matrixWorld);
         
         // Ignore ground if checking wall collision? 
         // For simple AABB, floors are flat boxes. If we are standing ON it, we intersect it?
         // Yes, so we need to shrink the player collision box Y slightly so feet don't trigger "Wall" collision with floor.
         // That's why min Y is `pos.y - PLAYER_HEIGHT + 0.5` (raised feet).
         
         if (playerBox.current.intersectsBox(worldBox)) {
           // Check if it's a pass-through trigger?
           if (object.userData.isTrigger) continue;
           return true;
         }
       }
    }
    return false;
  };

  return (
    <>
      <PointerLockControls selector="#game-root" />
      <Torch />
      
      {/* Interaction HUD */}
      {interactLabel && (
        <group position={[0, 0, -2]}>
             <Text 
                position={[0, 0, 0]} 
                fontSize={0.1} 
                color="white" 
                anchorX="center" 
                anchorY="middle"
                outlineWidth={0.01}
                outlineColor="black"
             >
                [E] {interactLabel}
             </Text>
        </group>
      )}
    </>
  );
};