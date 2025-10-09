import { ReactNode } from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="prose prose-base prose-headings:leading-[1.2] prose-headings:mb-4 prose-headings:mt-0 dark:prose-invert max-width mx-auto mt-16 pt-6 [&_img]:mx-auto [&_img]:w-full [&_img]:max-w-5xl [&_img]:rounded-md [&_pre]:font-mono [&_pre]:text-sm">
      {children}
    </main>
  );
}
