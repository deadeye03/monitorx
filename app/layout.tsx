import type { Metadata } from "next";
import localFont from "next/font/local";
import { Gideon_Roman } from 'next/font/google'
import "./globals.css";

import { Toaster } from "react-hot-toast";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
// const getRoman = localFont({
//   src: "./fonts/times-new-roman.ttf",
//   variable: "--font-roman",
//   display:'swap',
// });

const getGideon = Gideon_Roman({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roman',
  weight: '400'
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "MonitorX",
  description: "The fastest way to build apps with Next.js and Supabase",
};
import { Agent, connect, setGlobalDispatcher } from "undici";
import { Suspense } from "react";
import NavBar from "../components/NavBar";
import ProgressBarProvider from "../components/ui/ProgressBar";


setGlobalDispatcher(new Agent({
  connect: { timeout: 60_000 }
}));


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en" suppressHydrationWarning>
      <Suspense>
        <body
          className={`${geistSans.variable} ${geistMono.variable}${getGideon.variable} antialiased`}
        >
          <ProgressBarProvider>
            <NavBar />
            <main className="mt-16">


              {children}

              <Toaster
                position="top-center"
                reverseOrder={false}
              />
            </main>

          </ProgressBarProvider>
        </body>
      </Suspense>
    </html>
  );
}
