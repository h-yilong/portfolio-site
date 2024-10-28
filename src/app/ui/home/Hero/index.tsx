import dynamic from "next/dynamic";
import Link from "next/link";
import Button from "@/app/components/primitive/Button";

const FloatingLaptop = dynamic(() => import("@/app/components/FloatingLaptop"));

const Hero = () => {
  return (
    <section className="max-width relative" id="home">
      <div className="relative z-20 w-fit pt-28">
        <p className="text-lg font-medium">
          Hi there<span className="waving-hand">👋</span>, I am
        </p>
        <h1 data-test="hero-heading" className="my-6 text-6xl font-medium tracking-wide">
          Yilong HUANG
        </h1>
        <code className="my-4 bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-2xl font-semibold tracking-wide text-transparent">
          &gt; Front-End Developer
        </code>
        <h2 className="my-4 text-xl text-slate-300">I love building cool stuff for the web!</h2>
        <p className="mt-12 text-slate-500">
          <code>&#47;&#47; check the links below</code>
        </p>
        <p className="mt-2">
          <code className="text-purple-500">const</code>
          <code className="text-emerald-500"> github </code>
          <code>= </code>
          <code className="cursor-pointer text-orange-500">
            <Link target="_blank" href="https://github.com/h-yilong/">
              &quot;www.github.com/h-yilong&quot;
            </Link>
          </code>
        </p>
        <p className="mb-16 mt-2">
          <code className="text-purple-500">const</code>
          <code className="text-emerald-500"> linkedIn </code>
          <code>= </code>
          <code className="cursor-pointer text-orange-500">
            <Link target="_blank" href="https://www.linkedin.com/in/yilonghuang">
              &quot;www.linkedin.com/in/yilonghuang&quot;
            </Link>
          </code>
        </p>

        <Link className="" href="#contact">
          <Button ping>Let&apos;s work together!</Button>
        </Link>
      </div>
      <FloatingLaptop />
    </section>
  );
};

export default Hero;
