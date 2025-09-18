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
        <span className="absolute bottom-[57%] left-[48.6%] inline-flex h-3 w-3">
          <span className="btn-ping" />
          <span className="btn-ping_dot" />
        </span>
        <div className="absolute bottom-[46%] left-[33%] inline-flex gap-2 text-right text-sm text-white/80">
          <b>Sydney,</b>
          <b>Australia</b>
        </div>
      </div>
      <article className="relative z-50 xl:mt-12">
        <h3 className="mb-2 text-lg leading-8 font-bold">I&apos;m based in Sydney, Australia</h3>
        <p>
          Based in Sydney, Australia. I am highly flexible and open to onsite, remote, or hybrid working arrangements.
        </p>
      </article>
    </div>
  );
}
