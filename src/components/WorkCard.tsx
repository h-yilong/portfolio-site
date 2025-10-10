"use client";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { type ComponentProps, useMemo } from "react";
import { useHeroSectionLoaded } from "./LazyLoader";

export default function WorkCard({
  title,
  description,
  image,
  video,
  // link,
  className,
  flip = false,
}: {
  title: string;
  description: string;
  image?: ComponentProps<typeof Image>["src"];
  video?: string;
  // link: string;
  className?: string;
  flip?: boolean;
}) {
  const heroLoaded = useHeroSectionLoaded();

  if (!video && !image) {
    throw new Error("Either image or video must be provided");
  }

  const media = useMemo(() => {
    if (!heroLoaded) {
      return null;
    }
    if (video) {
      return (
        <video
          src={video}
          autoPlay // todo: autoplay when in viewport
          loop
          muted
          playsInline
          preload="none"
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
          // placeholder="blur"
          width={400}
          quality={80}
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
  }, [video, image, title, flip, heroLoaded]);

  if (!heroLoaded) {
    return (
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative mx-auto w-full max-w-2xl space-y-2 rounded-lg p-3 backdrop-blur-[2px] perspective-midrange",
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
      <p className="text-lg font-medium text-amber-400">{description}</p>
      <h4 className="flex h-6 items-center overflow-hidden text-2xl leading-[1] font-bold">
        <ArrowRightIcon className="mr-2 size-6 -translate-x-3 stroke-3 opacity-0 duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
        <span className="-translate-x-8 transition-transform duration-300 ease-out group-hover:translate-x-0">
          {title}
        </span>
      </h4>
    </div>
  );
}
