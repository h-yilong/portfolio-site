import Intro from './Intro';
import TechStack from './TechStack';

export default function About() {
  return (
    <section
      className="mt-24 max-w-7xl mx-auto grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-6 *:rounded-xl *:border *:border-white/10 h-full"
      id="about"
    >
      <div className="col-span-1 xl:row-span-3">
        <Intro />
      </div>
      <div className="col-span-1 xl:row-span-3">
        <TechStack />
      </div>
      <div className="col-span-1 xl:row-span-4">
        <Intro />
      </div>
      <div className="xl:col-span-2 xl:row-span-3">
        <Intro />
      </div>
      <div className="xl:col-span-1 xl:row-span-2">
        <Intro />
      </div>
    </section>
  );
}
