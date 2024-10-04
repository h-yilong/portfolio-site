import styles from "./index.module.css";

export default function Intro() {
  return (
    <div className="relative w-full">
      <div
        style={{ boxShadow: "0px 0px 0px 1px rgba(255,255,255,0.1)" }}
        className="absolute inset-0 aspect-square w-full rounded-lg"
      />
      <div className="absolute inset-0 aspect-square w-full translate-y-2 scale-110 bg-gradient-to-t from-aboutBg from-30%" />
      <div
        className={`relative grid aspect-square w-full grid-cols-4 grid-rows-4 overflow-hidden rounded-lg ${styles.intro}`}
      >
        <span className="absolute left-4 top-4 z-50 h-3 w-3 rounded-full bg-white/10" />
        <span className="absolute left-9 top-4 z-50 h-3 w-3 rounded-full bg-white/10" />
        <span className="absolute left-14 top-4 z-50 h-3 w-3 rounded-full bg-white/10" />

        <div className="col-span-2 h-full w-full rounded-lg" />
        <div className="h-full w-full rounded-lg" />
        <div className="h-full w-full rounded-lg" />
        <div className="h-full w-full rounded-lg" />
        <div className="col-span-2 row-span-2 h-full w-full overflow-hidden rounded-lg border-2 !border-white/80">
          <img
            // src="/assets/images/avatar.webp"
            src="/assets/images/linked-in-avatar.webp"
            alt="yilong-avatar"
            className="h-full w-full"
          />
        </div>
        <div className="row-span-2 h-full w-full rounded-lg" />
        <div className="h-full w-full rounded-lg" />
        <div className="h-full w-full rounded-lg" />
        <div className="h-full w-full rounded-lg" />
        <div className="col-span-2 h-full w-full rounded-lg" />
        <div className={`absolute inset-0 h-full w-full ${styles.radialBlend} z-30`} />
      </div>
      <article className="relative z-50">
        <h3 className="mb-2 text-lg font-bold leading-8">Hi, I&apos;m Yilong HUANG</h3>
        <p>
          With 7+ years of experience, I have honed my skills in both frontend and backend dev, creating performant &
          responsive websites.
        </p>
      </article>
    </div>
  );
}
