"use client";
import { useTrail, a, useSprings } from "@react-spring/web";

export default function ImaginationText() {
  const trail = useTrail(2, {
    from: { opacity: 0, y: 100, x: 0, rotate: 8 },
    to: [{ opacity: 1, y: 0, x: 0, rotate: 0 }],
  });

  const [springs] = useSprings(2, (i) => ({
    from: { opacity: 0, y: -100, x: 72 },
    to: [{ opacity: 1, y: 0, x: 72 }, { x: 0 }],
    delay: i * 200,
  }));

  return (
    <section className="max-width relative mx-auto my-16 w-full">
      <h3 className="text-[10vw] font-semibold tracking-tighter *:leading-[1] xl:text-9xl">
        <div className="flex h-[10vw] overflow-hidden xl:h-32">
          <a.div style={{ ...trail[1], y: trail[1].y.to((value) => `${value}%`) }} className="overflow-hidden">
            Never
          </a.div>
          &nbsp;
          <a.div style={{ ...trail[0], y: trail[0].y.to((value) => `${value}%`) }}>Limit</a.div>
        </div>
        <div className="flex h-[10.6vw] overflow-hidden xl:h-[136px]">
          <a.div style={{ ...springs[0], y: springs[0].y.to((value) => `${value}%`) }}>Your</a.div>&nbsp;
          <a.div style={{ ...springs[1], y: springs[1].y.to((value) => `${value}%`) }}>Imagination</a.div>
        </div>
      </h3>
    </section>
  );
}
