"use client";

import WorkCard from "@/components/WorkCard";
// import artImg from "@/assets/images/art.jpeg";
import appDesign from "@/assets/images/app-design.png";
import img3 from "@/assets/images/original-d6ce2b3a5a21c4b59f1e4cb7beabf003.jpg";
import AnimatedLine from "./AnimatedLine";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const POSTS = [
  {
    title: "Build A 3D Hero Section",
    description: "WebGL/Three.js • Design • Optimisation",
    image: "/assets/images/hero.jpg",
    video: "/assets/videos/hero-s.mp4",
    link: "/posts/welcome",
  },
  {
    title: "Performance Optimisation",
    description: "Performance • Optimisation • Lighthouse",
    image: "/assets/images/lighthouse.jpg",
    // video: "/assets/videos/kpop_30s.mp4",
    link: "/posts/welcome",
  },
  {
    title: "Implement Animations",
    description: "CSS • JavaScript • Web APIs • Performance",
    image: appDesign.src,
    link: "/posts/welcome",
  },
  {
    title: "3D Physics Scene",
    description: "WebGL/Three.js • Physics • Design",
    video: "/assets/videos/collision.mp4",
    image: "/assets/images/letter-collision.jpg",
    // image: artImg,
    link: "/posts/welcome",
  },
  {
    title: "Design & Build",
    description: "Design System • Figma • Shadcn/Radix",
    image: img3,
    link: "/posts/welcome",
  },
  {
    title: "Test and Deploy",
    description: "Vitest • Cypress • Github Actions • Vercel",
    image: "/assets/images/hero.jpg",
    video: "/assets/videos/framer_.mp4",
    link: "/posts/welcome",
  },
];

export default function FeaturedPosts() {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0,
    rootMargin: "200px 0px 200px 0px",
  });

  return (
    <section id="featured-posts" ref={ref} className="relative w-full overflow-x-hidden">
      {isIntersecting && <AnimatedLine />}
      <div className="max-width relative mx-auto my-20 w-full">
        <h3 className="my-6 text-center text-4xl font-bold sm:text-5xl lg:text-6xl">Featured Posts</h3>
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
          {POSTS.map((item, index) => (
            <WorkCard key={index} flip={index % 2 === 0} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
