export function BackgroundLayers() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle, #a1a1aa 1px, transparent 1px)",
          backgroundSize: "34px 33px",
        }}
      />
      <div className="pointer-events-none absolute inset-y-0 left-[clamp(0.75rem,2vw,1.25rem)] w-px bg-[#a1a1aa]/40" />
      <div className="pointer-events-none absolute inset-y-0 right-[clamp(0.5rem,1.5vw,0.75rem)] w-px bg-[#a1a1aa]/40" />
    </>
  );
}
