// import { preload, type PreloadOptions } from "react-dom";

// import AnimatedLine from "./AnimatedLine";
import HeroSection from "./HeroSection";
import NeverLimitImagination from "./NeverLimitImagination";
import LetterCollision from "./LetterCollision";
import Footer from "@/components/Footer";
import Contact from "./Contact";
import FeaturedPosts from "./FeaturedPosts";
// import AnimatedLine3 from "./AnimatedLine3";

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
          <LetterCollision />
          <FeaturedPosts />
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
