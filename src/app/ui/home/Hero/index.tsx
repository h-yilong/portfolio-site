import FloatingLaptop from '@/app/components/FloatingLaptop';

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto" id="home">
      <div className="mt-36">
        {/* <div className="mt-36 w-fit p-12 bg-white/5 rounded-3xl relative z-20 backdrop-blur-sm"> */}
        <p className="text-lg font-medium">
          Hi all<span className="waving-hand">👋</span>, I am
        </p>
        <h1 className="text-6xl tracking-wide font-medium my-6">
          Yilong HUANG
        </h1>
        <p className="text-2xl text-indigo-500 font-semibold tracking-wide my-4">
          &gt; A Front End Developer
        </p>
        <h2 className="text-xl my-4 text-slate-300">
          I love building cool stuff for the web!
        </h2>
        <p className="text-slate-500 mt-12">
          <code>&#47;&#47; check the links below</code>
        </p>
        <p className="my-2">
          <code className="text-purple-500">const</code>
          <code className="text-emerald-500"> myGitHubLink </code>
          <code>= </code>
          <code className="text-orange-500 hover:underline cursor-pointer">
            &quot;www.github.com/u/yilong&quot;
          </code>
        </p>

        <button className="btn mt-16 bg-gradient-to-br from-white/10 to-white/5 py-4 px-6 rounded-3xl hover:bg-white/5 font-semibold">
          <span className="relative h-3 w-3 inline-flex mr-3">
            <span className="btn-ping" />
            <span className="btn-ping_dot" />
          </span>
          <span className="hover:text-white inline-flex">
            Let&apos;s work together!
          </span>
        </button>
      </div>
      <div className="absolute w-2/3 inset-0 left-1/3 z-10">
        <FloatingLaptop />
      </div>
    </section>
  );
};

export default Hero;
