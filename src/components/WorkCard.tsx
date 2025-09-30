import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps, useMemo } from "react";

export default function WorkCard({
  title,
  description,
  image,
  video,
  link,
  className,
  flip = false,
}: {
  title: string;
  description: string;
  image?: ComponentProps<typeof Image>["src"];
  video?: string;
  link: string;
  className?: string;
  flip?: boolean;
}) {
  if (!video && !image) {
    throw new Error("Either image or video must be provided");
  }

  const media = useMemo(() => {
    if (video) {
      return (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className={cn(
            "h-full w-full translate-z-24 object-cover transition-all duration-500 ease-out group-hover:translate-z-0 group-hover:rotate-x-0 group-hover:rotate-y-0 group-hover:rotate-z-0",
            flip ? "-rotate-x-6 -rotate-y-6 -rotate-z-6" : "rotate-x-6 rotate-y-6 rotate-z-6",
          )}
        />
      );
    }
    if (image) {
      return (
        <Image
          width={400}
          height={300}
          loading="lazy"
          src={image}
          alt={title}
          className={cn(
            "h-full w-full translate-z-24 object-cover transition-all duration-500 ease-out group-hover:translate-z-0 group-hover:rotate-x-0 group-hover:rotate-y-0 group-hover:rotate-z-0",
            flip ? "-rotate-x-6 -rotate-y-6 -rotate-z-6" : "rotate-x-6 rotate-y-6 rotate-z-6",
          )}
        />
      );
    }
    return null;
  }, [video, image, title, flip]);

  return (
    <div
      className={cn(
        "group relative w-full space-y-2 rounded-lg p-3 backdrop-blur-[2px] perspective-midrange",
        className,
      )}
    >
      <div
        className={cn(
          "aspect-[4/3] scale-90 overflow-hidden rounded-2xl transition-all duration-500 ease-out perspective-near group-hover:scale-100 group-hover:rotate-x-0 group-hover:rotate-y-0 group-hover:rotate-z-0",
          flip ? "rotate-x-6 rotate-y-6 rotate-z-2" : "-rotate-x-6 -rotate-y-6 -rotate-z-2",
        )}
      >
        {media}
      </div>
      <p className="text-sm font-medium text-amber-400">{description}</p>
      <h4 className="text-2xl font-bold">{title}</h4>
      <a href={link} target="_blank" rel="noopener noreferrer">
        View
      </a>
    </div>
  );
}
