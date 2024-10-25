import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>Posts</h1>
      <div>{children}</div>
    </div>
  );
}
