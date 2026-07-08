"use client";

import { motion, useReducedMotion } from "framer-motion";

export function GhostCursor({ visible }: { visible: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href="#experiments"
      className="fixed left-[clamp(1.25rem,8vw,8rem)] z-40 flex flex-col items-end gap-2"
      style={{ top: "calc(50% - 10px)" }}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        x: visible ? 0 : -20,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flex size-5 items-center justify-center"
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <svg
          viewBox="0 0 14 15"
          className="h-[14.788px] w-[13.849px] -rotate-[144deg] -scale-y-100"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1L1 12.5L5.2 9.1L7.5 13.5L9.5 12.5L7.2 8.1L12.5 7.5L1 1Z"
            fill="#09090b"
            stroke="#fafafa"
            strokeWidth="1.2"
          />
        </svg>
      </motion.div>
      <div className="pr-8">
        <div className="max-w-[300px] rounded-bl-[24px] rounded-br-[24px] rounded-tl-[24px] border-[3px] border-[#1d4ed8] bg-[#1d4ed8] px-4 py-3 shadow-[0px_4px_12px_rgba(0,51,218,0.3)] backdrop-blur-[2px]">
          <p className="font-mono text-[8px] uppercase tracking-[0.56px] text-[#fafafa]">
            Scroll to see my OOO experiments
          </p>
        </div>
      </div>
    </motion.a>
  );
}
