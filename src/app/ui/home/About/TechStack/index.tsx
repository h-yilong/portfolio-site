import styles from "./index.module.css";

export default function TechStack() {
  return (
    <div className="relative w-full">
      <div
        className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-full ${styles.techStackContainer}`}
      >
        <div className="absolute left-0 top-1/2 aspect-square w-full overflow-hidden rounded-full border-2 border-white/15">
          <div className={`absolute -top-1/2 h-full w-full ${styles.techStackGradient2}`} />
        </div>
        <div className="absolute -top-1/2 left-0 aspect-square w-full overflow-hidden rounded-full border-2 border-white/15">
          <div className={`absolute top-1/2 h-full w-full ${styles.techStackGradient1}`} />
        </div>
        <div className={`absolute left-0 aspect-square w-full rounded-full ${styles.techStackContainer}`} />
        <div className={`relative aspect-square w-1/5 rotate-45 ${styles.rotate}`}>
          <div className={`${styles.techStack} h-full w-full rounded-full border border-white/10 bg-aboutBg p-2`}>
            <img src="/assets/images/js2.svg" alt="" />
          </div>
          <div
            className={`${styles.techStack} absolute inset-0 h-full w-full translate-x-[150%] rounded-full border border-white/10 bg-aboutBg p-2`}
          >
            <img src="/assets/images/react2.svg" alt="" />
          </div>
          <div
            className={`${styles.techStack} absolute inset-0 h-full w-full -translate-x-[150%] rounded-full border border-white/10 bg-aboutBg p-2`}
          >
            <img src="/assets/images/next.svg" alt="" />
          </div>
          <div
            className={`${styles.techStack} absolute inset-0 h-full w-full translate-x-3/4 translate-y-[130%] rounded-full border border-white/10 bg-aboutBg p-2`}
          >
            <img src="/assets/images/nodejs2.svg" alt="" />
          </div>
          <div
            className={`${styles.techStack} absolute inset-0 h-full w-full -translate-y-[130%] translate-x-3/4 rounded-full border border-white/10 bg-aboutBg p-2`}
          >
            <img src="/assets/images/redux.svg" alt="" />
          </div>
          <div
            className={`${styles.techStack} absolute inset-0 h-full w-full -translate-x-3/4 -translate-y-[130%] rounded-full border border-white/10 bg-aboutBg p-2`}
          >
            <img src="/assets/images/tailwind2.svg" alt="" />
          </div>
          <div
            className={`${styles.techStack} absolute inset-0 h-full w-full -translate-x-3/4 translate-y-[130%] rounded-full border border-white/10 bg-aboutBg p-2`}
          >
            <img src="/assets/images/graphql.svg" alt="" />
          </div>
        </div>
      </div>
      <article className="relative z-50">
        <h3 className="mb-2 text-lg font-bold leading-8">Tech Stack</h3>
        <p>
          I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable
          applications
        </p>
      </article>
    </div>
  );
}
