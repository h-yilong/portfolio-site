import styles from './index.module.css';

export default function TechStack() {
  return (
    <div className="w-full relative">
      <div
        className={`w-full rounded-full relative aspect-square overflow-hidden flex justify-center items-center ${styles.techStackContainer}`}
      >
        <div className="absolute left-0 w-full aspect-square rounded-full border-2 border-white/15 top-1/2 overflow-hidden">
          <div
            className={`w-full h-full absolute -top-1/2 ${styles.techStackGradient2}`}
          />
        </div>
        <div className="absolute left-0 w-full aspect-square rounded-full border-2 border-white/15 -top-1/2 overflow-hidden">
          <div
            className={`w-full h-full absolute top-1/2 ${styles.techStackGradient1}`}
          />
        </div>
        <div
          className={`absolute left-0 w-full aspect-square rounded-full ${styles.techStackContainer}`}
        />
        <div
          className={`w-1/5 aspect-square rotate-45 relative ${styles.rotate}`}
        >
          <div
            className={`${styles.techStack} p-2 border rounded-full bg-aboutBg border-white/10 w-full h-full`}
          >
            <img src="/assets/images/js2.svg" alt="" />
          </div>
          <div
            className={`${styles.techStack} p-2 border rounded-full bg-aboutBg border-white/10 w-full h-full absolute inset-0 translate-x-[150%]`}
          >
            <img src="/assets/images/react2.svg" alt="" />
          </div>
          <div
            className={`${styles.techStack} p-2 border rounded-full bg-aboutBg border-white/10 w-full h-full absolute inset-0 -translate-x-[150%]`}
          >
            <img src="/assets/images/webpack.svg" alt="" />
          </div>
          <div
            className={`${styles.techStack} p-2 border rounded-full bg-aboutBg border-white/10 w-full h-full absolute inset-0 translate-x-3/4 translate-y-[130%]`}
          >
            <img src="/assets/images/nodejs2.svg" alt="" />
          </div>
          <div
            className={`${styles.techStack} p-2 border rounded-full bg-aboutBg border-white/10 w-full h-full absolute inset-0 translate-x-3/4 -translate-y-[130%]`}
          >
            <img src="/assets/images/redux.svg" alt="" />
          </div>
          <div
            className={`${styles.techStack} p-2 border rounded-full bg-aboutBg border-white/10 w-full h-full absolute inset-0 -translate-x-3/4 -translate-y-[130%]`}
          >
            <img src="/assets/images/tailwind2.svg" alt="" />
          </div>
          <div
            className={`${styles.techStack} p-2 border rounded-full bg-aboutBg border-white/10 w-full h-full absolute inset-0 -translate-x-3/4 translate-y-[130%]`}
          >
            <img src="/assets/images/graphql.svg" alt="" />
          </div>
        </div>
      </div>
      <article className="relative z-50">
        <h3 className="font-bold text-lg leading-8 mb-2">Tech Stack</h3>
        <p>
          I specialize in a variety of languages, frameworks, and tools that
          allow me to build robust and scalable applications
        </p>
      </article>
    </div>
  );
}
