import { ReactNode } from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    // tips: https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file#element-modifiers
    <main className="prose prose-base prose-headings:leading-[1.2] prose-headings:mb-4 prose-headings:text-indigo-400 prose-h3:font-bold prose-headings:mt-0 dark:prose-invert max-width prose-blockquote:text-amber-400 prose-p:my-4 prose-blockquote:bg-white/5 mx-auto mt-16 pt-6 font-medium [&_img]:mx-auto [&_img]:w-full [&_img]:max-w-5xl [&_img]:rounded-md [&_pre]:font-mono [&_pre]:text-sm">
      {children}
    </main>
  );
}
