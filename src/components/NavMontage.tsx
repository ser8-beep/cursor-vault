/**
 * CSS sprite montage — 7-frame loop (135×48 per frame).
 * Source: Downloads/montage/embed-snippet.html (pixel variant).
 * Asset: public/figma/nav-media/montage-pixel-sheet.png
 */
type MontageEmbedProps = {
  className?: string;
};

export function MontageEmbed({ className }: MontageEmbedProps) {
  return (
    <div
      className={`montage-embed absolute inset-0${className ? ` ${className}` : ""}`}
      role="img"
      aria-label="Decorative montage animation"
    />
  );
}

/** Nav card montage — dimmed to match poster treatment. */
export function NavMontage() {
  return <MontageEmbed className="opacity-60" />;
}
