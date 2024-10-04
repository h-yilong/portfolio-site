import styles from "./index.module.css";

export default function Location() {
  return (
    <div className="relative w-full">
      <div className="relative flex aspect-square w-full items-center justify-center">
        <img
          // src="/assets/images/avatar.webp"
          src="/assets/images/earth.webp"
          alt="earth"
          className={`aspect-square w-4/5 rounded-full shadow-lg ${styles.earth}`}
        />
        <div className="absolute bottom-[22%] right-[36%] h-2 w-2 rounded-full bg-green-500/60" />
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
