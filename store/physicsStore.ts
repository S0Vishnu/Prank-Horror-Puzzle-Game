import { create } from 'zustand';
import { Box3, Object3D } from 'three';

interface PhysicsState {
  colliders: Object3D[];
  registerCollider: (object: Object3D) => void;
  unregisterCollider: (object: Object3D) => void;
}

export const usePhysicsStore = create<PhysicsState>((set) => ({
  colliders: [],
  registerCollider: (object) => 
    set((state) => ({ colliders: [...state.colliders, object] })),
  unregisterCollider: (object) => 
    set((state) => ({ colliders: state.colliders.filter((c) => c !== object) })),
}));
