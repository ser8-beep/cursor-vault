"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { DOCK, HERO, MICRO, MODEL_TARGET_HEIGHT, PHASE, PRE_MORPH, REVEAL } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export type SculpturePhase = "geometry" | "globe";

type ScrollAnimationControllerProps = {
  modelARef: React.RefObject<THREE.Group | null>;
  modelBRef: React.RefObject<THREE.Group | null>;
  /** Hero fold — pre-morph travel begins here. */
  heroRef: React.RefObject<HTMLElement | null>;
  /** Sentinel after case studies — morph scrub begins here. */
  morphStartRef: React.RefObject<HTMLElement | null>;
  /** Bottom-center dock marker inside #data-stories. */
  dockTargetRef: React.RefObject<HTMLElement | null>;
  /** Notes section — dock follow while in view. */
  notesSectionRef: React.RefObject<HTMLElement | null>;
  /** Fixed viewport wrapper — clip-path applied when docked. */
  viewportRef?: React.RefObject<HTMLElement | null>;
  onPhaseChange?: (phase: SculpturePhase) => void;
  enabled?: boolean;
};

type AnimState = {
  rotY: number;
  scale: number;
  posY: number;
  posZ: number;
  opacityA: number;
  opacityB: number;
  morphProgress: number;
};

function setMaterialsOpacity(
  group: THREE.Group | null,
  opacity: number,
  depthWrite: boolean,
) {
  if (!group) return;
  const materials = (group.userData as { materials?: THREE.Material[] })
    .materials;
  if (!materials?.length) {
    group.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const list = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      list.forEach((mat) => {
        mat.transparent = true;
        mat.opacity = opacity;
        mat.depthWrite = depthWrite;
        mat.needsUpdate = true;
      });
    });
    return;
  }
  materials.forEach((mat) => {
    mat.transparent = true;
    mat.opacity = opacity;
    mat.depthWrite = depthWrite;
    mat.needsUpdate = true;
  });
}

/** Map a screen pixel to world-space Y at a given model Z depth. */
function screenYToWorldY(
  camera: THREE.PerspectiveCamera,
  screenY: number,
  worldZ: number,
): number {
  const ndcY = -(screenY / window.innerHeight) * 2 + 1;
  const vec = new THREE.Vector3(0, ndcY, 0.5);
  vec.unproject(camera);
  const dir = vec.sub(camera.position).normalize();
  const dist = (worldZ - camera.position.z) / dir.z;
  return camera.position.y + dir.y * dist;
}

/** Viewport-bottom dock — centered X, base on the bottom edge. */
function getViewportBottomDock(): { x: number; y: number } {
  return {
    x: window.innerWidth / 2 + DOCK.screenOffsetX,
    y: window.innerHeight + DOCK.screenOffsetY,
  };
}

/** Map a screen pixel to world-space X at a given model Z depth. */
function screenXToWorldX(
  camera: THREE.PerspectiveCamera,
  screenX: number,
  worldZ: number,
): number {
  const ndcX = (screenX / window.innerWidth) * 2 - 1;
  const vec = new THREE.Vector3(ndcX, 0, 0.5);
  vec.unproject(camera);
  const dir = vec.sub(camera.position).normalize();
  const dist = (worldZ - camera.position.z) / dir.z;
  return camera.position.x + dir.x * dist;
}

/**
 * GSAP ScrollTrigger scrub — pre-morph travel (hero → carousel) then morph (bridge → dock).
 * Mutates Three.js refs directly; camera stays fixed.
 */
