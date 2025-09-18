import { shimmer } from "../../constant";
// import CodingKeyboard from "./CodingKeyboard";
import Intro from "./Intro";
import Location from "./Location";
import TechStack from "./TechStack";
import CodingKeyboard2 from "./CodingKeyboard/ios-keyboard";

const About = () => (
  <section
    className="max-width mt-24 grid h-full grid-cols-1 gap-6 *:rounded-xl *:border *:border-white/10 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-6"
    id="about"
  >
    <div className="about-intro col-span-1 xl:row-span-3">
      <Intro />
    </div>
    <div className="about-tech col-span-1 xl:row-span-3">
      <TechStack />
    </div>
    <div className="about-location col-span-1 xl:row-span-4">
      <Location />
    </div>
    <div className="about-keyboard row-start-4 md:col-span-2 md:row-start-3 xl:row-span-3 xl:row-start-4">
      <CodingKeyboard2 />
    </div>
    <div className="xl:col-span-1 xl:row-span-2">
      <div className={`${shimmer} aspect-square rounded-full bg-white/5`} />
    </div>
  </section>
);

export default About;
