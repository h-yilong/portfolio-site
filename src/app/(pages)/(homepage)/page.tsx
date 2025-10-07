import { preload, type PreloadOptions } from "react-dom";
import HeroSection from "./HeroSection";
import Hero from "@/app/ui/home/Hero";
import About from "@/app/ui/home/About";
import Contact from "@/app/ui/home/Contact";
import Footer from "@/app/ui/home/Footer";
import Site from "./Site";
import { YHScene } from "./lusion/YHScene";
import AnimatedLine from "./AnimatedLine";
import FeaturedPosts from "./FeaturedPosts";
import AnimatedLine2 from "./AnimatedLine2";
import ImaginationText2 from "@/app/(pages)/react-spring/ImaginationText";

const PRELOAD_OPTIONS: PreloadOptions = {
  as: "image",
  crossOrigin: "anonymous",
};

export default function Home() {
  try {
    // export default function Home() {
    preload("/assets/t-2048/Image_0.webp", PRELOAD_OPTIONS);
    // preload("/assets/images/js.svg", PRELOAD_OPTIONS);
    // preload("/assets/images/nodejs.svg", PRELOAD_OPTIONS);
    // preload("/assets/images/react.svg", PRELOAD_OPTIONS);
    // preload("/assets/images/tailwind.svg", PRELOAD_OPTIONS);
    // preload("/assets/images/desktop0.webp", PRELOAD_OPTIONS);
    // preload("/assets/images/desktop1.webp", PRELOAD_OPTIONS);
    // preload("/assets/images/desktop2.webp", PRELOAD_OPTIONS);

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
          <ImaginationText2 />
          <AnimatedLine />
          <YHScene />
          <FeaturedPosts />
          <AnimatedLine2 />
          <Site />
          <About />
          <Hero />
          <Contact />
          <Footer />
        </div>
      </main>
    );
  } catch (error) {
    console.log("error", error);
    return <div>Something went wrong.</div>;
  }
}