export function ScrollAnimationController({
  modelARef,
  modelBRef,
  heroRef,
  morphStartRef,
  dockTargetRef,
  notesSectionRef,
  viewportRef,
  onPhaseChange,
  enabled = true,
}: ScrollAnimationControllerProps) {
  const { camera } = useThree();
  const state = useRef<AnimState>({
    rotY: 0,
    scale: HERO.scale,
    posY: HERO.posY,
    posZ: 0,
    opacityA: 1,
    opacityB: 0,
    morphProgress: 0,
  });
  const phaseRef = useRef<SculpturePhase>("geometry");

  useLayoutEffect(() => {
    if (!enabled) return;

    const hero = heroRef.current;
    const morphStart = morphStartRef.current;
    const dockTarget = dockTargetRef.current;
    const notesSection = notesSectionRef.current;
    if (!hero || !morphStart || !dockTarget) return;

    const morphEndEl = notesSection ?? dockTarget;

    const s = state.current;
    const ctx = gsap.context(() => {
      // Pre-morph: geometry travels down behind carousel (hero → morph bridge).
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        endTrigger: morphStart,
        end: "top bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (s.morphProgress <= 0.001) {
            s.posY = gsap.utils.interpolate(
              HERO.posY,
              PRE_MORPH.posY,
              self.progress,
            );
          }
        },
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: morphStart,
          start: "top bottom",
          endTrigger: morphEndEl,
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            s.morphProgress = self.progress;
            const nextPhase: SculpturePhase =
              self.progress >= PHASE.morphEnd ? "globe" : "geometry";
            if (nextPhase !== phaseRef.current) {
              phaseRef.current = nextPhase;
              onPhaseChange?.(nextPhase);
            }
          },
        },
      });

      // Phase 1 — geometry rotates 0 → 180° (0–45%)
      tl.to(
        s,
        {
          rotY: Math.PI,
          duration: PHASE.rotateEnd,
        },
        0,
      );

      // Phase 2 — crossfade geometry → globe at 180° (45–55%)
      const morphDur = PHASE.morphEnd - PHASE.rotateEnd;
      tl.to(
        s,
        {
          opacityA: 0,
          opacityB: 1,
          duration: morphDur,
        },
        PHASE.rotateEnd,
      );

      // Phase 3 — globe 180 → 360°, scale up, move toward camera (55–100%)
      // posY dock handled in useFrame (viewport bottom + half-height offset).
      const revealDur = 1 - PHASE.morphEnd;
      tl.to(
        s,
        {
          rotY: Math.PI * 2,
          scale: REVEAL.scale,
          posZ: REVEAL.posZ,
          duration: revealDur,
        },
        PHASE.morphEnd,
      );
    }, morphStart);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [
    enabled,
    heroRef,
    morphStartRef,
    dockTargetRef,
    notesSectionRef,
    viewportRef,
    onPhaseChange,
  ]);

  useFrame(({ clock }) => {
    const a = modelARef.current;
    const b = modelBRef.current;
    if (!a && !b) return;

    const s = state.current;
    const t = clock.elapsedTime;
    const microX = enabled ? Math.sin(t * MICRO.freqX) * MICRO.rotX : 0;
    const microZ = enabled ? Math.sin(t * MICRO.freqZ) * MICRO.rotZ : 0;
    const overlapping = s.opacityA > 0.02 && s.opacityB > 0.02;

    let posY = s.posY;
    let posX = 0;

    const cam = camera as THREE.PerspectiveCamera;
    const halfH =
      ((b ?? a)?.userData.modelHalfHeight as number | undefined) ??
      MODEL_TARGET_HEIGHT / 2;

    // Phase 3+: dock sculpture base to the viewport bottom (all breakpoints).
    if (enabled && s.morphProgress >= PHASE.morphEnd) {
      const revealT =
        (s.morphProgress - PHASE.morphEnd) / (1 - PHASE.morphEnd);
      const t = Math.min(1, revealT);

      const { x: targetScreenX, y: targetScreenY } = getViewportBottomDock();
      const dockWorldY =
        screenYToWorldY(cam, targetScreenY, s.posZ) + DOCK.worldOffsetY;
      const dockWorldX = screenXToWorldX(cam, targetScreenX, s.posZ);
      // Pivot is bbox center — lift by half-height so the base sits on the bottom edge.
      const bottomAlignedY = dockWorldY + s.scale * halfH;

      posY = gsap.utils.interpolate(PRE_MORPH.posY, bottomAlignedY, t);
      posX = gsap.utils.interpolate(0, dockWorldX, t);
    }

    if (a) {
      a.rotation.set(microX, s.rotY, microZ);
      a.scale.setScalar(s.scale);
      a.position.set(posX, posY, s.posZ);
      a.visible = s.opacityA > 0.001;
      setMaterialsOpacity(a, s.opacityA, !overlapping && s.opacityA >= 0.99);
    }

    if (b) {
      b.rotation.set(microX, s.rotY, microZ);
      b.scale.setScalar(s.scale);
      b.position.set(posX, posY, s.posZ);
      b.visible = s.opacityB > 0.001;
      setMaterialsOpacity(b, s.opacityB, !overlapping && s.opacityB >= 0.99);
    }

    // Clear any leftover mid-viewport clip from earlier dock iterations.
    const viewport = viewportRef?.current;
    if (viewport) {
      viewport.style.clipPath = "none";
      viewport.style.webkitClipPath = "none";
    }
  });

  return null;
}
