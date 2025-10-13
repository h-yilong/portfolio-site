// import { preload, type PreloadOptions } from "react-dom";

import AnimatedLine from "./AnimatedLine";
import HeroSection from "./HeroSection";
import NeverLimitImagination from "./NeverLimitImagination";
import LetterCollision from "./LetterCollision";
import Footer from "@/components/Footer";
import Contact from "@/app/ui/home/Contact";
import FeaturedPosts from "./FeaturedPosts";

// const PRELOAD_OPTIONS: PreloadOptions = {
//   as: "image",
//   crossOrigin: "anonymous",
// };

export default function Home() {
  try {
    // preload("/assets/images/react.svg", PRELOAD_OPTIONS);

    return (
      <main
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#98a6f3 transparent",
        }}
        className="parallax-wrapper overflow-x-hidden overflow-y-auto scroll-smooth"
      >
        <div>
          <HeroSection />
          <NeverLimitImagination />
          <AnimatedLine />
          <LetterCollision />
          <FeaturedPosts />
          <section className="max-width mx-auto my-16">
            <h3 className="w-1/2 text-[4vw] leading-[1.1] font-bold">
              Are you ready to build something cool and bring your ideas to life?
            </h3>
          </section>
          <Contact />
          <Footer />
        </div>
      </main>
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return <div>Something went wrong.</div>;
  }
}
