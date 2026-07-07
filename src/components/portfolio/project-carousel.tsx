"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CAROUSEL_LABEL, PROJECTS } from "./constants";

function ProjectCard({
  title,
  tags,
  image,
  index,
}: {
  title: string;
  tags: readonly string[];
  image: string;
  index: number;
}) {
  return (
    <motion.article
      className="group relative flex h-[180px] min-w-[min(78vw,320px)] shrink-0 flex-col justify-end overflow-hidden border-2 border-[rgba(135,135,135,0.4)] pt-[27px] sm:min-w-[280px] lg:min-w-0 lg:flex-1"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#f5f5f4] mix-blend-color-burn backdrop-blur-[4px]"
      />

      <div className="absolute right-0 top-0 h-[315px] w-[355px] overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          unoptimized
          className="object-cover object-bottom"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-7 pb-7">
        <h3 className="font-display text-xl font-bold uppercase text-[#3f3f46] transition-colors group-hover:text-[#09090b]">
          {title}
        </h3>
        <div className="mt-1 flex gap-3 font-mono text-xs uppercase tracking-[0.6px] text-[#52525b]">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectCarousel({ visible }: { visible: boolean }) {
  return (
    <motion.section
      id="work"
      className="px-5"
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 60,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-12 font-mono text-[10px] leading-[12px] tracking-[0.5px] text-[#666]">
        <p>
          <span className="text-[#0a0a0a]">PRODUCT_DESIGN</span>
          {" //  01_SYSTEMS_FOR_USERS"}
        </p>
        <p className="whitespace-pre">{CAROUSEL_LABEL.line2}</p>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-12 [-ms-overflow-style:none] [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            tags={project.tags}
            image={project.image}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
}
