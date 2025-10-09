import PixelHeart from "@/components/PixelHeart";

export default function TextOverlay() {
  return (
    <div className="pointer-events-none relative z-50 h-0 w-full translate-z-6 scale-75">
      <div className="flex-col-center absolute top-[85vh] z-10 h-full w-full">
        <h1
          className="rounded-3xl bg-black/35 px-[3vw] py-[2vw] text-center leading-[1.1] font-light tracking-tight text-white opacity-90"
          style={{ textShadow: "0 0 8px #fff" }}
        >
          <div className="flex gap-[1vw] overflow-hidden pb-[2vw] text-[10vw] tracking-tighter xl:text-9xl">
            <div className="animate-[0.5s_ease-out_0s_1_forwards_slide-up]">Hi,</div>
            <div className="animate-[0.5s_ease-out_80ms_1_forwards_slide-up] opacity-0">I&apos;m</div>
            <div className="animate-[0.5s_ease-out_120ms_1_forwards_slide-up] font-medium opacity-0">Yilong</div>
          </div>
          <div className="flex items-center justify-center gap-[1vw] text-[7.5vw] xl:text-8xl">
            <span>I</span>
            <PixelHeart />
            <span>Building</span>
          </div>
          <div className="text-[7.5vw] xl:text-8xl">Cool Things</div>
        </h1>
      </div>
    </div>
  );
}
