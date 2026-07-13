"use client";

import { Suspense, useCallback, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {
  CAMERA,
  CAMERA_LOOK_AT,
  MODEL_A_URL,
  MODEL_B_URL,
  MODEL_TARGET_HEIGHT,
  Z_INDEX,
} from "./constants";
import { SceneLights } from "./SceneLights";
import { SculptureModel } from "./SculptureModel";
import {
  ScrollAnimationController,
  type SculpturePhase,
} from "./ScrollAnimationController";

useGLTF.preload(MODEL_A_URL);
useGLTF.preload(MODEL_B_URL);

const FLOOR_Y = MODEL_TARGET_HEIGHT / 2;

type HeroSceneInnerProps = {
  heroRef: React.RefObject<HTMLElement | null>;
  morphStartRef: React.RefObject<HTMLElement | null>;
  dockTargetRef: React.RefObject<HTMLElement | null>;
  notesSectionRef: React.RefObject<HTMLElement | null>;
  viewportRef: React.RefObject<HTMLDivElement | null>;
  onPhaseChange: (phase: SculpturePhase) => void;
  enabled: boolean;
};

function HeroSceneInner({
  heroRef,
  morphStartRef,
  dockTargetRef,
  notesSectionRef,
  viewportRef,
  onPhaseChange,
  enabled,
}: HeroSceneInnerProps) {
  const modelARef = useRef<THREE.Group>(null);
  const modelBRef = useRef<THREE.Group>(null);

  return (
    <>
      <SceneLights />
      <SculptureModel
        url={MODEL_A_URL}
        groupRef={modelARef}
        initialOpacity={1}
      />
      <SculptureModel
        url={MODEL_B_URL}
        groupRef={modelBRef}
        initialOpacity={0}
      />
      <ScrollAnimationController
        modelARef={modelARef}
        modelBRef={modelBRef}
        heroRef={heroRef}
        morphStartRef={morphStartRef}
        dockTargetRef={dockTargetRef}
        notesSectionRef={notesSectionRef}
        viewportRef={viewportRef}
        onPhaseChange={onPhaseChange}
        enabled={enabled}
      />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -FLOOR_Y, 0]}
        receiveShadow
      >
        <planeGeometry args={[8, 8]} />
        <shadowMaterial opacity={0.18} />
      </mesh>
    </>
  );
}

export type HeroSceneProps = {
  /** Disable 3D / ScrollTrigger (e.g. prefers-reduced-motion). */
  enabled?: boolean;
  /** Hero fold — pre-morph travel anchor. */
  heroRef: React.RefObject<HTMLElement | null>;
  /** Sentinel after case studies — morph scrub begins when this enters view. */
  morphStartRef: React.RefObject<HTMLElement | null>;
  /** Bottom-center dock marker inside #data-stories. */
  dockTargetRef: React.RefObject<HTMLElement | null>;
  /** Notes / data-stories section root. */
  notesSectionRef: React.RefObject<HTMLElement | null>;
  className?: string;
};

/**
 * Fixed-viewport R3F canvas for page-scroll sculpture morph.
 * geometry phase: z-20 (behind carousel z-40)
 * globe phase: z-50 (above notes z-30)
 */
export function HeroScene({
  enabled = true,
  heroRef,
  morphStartRef,
  dockTargetRef,
  notesSectionRef,
  className,
}: HeroSceneProps) {
  const [phase, setPhase] = useState<SculpturePhase>("geometry");
  const viewportRef = useRef<HTMLDivElement>(null);
  const handlePhaseChange = useCallback((next: SculpturePhase) => {
    setPhase(next);
  }, []);

  const zIndex =
    phase === "globe" ? Z_INDEX.sculptureFront : Z_INDEX.sculptureBehind;

  if (!enabled) return null;

  return (
    <div
      className={className}
      aria-hidden="true"
      data-name="sculpture-canvas-layer"
      data-sculpture-phase={phase}
      style={{ zIndex }}
    >
      <div
        ref={viewportRef}
        className="pointer-events-none fixed inset-0 h-[100svh] w-full"
        data-name="sculpture-viewport"
      >
        <Canvas
          shadows
          dpr={[1, 1.75]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{
            position: [...CAMERA.position],
            fov: CAMERA.fov,
            near: CAMERA.near,
            far: CAMERA.far,
          }}
          style={{ background: "transparent" }}
          onCreated={({ gl, camera }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1;
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
            camera.lookAt(...CAMERA_LOOK_AT);
            camera.updateProjectionMatrix();
          }}
        >
          <Suspense fallback={null}>
            <HeroSceneInner
              heroRef={heroRef}
              morphStartRef={morphStartRef}
              dockTargetRef={dockTargetRef}
              notesSectionRef={notesSectionRef}
              viewportRef={viewportRef}
              onPhaseChange={handlePhaseChange}
              enabled={enabled}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
