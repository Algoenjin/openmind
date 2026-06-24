import type { Metadata, Viewport } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { PlayerProvider } from "./components/player/player-context";
import { PlayerBar } from "./components/player/player-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openmind.se"),
  title: {
    default: "OpenMind — Underground Techno",
    template: "%s — OpenMind",
  },
  description:
    "OpenMind is an underground techno record label and events brand founded by Ottman Gronberg, operating from Stockholm, Sweden.",
  keywords: [
    "OpenMind",
    "techno",
    "underground techno",
    "record label",
    "Ottman Gronberg",
    "Stockholm",
  ],
  openGraph: {
    title: "OpenMind — Underground Techno",
    description:
      "Underground techno record label and events brand. Founded by Ottman Gronberg. Stockholm, Sweden.",
    siteName: "OpenMind",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <PlayerProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <PlayerBar />
        </PlayerProvider>
      </body>
    </html>
  );
}
