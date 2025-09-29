import { ReactNode } from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="max-width mx-auto pt-6 [&_img]:mx-auto [&_img]:w-full [&_img]:max-w-5xl [&_img]:rounded-md [&_pre]:font-mono [&_pre]:text-sm">
      {children}
    </main>
  );
}
