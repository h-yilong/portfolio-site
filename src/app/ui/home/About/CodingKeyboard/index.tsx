import styles from './index.module.css';

export default function CodingKeyboard() {
  return (
    <div className={`w-full relative ${styles.main}`}>
      <div className={`keyboard-container ${styles.keyboard}`}>
        <div className="w-full flex-1 -translate-x-[1%] flex flex-nowrap gap-2 justify-center items-center">
          <div className={`keyboard-key ${styles.key}`} />
          <div className={`keyboard-key ${styles.key}`} data-key="I">
            I
          </div>
          <div className={`keyboard-key ${styles.key}`} />
          <div className={`keyboard-key ${styles.key}`} data-key="l">
            l
          </div>
          <div className={`keyboard-key ${styles.key}`} data-key="O">
            o
          </div>
          <div className={`keyboard-key ${styles.key}`} data-key="v">
            v
          </div>
          <div className={`keyboard-key ${styles.key}`} data-key="e">
            e
          </div>
          <div className={`keyboard-key ${styles.key}`} />
        </div>

        <div className="w-full flex-1 flex flex-nowrap gap-2 justify-center items-center">
          <div className={`keyboard-key ${styles.key}`} data-key="c">
            c
          </div>
          <div className={`keyboard-key ${styles.key}`} data-key="o">
            o
          </div>
          <div className={`keyboard-key ${styles.key}`} data-key="d">
            d
          </div>
          <div className={`keyboard-key ${styles.key}`} data-key="i">
            i
          </div>
          <div className={`keyboard-key ${styles.key}`} data-key="n">
            n
          </div>
          <div className={`keyboard-key ${styles.key}`} data-key="g">
            g
          </div>
          <div className={`keyboard-key ${styles.key}`} data-key=".">
            .
          </div>
        </div>

        <div className="w-full flex-1 flex flex-nowrap gap-2 justify-center items-center">
          <div
            className={`keyboard-key ${styles.key} ${styles.spaceKey}`}
            data-key="space"
          />
          <div className={`keyboard-key ${styles.key} ${styles.cmdKey}`} />
        </div>
      </div>
      <article className="relative z-50">
        <h3 className="font-bold text-lg leading-8 mb-2">
          My Passion for Coding
        </h3>
        <p>
          I love solving problems and building things through code. Programming
          isn&apos;t just my profession —
          <b>
            <i> it&apos;s my passion</i>
          </b>
          . I enjoy exploring new technologies, and enhancing my skills.
        </p>
      </article>
    </div>
  );
}
