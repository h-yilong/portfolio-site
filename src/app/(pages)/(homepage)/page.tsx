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
      <main>
        <HeroSection />
        <NeverLimitImagination />
        <LetterCollision />
        <FeaturedPosts />
        <Contact />
        <Footer />
      </main>
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return <div>Something went wrong.</div>;
  }
}
