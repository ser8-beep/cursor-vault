"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ASSETS } from "./constants";

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
        <Image
          src={ASSETS.cursor}
          alt=""
          width={14}
          height={15}
          unoptimized
          className="-rotate-[144deg] -scale-y-100"
        />
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
