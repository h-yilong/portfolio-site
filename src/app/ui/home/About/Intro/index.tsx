import styles from './index.module.css';

export default function Intro() {
  return (
    <div className="w-full relative">
      <div
        style={{ boxShadow: '0px 0px 0px 1px rgba(255,255,255,0.1)' }}
        className="w-full aspect-square rounded-lg absolute inset-0"
      />
      <div className="w-full aspect-square absolute inset-0 scale-110 translate-y-2 bg-gradient-to-t from-30% from-aboutBg" />
      <div
        className={`w-full rounded-lg grid grid-cols-4 grid-rows-4 relative aspect-square overflow-hidden ${styles.intro}`}
      >
        <span className="absolute left-4 top-4 w-3 h-3 rounded-full bg-white/10 z-50" />
        <span className="absolute left-9 top-4 w-3 h-3 rounded-full bg-white/10 z-50" />
        <span className="absolute left-14 top-4 w-3 h-3 rounded-full bg-white/10 z-50" />

        <div className="rounded-lg w-full h-full col-span-2" />
        <div className="rounded-lg w-full h-full" />
        <div className="rounded-lg w-full h-full" />
        <div className="rounded-lg w-full h-full" />
        <div className="rounded-lg w-full h-full col-span-2 row-span-2 !border-white/80 border-2 overflow-hidden">
          <img
            // src="/assets/images/avatar.webp"
            src="/assets/images/linked-in-avatar.webp"
            alt="yilong-avatar"
            className="w-full h-full"
          />
        </div>
        <div className="rounded-lg w-full h-full row-span-2" />
        <div className="rounded-lg w-full h-full" />
        <div className="rounded-lg w-full h-full" />
        <div className="rounded-lg w-full h-full" />
        <div className="rounded-lg w-full h-full col-span-2" />
        <div
          className={`absolute inset-0 w-full h-full ${styles.radialBlend} z-30`}
        />
      </div>
      <article className="relative z-50">
        <h3 className="font-bold text-lg leading-8 mb-2">
          Hi, I&apos;m Yilong HUANG
        </h3>
        <p>
          With 7+ years of experience, I have honed my skills in both frontend
          and backend dev, creating performant & responsive websites.
        </p>
      </article>
    </div>
  );
}
