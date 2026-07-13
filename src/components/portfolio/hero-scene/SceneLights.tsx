"use client";

import { Environment } from "@react-three/drei";

/** Constant scene lighting — never animated. */
export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.45} color="#f5f2ec" />
      <directionalLight
        castShadow
        position={[3.2, 5.5, 2.8]}
        intensity={1.35}
        color="#fff8f0"
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0002}
      />
      <directionalLight
        position={[-2.5, 1.5, -1.5]}
        intensity={0.35}
        color="#d4e0f0"
      />
      <Environment preset="studio" environmentIntensity={0.55} />
    </>
  );
}
