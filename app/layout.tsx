import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const description =
  "Skelcrew runs coding agents through phased tasks with review gates. You make the calls that matter. The agents do the rest, and everything they decide is kept on record.";

export const metadata: Metadata = {
  metadataBase: new URL("https://skelcrew.dev"),
  title: "Skelcrew · give your agents tasks, not chats",
  description,
  icons: {
    icon: "/skelcrew-icon.png",
    apple: "/skelcrew-icon.png",
  },
  openGraph: {
    title: "Skelcrew",
    description:
      "A small crew of coding agents, with you as the team lead. Open source at first release.",
    url: "https://skelcrew.dev",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Skelcrew: give your agents tasks, not chats.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0e0e0d" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
