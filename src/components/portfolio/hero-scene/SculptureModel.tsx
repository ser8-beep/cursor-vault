"use client";

import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { MODEL_TARGET_HEIGHT } from "./constants";

type SculptureModelProps = {
  url: string;
  groupRef: React.RefObject<THREE.Group | null>;
  /** Initial opacity (Model A = 1, Model B = 0). */
  initialOpacity?: number;
};

/**
 * Loads a GLB, normalizes bounding box to a shared height, and clones materials
 * so opacity can be scrubbed without mutating the cached GLTF.
 */
export function SculptureModel({
  url,
  groupRef,
  initialOpacity = 1,
}: SculptureModelProps) {
  const { scene } = useGLTF(url);
  const materialsRef = useRef<THREE.Material[]>([]);

  useLayoutEffect(() => {
    const wrapper = groupRef.current;
    if (!wrapper) return;

    const clone = scene.clone(true);
    const materials: THREE.Material[] = [];

    clone.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const src = mesh.material;
      const list = Array.isArray(src) ? src : [src];
      const cloned = list.map((mat) => {
        const m = mat.clone();
        m.transparent = true;
        m.opacity = initialOpacity;
        m.depthWrite = initialOpacity >= 1;
        m.needsUpdate = true;
        materials.push(m);
        return m;
      });
      mesh.material = cloned.length === 1 ? cloned[0]! : cloned;
    });

    // Normalize to shared height + center pivot so A/B share world space.
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const height = size.y || 1;
    const s = MODEL_TARGET_HEIGHT / height;
    clone.scale.setScalar(s);
    clone.position.set(-center.x * s, -center.y * s, -center.z * s);

    while (wrapper.children.length) {
      const child = wrapper.children[0]!;
      wrapper.remove(child);
    }
    wrapper.add(clone);
    materialsRef.current = materials;
    (wrapper.userData as { materials?: THREE.Material[]; modelHalfHeight?: number }).materials =
      materials;
    (wrapper.userData as { modelHalfHeight?: number }).modelHalfHeight =
      MODEL_TARGET_HEIGHT / 2;

    return () => {
      materials.forEach((m) => m.dispose());
      materialsRef.current = [];
      if (wrapper.userData) {
        delete (wrapper.userData as { materials?: THREE.Material[] }).materials;
      }
    };
  }, [scene, initialOpacity, groupRef]);

  return <group ref={groupRef} />;
}
