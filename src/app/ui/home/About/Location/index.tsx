import styles from './index.module.css';

export default function Location() {
  return (
    <div className="w-full relative">
      <div className="w-full aspect-square flex justify-center items-center relative">
        <img
          // src="/assets/images/avatar.webp"
          src="/assets/images/earth.webp"
          alt="earth"
          className={`w-4/5 aspect-square shadow-lg rounded-full ${styles.earth}`}
        />
        <div className="w-2 h-2 rounded-full bg-green-500/60 absolute right-[36%] bottom-[22%]" />
      </div>
      <article className="relative z-50">
        <h3 className="font-bold text-lg leading-8 mb-2">
          I&apos;m based in Sydney, Australia
        </h3>
        <p>
          With 7+ years of experience, I have honed my skills in both frontend
          and backend dev, creating performant & responsive websites.
        </p>
      </article>
    </div>
  );
}
