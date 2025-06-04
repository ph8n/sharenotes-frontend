import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sharenotes",
  description: "A simple, minimal, fast, and open-source note-taking app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">ShareNotes</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/mynotes" className="text-gray-600 hover:text-blue-500">
                  My Notes
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
