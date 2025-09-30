import { preload, type PreloadOptions } from "react-dom";
import Hero from "@/app/ui/home/Hero";
import About from "@/app/ui/home/About";
import Contact from "@/app/ui/home/Contact";
import Footer from "@/app/ui/home/Footer";
import Site from "./Site";
import { YHScene } from "./lusion/YHScene";
import SintRobot from "@/components/3d/SintRobot";
import AnimatedLine from "./AnimatedLine";
import FeaturedPosts from "./FeaturedPosts";
import AnimatedLine2 from "./AnimatedLine2";

const PRELOAD_OPTIONS: PreloadOptions = {
  as: "image",
  crossOrigin: "anonymous",
};

export default function Home() {
  try {
    // export default function Home() {
    preload("/assets/images/js.svg", PRELOAD_OPTIONS);
    preload("/assets/images/nodejs.svg", PRELOAD_OPTIONS);
    preload("/assets/images/react.svg", PRELOAD_OPTIONS);
    preload("/assets/images/tailwind.svg", PRELOAD_OPTIONS);
    preload("/assets/images/desktop0.webp", PRELOAD_OPTIONS);
    preload("/assets/images/desktop1.webp", PRELOAD_OPTIONS);
    preload("/assets/images/desktop2.webp", PRELOAD_OPTIONS);

    return (
      <main
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#98a6f3 transparent",
        }}
        className="parallax-wrapper overflow-x-hidden overflow-y-auto scroll-smooth"
      >
        <div className="snap-y snap-mandatory">
          <SintRobot />
          <AnimatedLine />
          <section className="h-16 w-full text-center backdrop-blur-[2px]">
            <p className="text-2xl leading-16">+ Scroll to explore more +</p>
          </section>
          <section className="max-width relative mx-auto my-16 w-full">
            <h2 className="text-[10vw] font-semibold tracking-tighter *:leading-[1] xl:text-9xl">
              <p>
                <span>Never</span>&nbsp;
                <span>Limit</span>
              </p>
              <p>
                <span>Your</span>&nbsp;
                <span>Imagination</span>
              </p>
            </h2>
          </section>

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
