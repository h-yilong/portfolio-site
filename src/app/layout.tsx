import type { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/app/components/Navbar";
import "./globals.css";
import { Toaster } from "sonner";

const montserrat = localFont({
  // src: './fonts/GeistVF.woff',
  // src: './fonts/RandyVF.woff2',
  src: "./fonts/Montserrat.woff2",
  variable: "--font-montserrat",
  weight: "100 900",
  display: "swap",
  style: "normal",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hi, I'm Yilong",
  description:
    "Yilong HUANG is a Sydney based Web Developer, with extensive experience in web application development.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body className={`${montserrat.variable} ${geistMono.variable} dark max-w-full overflow-x-hidden antialiased`}>
        <Navbar />
        {children}
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
