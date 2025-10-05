import WorkCard from "@/components/WorkCard";
import artImg from "@/assets/images/art.jpeg";
import appDesign from "@/assets/images/app-design.png";
import img3 from "@/assets/images/original-d6ce2b3a5a21c4b59f1e4cb7beabf003.jpg";

const POSTS = [
  {
    title: "3D Scenes WebGL",
    description: "web • design • development • 3d  • illustration",
    image: artImg,
    link: "/posts/design/3d",
  },
  {
    title: "Art: Conceptual Design",
    description: "web • design • development • 3d  • illustration",
    video: "/assets/videos/video-design.mp4",
    link: "/posts/design/3d",
  },
  {
    title: "Art: Conceptual Design",
    description: "web • design • development • 3d  • illustration",
    image: appDesign.src,
    link: "/posts/design/3d",
  },
  {
    title: "Art: Conceptual Design",
    description: "web • design • development • 3d  • illustration",
    video: "/assets/videos/kpop_30s.mp4",
    link: "/posts/design/3d",
  },
  {
    title: "Art: Conceptual Design",
    description: "web • design • development • 3d  • illustration",
    image: img3,
    link: "/posts/design/3d",
  },
  {
    title: "Art: Conceptual Design",
    description: "web • design • development • 3d  • illustration",
    video: "/assets/videos/framer_.mp4",
    link: "/posts/design/3d",
  },
];

export default function FeaturedPosts() {
  return (
    <section className="max-width relative mx-auto my-8 w-full">
      <h3 className="my-6 text-center text-[4vw] font-bold">Featured Posts</h3>
      <div className="grid w-full grid-cols-3 gap-8">
        {POSTS.map((item, index) => (
          <WorkCard key={index} flip={index % 2 === 0} {...item} />
        ))}
      </div>
    </section>
  );
}
