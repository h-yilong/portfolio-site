import { IntersectionObserverExamples } from "@/hooks/useIntersectionObserver.examples";

export default function ScrollPlayPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Scroll indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className="rounded-lg bg-white/90 backdrop-blur-sm px-3 py-2 shadow-lg">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span>Scroll to test examples</span>
          </div>
        </div>
      </div>

      <IntersectionObserverExamples />
    </div>
  );
}
