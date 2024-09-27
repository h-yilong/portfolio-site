import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  // src: './fonts/GeistVF.woff',
  // src: './fonts/RandyVF.woff2',
  src: './fonts/Montserrat.woff2',
  variable: '--font-montserrat-sans',
  weight: '100 900',
  display: 'swap',
  style: 'normal',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: "Yilong's Page",
  description: "Yilong HUANG's Personal Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-full overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
