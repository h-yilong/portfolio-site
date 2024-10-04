import { shimmer } from "../../constant";
import CodingKeyboard from "./CodingKeyboard";
import Intro from "./Intro";
import Location from "./Location";
import TechStack from "./TechStack";

export default function About() {
  return (
    <section
      className="mx-auto mt-24 grid h-full max-w-7xl grid-cols-1 gap-6 *:rounded-xl *:border *:border-white/10 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-6"
      id="about"
    >
      <div className="col-span-1 xl:row-span-3">
        <Intro />
      </div>
      <div className="col-span-1 xl:row-span-3">
        <TechStack />
      </div>
      <div className="col-span-1 xl:row-span-4">
        <Location />
      </div>
      <div className="xl:col-span-2 xl:row-span-3">
        <CodingKeyboard />
      </div>
      <div className="xl:col-span-1 xl:row-span-2">
        <div className={`${shimmer} relative aspect-square overflow-hidden rounded-full bg-white/5`} />
      </div>
    </section>
  );
}
