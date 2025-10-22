"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { type ComponentProps, type RefObject, useMemo } from "react";
import { useHeroSectionLoaded } from "./LazyLoader";

import dynamic from "next/dynamic";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Link from "next/link";

const PostTitle = dynamic(() => import("./PostTitle"), {
  ssr: true,
});

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
  const heroLoaded = useHeroSectionLoaded();
  const isMobile = useIsMobile();
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0,
    rootMargin: "-100px 0px -100px 0px",
  });

  if (!video && !image) {
    throw new Error("Either image or video must be provided");
  }

  const media = useMemo(() => {
    if (!heroLoaded) {
      return null;
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
          className="h-full w-full object-cover"
        />
      );
    }
    if (video) {
      return (
        <video
          src={video}
          autoPlay={false}
          loop
          muted
          playsInline
          preload="none"
          aria-label={`Video demonstration: ${title}`}
          className="h-full w-full object-cover"
        >
          <track kind="captions" />
        </video>
      );
    }
    return null;
  }, [video, image, title, heroLoaded]);

  return (
    <Link className="mx-auto block w-full max-w-2xl" href={link}>
      <div
        ref={ref as RefObject<HTMLDivElement>}
        className={cn("group w-full space-y-2 rounded-lg p-3 perspective-midrange", className)}
      >
        <div
          className={cn(
            "aspect-[4/3] scale-90 overflow-hidden rounded-2xl transition-all duration-300 ease-out perspective-near transform-3d group-hover:scale-100 group-hover:rotate-x-0 group-hover:rotate-y-0 group-hover:rotate-z-0",
            flip ? "rotate-x-3 rotate-y-3 rotate-z-2" : "-rotate-x-3 -rotate-y-3 -rotate-z-2",
            isIntersecting && isMobile && "scale-100 rotate-x-0 rotate-y-0 rotate-z-0",
          )}
        >
          <div
            className={cn(
              "h-full w-full scale-130 object-cover transition-all duration-300 ease-out transform-3d group-hover:scale-100 group-hover:rotate-x-0 group-hover:rotate-y-0 group-hover:rotate-z-0",
              flip ? "-rotate-x-3 -rotate-y-3 -rotate-z-6" : "rotate-x-3 rotate-y-3 rotate-z-6",
              isIntersecting && isMobile && "scale-100 rotate-x-0 rotate-y-0 rotate-z-0",
            )}
          >
            {media}
          </div>
        </div>
        <p className="text-center text-base font-medium text-amber-400 sm:text-lg lg:text-left">{description}</p>
        <PostTitle className="justify-center text-xl sm:text-2xl lg:justify-start">{title}</PostTitle>
      </div>
    </Link>
  );
}
