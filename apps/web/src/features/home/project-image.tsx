import Image from "next/image";
import { cn } from "@/lib/cn";

type ProjectImageProps = {
  src: string;
  alt?: string;
  className?: string;
};

export function ProjectImage({ src, alt = "", className }: ProjectImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={1000}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
