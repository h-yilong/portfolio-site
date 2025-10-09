// import { preload, type PreloadOptions } from "react-dom";

import AnimatedLine from "./AnimatedLine";
import HeroSection from "./HeroSection";
import NeverLimitImagination from "./NeverLimitImagination";
import LetterCollision from "./LetterCollision";
import Posts from "./Posts";
import { PerformanceMonitor } from "./components/PerformanceMonitor";
import Footer from "@/components/Footer";
import Contact from "@/app/ui/home/Contact";
// import dynamic from "next/dynamic";

// const ImaginationText2 = dynamic(() => import("@/app/(pages)/react-spring/ImaginationText"));
// const NeverLimitImagination = dynamic(() => import("./NeverLimitImagination"));
// const AnimatedLine = dynamic(() => import("./AnimatedLine"));
// const LetterCollision = dynamic(() => import("./LetterCollision"));
// const Posts = dynamic(() => import("./Posts"));

// Lazy load components that are not immediately visible
// const ImaginationText2 = lazy(() => import("@/app/(pages)/react-spring/ImaginationText"));

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
          <Posts />
          <Contact />
          <Footer />
        </div>
        <PerformanceMonitor />
      </main>
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return <div>Something went wrong.</div>;
  }
}
