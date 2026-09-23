import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "variable",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EventDhondo — Campus Event Discovery & Achievement Platform",
  description:
    "A design case study of EventDhondo, a unified platform connecting university students and organizers for event discovery, registration, attendance, and achievement tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <a id="top" className="absolute" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}