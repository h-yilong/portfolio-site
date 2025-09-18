import { preload, type PreloadOptions } from "react-dom";
import Hero from "@/app/ui/home/Hero";
import Skills from "@/app/ui/home/Skills";
import About from "@/app/ui/home/About";
import Contact from "@/app/ui/home/Contact";
import Footer from "@/app/ui/home/Footer";

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
      <main className="overflow-x-hidden">
        <Hero />
        <Skills />
        <About />
        <Contact />
        <Footer />
      </main>
    );
  } catch (error) {
    console.log("error", error);
    return <div>Something went wrong.</div>;
  }
}
