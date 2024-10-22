import styles from "./index.module.css";

export default function Location() {
  return (
    <div className="relative w-full">
      <div className="relative flex aspect-square w-full items-center justify-center">
        <img
          src="/assets/images/earth.webp"
          alt="earth"
          className={`aspect-square w-4/5 rounded-full shadow-lg ${styles.earth}`}
        />
        <span className="absolute bottom-[22%] right-[36%] inline-flex h-3 w-3">
          <span className="btn-ping" />
          <span className="btn-ping_dot" />
        </span>
        <div className="absolute bottom-[12%] right-[12%] inline-flex gap-2 text-right text-white/80">
          <b>Sydney,</b>
          <b>Australia</b>
        </div>
      </div>
      <article className="relative z-50 xl:mt-12">
        <h3 className="mb-2 text-lg font-bold leading-8">I&apos;m based in Sydney, Australia</h3>
        <p>
          With 7+ years of experience, I have honed my skills in both frontend and backend dev, creating performant &
          responsive websites.
        </p>
      </article>
    </div>
  );
}
