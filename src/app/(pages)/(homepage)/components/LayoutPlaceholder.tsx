"use client";

import { ReactNode } from "react";

interface LayoutPlaceholderProps {
  children: ReactNode;
  height?: string;
  className?: string;
  fallback?: ReactNode;
}

export function LayoutPlaceholder({ children, height = "h-32", className = "", fallback }: LayoutPlaceholderProps) {
  const defaultFallback = (
    <div
      className={`${height} w-full animate-pulse rounded-lg bg-gradient-to-r from-white/5 via-white/10 to-white/5 ${className}`}
    >
      <div className="h-full w-full rounded-lg bg-white/5" />
    </div>
  );

  return (
    <div className="w-full">
      {fallback || defaultFallback}
      <div className="hidden">{children}</div>
    </div>
  );
}

// Specific placeholders for different component types
export function HeroPlaceholder() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex h-full items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-4 border-white/20 border-t-white/60" />
      </div>
    </div>
  );
}

export function TextPlaceholder() {
  return (
    <div className="h-32 w-full space-y-4">
      <div className="h-8 w-3/4 animate-pulse rounded bg-white/10" />
      <div className="h-6 w-1/2 animate-pulse rounded bg-white/5" />
    </div>
  );
}

export function CardGridPlaceholder() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-64 animate-pulse rounded-xl bg-white/5" />
      ))}
    </div>
  );
}

export function ThreeDScenePlaceholder() {
  return (
    <div className="flex aspect-[2] w-full animate-pulse items-center justify-center rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="text-lg text-white/40">Loading 3D Scene...</div>
    </div>
  );
}
