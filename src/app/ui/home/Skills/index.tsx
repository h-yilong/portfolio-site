import { clsx } from "@/app/lib/utils";
import type { CSSProperties } from "react";
import styles from "./index.module.css";

const SKILLS = [
  "/assets/images/js2.svg",
  "/assets/images/nodejs2.svg",
  "/assets/images/react2.svg",
  "/assets/images/docker2.svg",
  "/assets/images/tailwind2.svg",
  "/assets/images/graphql.svg",
  "/assets/images/figma.svg",
  "/assets/images/ant-design.svg",
  "/assets/images/redux.svg",
  "/assets/images/mui.svg",
  "/assets/images/postman.svg",
  "/assets/images/mongo.svg",
];

const MAX_WIDTH = 2560; // 4k resolution
const SKILL_WIDTH = (80 + 12) * SKILLS.length;
const REPEAT_TIMES = Math.ceil(MAX_WIDTH / SKILL_WIDTH) + 1;
const SKILL_CAROUSEL_ITEMS = Array.from({ length: REPEAT_TIMES }, () => SKILLS).flat(1);

export default function Skills() {
  return (
    <section
      style={{ "--skill-length": SKILLS.length } as CSSProperties}
      className="mt-36 w-screen overflow-hidden py-2"
    >
      <div className={clsx("flex w-fit", styles.carousel)}>
        {SKILL_CAROUSEL_ITEMS.map((skill, index) => (
          <div
            key={index}
            className="flex aspect-square flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 p-2"
          >
            <img src={skill} alt={skill} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
