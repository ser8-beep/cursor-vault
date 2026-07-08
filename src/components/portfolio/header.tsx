"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ASSETS, NAV_ITEMS, SVG_ASSETS } from "./constants";
import { FigmaImage } from "./figma-image";

function NavItem({
  label,
  suffix,
  href,
}: {
  label: string;
  suffix: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex min-h-[9px] items-center gap-2 text-left"
    >
      <span className="font-mono text-[8px] uppercase tracking-[0.4px] text-[#09090b] transition-colors group-hover:text-[#1d4ed8]">
        {label}
      </span>
      <span className="font-mono text-[8px] uppercase tracking-[0.4px] text-[#666]">
        {suffix}
      </span>
    </a>
  );
}

export function Header({ expanded }: { expanded: boolean }) {
  return (
    <motion.header
      className="sticky top-0 z-50 flex items-start justify-between gap-4 px-5 pt-5"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`flex w-full max-w-[470px] flex-col border border-[#a1a1aa] bg-[#f4f4f5] transition-opacity duration-500 ${
          expanded ? "opacity-100" : "border-transparent bg-transparent"
        }`}
      >
        <div
          className={`flex h-12 items-start justify-between overflow-hidden px-2.5 py-1.5 ${
            expanded ? "border-b border-[#a1a1aa]" : ""
          }`}
        >
          <a href="#" className="flex flex-col items-start uppercase">
            <span className="font-display text-base font-bold leading-none text-[#09090b]">
              SHIVANI K.
            </span>
            <span className="font-mono text-[6px] tracking-[1px] text-[#3f3f46]">
              v2026.vault
            </span>
          </a>
          <div
            className={`hidden h-full w-[204px] shrink-0 overflow-hidden rounded-[1px] mix-blend-luminosity sm:block ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="h-full w-full bg-gradient-to-r from-[#d4d4d4] via-[#a3a3a3] to-[#737373]" />
          </div>
        </div>

        <motion.div
          className="overflow-hidden"
          initial={false}
          animate={{
            height: expanded ? "auto" : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 px-2.5 pb-2.5 pt-2.5">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </nav>
        </motion.div>
      </div>

      <motion.div
        className="flex w-[314px] shrink-0 items-center justify-between border border-[#a1a1aa] p-[5px]"
        initial={false}
        animate={{
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? "auto" : "none",
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2 pb-[7px] pt-2">
          <div className="relative size-8 shrink-0">
            <Image
              src={SVG_ASSETS.workExIcon}
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <div className="font-mono text-[8px] uppercase tracking-[0.4px]">
            <p className="text-[#09090b]">PRODUCT EX: 4 YRS+</p>
            <a
              href="#"
              className="text-[#1d4ed8] underline decoration-from-font"
            >
              MY RESUME
            </a>
          </div>
        </div>
        <div className="relative h-12 w-[135px] shrink-0 overflow-hidden rounded-[1px] mix-blend-luminosity">
          <FigmaImage
            asset={ASSETS.workExGif}
            alt=""
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 h-[332px] w-[134px]">
            <FigmaImage
              asset={ASSETS.workExImage}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
