import { preload, type PreloadOptions } from "react-dom";
import dynamic from "next/dynamic";
import HeroSection from "./HeroSection";
import {
  OptimizedLoader,
  createTextComponent,
  createCardComponent,
  create3DComponent,
} from "./components/OptimizedLoader";

// 使用 Next.js dynamic 创建优化的组件
const ImaginationText2 = createTextComponent(() => import("@/app/(pages)/react-spring/ImaginationText"));
const AnimatedLine = dynamic(() => import("./AnimatedLine"), {
  ssr: false,
});
const YHScene = create3DComponent(() => import("./3d/LetterCollision/YHScene"));
const FeaturedPosts = createCardComponent(() => import("./FeaturedPosts"));
const AnimatedLine2 = dynamic(() => import("./AnimatedLine2"), {
  loading: () => <div className="h-32 w-full animate-pulse rounded-lg bg-white/5" />,
  ssr: false,
});
const Site = createTextComponent(() => import("./Site"));
const About = createCardComponent(() => import("@/app/ui/home/About"));
const Hero = createTextComponent(() => import("@/app/ui/home/Hero"));
const Contact = createTextComponent(() => import("@/app/(pages)/(homepage)/Contact"));
// const Footer = createTextComponent(() => import("@/app/ui/home/Footer"));

const PRELOAD_OPTIONS: PreloadOptions = {
  as: "image",
  crossOrigin: "anonymous",
};

export default function HomeOptimized() {
  try {
    // 预加载关键图片资源
    preload("/assets/t-2048/Image_0.webp", PRELOAD_OPTIONS);

    return (
      <main
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#98a6f3 transparent",
        }}
        className="parallax-wrapper overflow-x-hidden overflow-y-auto scroll-smooth"
      >
        <div>
          <HeroSection />

          {/* 高优先级：HeroSection 加载后立即加载 */}
          <OptimizedLoader priority="high" placeholderType="text" useSSR={false} preload={true}>
            <ImaginationText2 />
          </OptimizedLoader>

          {/* 中优先级：接近视口时加载 */}
          <OptimizedLoader priority="medium" preloadDistance={300} placeholderType="custom" useSSR={false}>
            <AnimatedLine />
          </OptimizedLoader>

          {/* 低优先级：进入视口时加载（重型 3D 场景） */}
          <OptimizedLoader priority="low" placeholderType="3d" useSSR={false}>
            <YHScene />
          </OptimizedLoader>

          {/* 中优先级：需要 SSR 的组件 */}
          <OptimizedLoader priority="medium" preloadDistance={200} placeholderType="cards" useSSR={true}>
            <FeaturedPosts />
          </OptimizedLoader>

          <OptimizedLoader priority="medium" preloadDistance={200} placeholderType="custom" useSSR={false}>
            <AnimatedLine2 />
          </OptimizedLoader>

          <OptimizedLoader priority="medium" preloadDistance={200} placeholderType="text" useSSR={true}>
            <Site />
          </OptimizedLoader>

          <OptimizedLoader priority="medium" preloadDistance={200} placeholderType="cards" useSSR={true}>
            <About />
          </OptimizedLoader>

          <OptimizedLoader priority="medium" preloadDistance={200} placeholderType="text" useSSR={true}>
            <Hero />
          </OptimizedLoader>

          <OptimizedLoader priority="medium" preloadDistance={200} placeholderType="text" useSSR={true}>
            <Contact />
          </OptimizedLoader>
        </div>
      </main>
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return <div>Something went wrong.</div>;
  }
}

// 导出用于 A/B 测试的版本
export { HomeOptimized as Home };
