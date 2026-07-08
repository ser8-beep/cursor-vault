import Image, { type ImageProps } from "next/image";
import { ASSET_REGISTRY, type AssetKey, isArtDirectedAsset } from "@/lib/assets";

type FigmaImageProps = Omit<ImageProps, "src" | "width" | "height" | "sizes"> & {
  asset: AssetKey;
};

export function FigmaImage({ asset, ...props }: FigmaImageProps) {
  const definition = ASSET_REGISTRY[asset];

  if (isArtDirectedAsset(definition)) {
    throw new Error(`Asset "${asset}" is art-directed. Use FigmaPicture instead.`);
  }

  const { src, width, height, sizes } = definition;

  if (props.fill) {
    return <Image src={src} sizes={sizes} {...props} />;
  }

  return <Image src={src} width={width} height={height} sizes={sizes} {...props} />;
}
