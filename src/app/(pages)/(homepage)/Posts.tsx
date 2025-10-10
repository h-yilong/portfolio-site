// "use client";

// import { useHeroSectionLoaded } from "@/components/LazyLoader";
// import dynamic from "next/dynamic";

// const FeaturedPosts = dynamic(() => import("./FeaturedPosts"), {
//   ssr: true,
// });

const Fallback = () => (
  <section className="my-20">
    <h2>Featured Posts</h2>
  </section>
);

export default function Posts() {
  // const heroLoaded = useHeroSectionLoaded();

  // if (heroLoaded) {
  //   return <FeaturedPosts />;
  // }
  return <Fallback />;
}
