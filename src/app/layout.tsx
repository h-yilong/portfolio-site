import type { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/app/components/Navbar";
import "./globals.css";
import { Toaster } from "sonner";

const montserrat = localFont({
  // src: './fonts/GeistVF.woff',
  // src: './fonts/RandyVF.woff2',
  src: "../../public/assets/fonts/Montserrat.woff2",
  variable: "--font-montserrat",
  weight: "100 900",
  display: "swap",
  style: "normal",
});
const geistMono = localFont({
  src: "../../public/assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hi, I'm Yilong",
  description:
    "Yilong HUANG is a Sydney based Web Developer, with extensive experience in web application development.",
  authors: [{ name: "Yilong HUANG", url: "https://www.linkedin.com/in/yilonghuang/" }],
  icons: {
    icon: "/assets/images/logo.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.yilong.com.au",
    title: "Hi, I'm Yilong",
    description:
      "Yilong HUANG is a Sydney based Web Developer, with extensive experience in web application development.",
    siteName: "Hi, I'm Yilong",
    images: [{ url: "https://www.yilong.com.au/assets/images/preview.jpg" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      style={{
        scrollbarColor: "#98a6f3 transparent",
      }}
      data-scroll-behavior="smooth"
      className="overflow-x-hidden scroll-smooth"
      lang="en"
    >
      <head>
        <link rel="preload" href="/assets/fonts/GeistMonoVF.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/Montserrat.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className={`${montserrat.variable} ${geistMono.variable} dark overflow-x-hidden antialiased`}>
        <Navbar />
        {children}
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
