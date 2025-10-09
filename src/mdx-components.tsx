import type { MDXComponents } from "mdx/types";
// import Image, { ImageProps } from "next/image";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

// const components = {
//   // Allows customizing built-in components, e.g. to add styling.
//   h1: ({ children }) => <h1 style={{ color: "red", fontSize: "48px" }}>{children}</h1>,
//   img: (props) => (
//     <Image
//       sizes="100vw"
//       style={{ width: "100%", height: "auto" }}
//       width={800}
//       height={800}
//       quality={90}
//       loading="lazy"
//       crossOrigin="anonymous"
//       {...(props as ImageProps)}
//       alt={props.alt ?? ""}
//     />
//   ),
// } satisfies MDXComponents;

const components = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
