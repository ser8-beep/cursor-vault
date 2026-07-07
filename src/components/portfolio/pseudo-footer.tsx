"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ASSETS, CONTACT } from "./constants";

export function PseudoFooter({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="flex items-end justify-between gap-4"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex w-full max-w-[566px] items-center justify-between overflow-hidden rounded-[3px] border border-[#a1a1aa] bg-[#f4f4f5] p-3">
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="font-mono text-[8px] uppercase tracking-[0.4px] text-[#09090b] hover:text-[#1d4ed8]"
          >
            {CONTACT.phone}
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="font-mono text-[8px] uppercase tracking-[0.4px] text-[#09090b] hover:text-[#1d4ed8]"
          >
            {CONTACT.email}
          </a>
          <a
            href="#"
            className="font-mono text-[8px] uppercase tracking-[0.4px] text-[#09090b] hover:text-[#1d4ed8]"
          >
            {CONTACT.linkedin}
          </a>
        </div>
        <span className="font-mono text-[8px] uppercase leading-[8px] text-[#666]">
          LET&apos;S CONNECT
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-0.5">
        <div className="text-right font-mono text-[8px] uppercase tracking-[0.4px] text-[#09090b]">
          <p>{CONTACT.location}</p>
          <p>{CONTACT.timezone}</p>
        </div>
        <div className="relative size-8">
          <Image
            src={ASSETS.locationIcon}
            alt=""
            fill
            unoptimized
            className="object-contain"
          />
        </div>
      </div>
    </motion.div>
  );
}
