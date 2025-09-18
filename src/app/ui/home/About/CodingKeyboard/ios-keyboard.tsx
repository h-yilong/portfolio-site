import styles from "./index.module.css";
import iosKeyboard from "./ios-keyboard.svg";

export default function CodingKeyboard() {
  return (
    <div className={`relative w-full ${styles.main}`}>
      <div className="mx-auto mb-16 w-full max-w-2xl">
        <img src={iosKeyboard.src} alt="ios-keyboard" />
      </div>
      <article className="relative z-50">
        <h3 className="mb-2 text-lg leading-8 font-bold">My Passion for Coding</h3>
        <p>
          I love solving problems and building things through code. Programming isn&apos;t just my profession —
          <b>
            <i> it&apos;s my passion</i>
          </b>
          . I enjoy exploring new technologies, and enhancing my skills.
        </p>
      </article>
    </div>
  );
}
