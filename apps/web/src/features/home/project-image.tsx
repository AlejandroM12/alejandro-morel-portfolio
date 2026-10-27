import Image from "next/image";
import { cn } from "@/lib/cn";

type ProjectImageProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

export function ProjectImage({
  src,
  alt = "",
  width = 1600,
  height = 1000,
  className,
}: ProjectImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
