import ContactForm from "./ContactForm";
import WorkTogether from "./WorkTogether";
import Halo from "./Halo";
// import AnimatedLine3 from "../AnimatedLine3";

// todo: 1. reCaptcha 2. email limit 3. IP limit
export default function Contact() {
  return (
    <section className="relative">
      <img
        src="/assets/images/line4.svg"
        alt="line"
        className="absolute top-0 right-0 -z-10 h-full w-full max-w-[1436px] object-cover object-right-top opacity-75"
      />
      {/* <AnimatedLine3 /> */}
      <section className="max-width mx-auto my-16 backdrop-blur-sm">
        <h3 className="w-fit bg-linear-to-r from-teal-300 to-indigo-300 bg-clip-text text-right text-[6vw] leading-[1.1] font-extrabold text-transparent *:w-fit xl:text-7xl">
          <p>Ready to build something</p>
          <p>cool and bring your</p>
          <p>ideas to life?</p>
        </h3>
      </section>
      <section className="max-width relative bg-[var(--background)]/90 backdrop-blur-xs">
        <Halo />
        <div className="my-24 overflow-hidden rounded-xl border border-white/10 bg-black/5" id="contact">
          <div className="flex h-8 w-full items-center bg-linear-to-r from-white/5 via-white/15 to-white/5">
            <div className="ml-4 h-3 w-3 rounded-full bg-white/35" />
            <div className="ml-2 h-3 w-3 rounded-full bg-white/35" />
            <div className="ml-2 h-3 w-3 rounded-full bg-white/35" />
          </div>
          <WorkTogether />
          <ContactForm />
        </div>
      </section>
    </section>
  );
}
