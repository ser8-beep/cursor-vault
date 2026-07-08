import { ASSETS, type AssetKey, isArtDirectedAsset } from "@/lib/assets";

type FigmaPictureProps = {
  asset: AssetKey;
  alt?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** When true, img fills a relative parent (absolute inset-0 object-cover). */
  fill?: boolean;
  width?: number;
  height?: number;
  "data-name"?: string;
  "data-node-id"?: string;
};

/**
 * Art-directed responsive image — serves breakpoint-specific AVIF/WebP via <picture>.
 * Falls back to the registry master src in the final <img>.
 */
export function FigmaPicture({
  asset,
  alt = "",
  className,
  imgClassName,
  priority,
  fill,
  width,
  height,
  ...dataAttrs
}: FigmaPictureProps) {
  const definition = ASSETS[asset];

  if (!isArtDirectedAsset(definition)) {
    throw new Error(`Asset "${asset}" is not art-directed. Use FigmaImage instead.`);
  }

  const { src, sources, width: regWidth, height: regHeight } = definition;
  const imgWidth = width ?? regWidth;
  const imgHeight = height ?? regHeight;

  const fillClass = fill ? "absolute inset-0 size-full object-cover" : "";
  const imgClasses = [fillClass, imgClassName].filter(Boolean).join(" ");

  return (
    <picture className={className}>
      <source media="(min-width: 1280px)" srcSet={sources.desktop.avif} type="image/avif" />
      <source media="(min-width: 1280px)" srcSet={sources.desktop.webp} type="image/webp" />
      <source media="(min-width: 768px)" srcSet={sources.tablet.avif} type="image/avif" />
      <source media="(min-width: 768px)" srcSet={sources.tablet.webp} type="image/webp" />
      <source srcSet={sources.mobile.avif} type="image/avif" />
      <source srcSet={sources.mobile.webp} type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={fill ? undefined : imgWidth}
        height={fill ? undefined : imgHeight}
        className={imgClasses || undefined}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        {...dataAttrs}
      />
    </picture>
  );
}
