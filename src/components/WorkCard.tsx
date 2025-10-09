"use client";
import { cn } from "@/lib/utils";
import { a, useTrail } from "@react-spring/web";
// import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { type ComponentProps, type ReactNode, useCallback, useEffect, useMemo, useState } from "react";

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
  const [isHovering, setIsHovering] = useState(false);

  const characters = title.split("");

  const [trail, api] = useTrail(
    Math.ceil(characters.length / 2),
    () => ({
      config: { clamp: true, tension: 5000, friction: 150, mass: 1, precision: 2 },
      // config: { clamp: true, tension: 2000, friction: 90, mass: 1 },
      // config: { clamp: true, tension: 3000, friction: 90, mass: 2 },
      // y: isHovering ? 48 : -72,
      y: -72,
    }),
    [],
  );
  const [trail2, _api2] = useTrail(
    characters.length,
    () => ({
      config: { clamp: true, tension: 5000, friction: 120, mass: 1, precision: 2 },
      // config: { clamp: true, tension: 2000, friction: 90, mass: 1 },
      // config: { clamp: true, tension: 3000, friction: 90, mass: 2 },
      x: isHovering ? 32 : 0,
      y: 48,
    }),
    [isHovering],
  );

  const newTrail = useMemo(() => {
    const _trailCopy = [...trail];
    return [...trail.reverse(), ..._trailCopy];
  }, [trail]);

  // useEffect(() => {
  //   if (isHovering) {
  //     api.start({
  //       from: { y: -72 },
  //       to: { y: 48 },
  //     });
  //   } else {
  //     api.stop();
  //   }
  // }, [isHovering, api]);

  const animate = useCallback(() => {
    api.start({
      from: { y: -72 },
      to: { y: 48 },
    });
  }, [api]);

  if (!video && !image) {
    throw new Error("Either image or video must be provided");
  }

  useEffect(() => {
    setTimeout(() => {
      animate();
    }, 3_000);
  }, [animate]);

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
      onMouseEnter={() => {
        // animate();
        setIsHovering(true);
      }}
      onMouseLeave={() => setIsHovering(false)}
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
      <p className="text-lg font-medium text-amber-400">{description}</p>
      <h4 className="flex h-6 items-center overflow-hidden text-2xl leading-[1] font-bold">
        {/* <ArrowRightIcon className="-translate-x-6 stroke-3 transition-all duration-100 ease-out group-hover:translate-x-0" /> */}
        {newTrail.map((style, index) => {
          let character: string | ReactNode = characters[index];
          if (character === " ") {
            character = <>&nbsp;</>;
          }
          return (
            <a.div key={index} className="flex flex-col" style={{ ...style, ...trail2[index] }}>
              <span>{character}</span>
              <span>{character}</span>
              <span>{character}</span>
              <span>{character}</span>
              <span>{character}</span>
            </a.div>
          );
        })}
      </h4>
    </div>
  );
}
