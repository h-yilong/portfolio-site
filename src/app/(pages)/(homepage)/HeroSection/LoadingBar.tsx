import { cn } from "@/lib/utils";

export default function LoadingBar({ modelLoaded }: { modelLoaded: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex flex-col items-center justify-center bg-[var(--background)] transition-opacity duration-750 ease-out",
        modelLoaded ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100",
      )}
    >
      <div
        className={cn(
          "h-[1px] w-3/4 transition-transform duration-750 ease-out",
          modelLoaded ? "-translate-y-36" : "translate-y-0",
        )}
      >
        <div className="loading-bar" />
      </div>
      <div
        className={cn(
          "h-[1px] w-3/4 transition-transform duration-750 ease-out",
          modelLoaded ? "translate-y-36" : "translate-y-0",
        )}
      >
        <div className="loading-bar" />
      </div>
    </div>
  );
}
