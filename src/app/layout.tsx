import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Giulia Fanasca • Creative Technologist",
  description: "Creative Technologist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rainbowGradient = "var(--rainbow-gradient)";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50">
          {/* crisp line */}
          <div className="h-[2px] w-full opacity-70" style={{ backgroundImage: rainbowGradient }} />

          {/* leaking glow (downwards) */}
          <div
            className="relative h-5 w-full"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))",
            }}
          >
            <div
              className="absolute inset-x-0 -top-2 h-6 blur-[10px] opacity-28"
              style={{ backgroundImage: rainbowGradient }}
            />
            <div
              className="absolute inset-x-0 -top-4 h-8 blur-[18px] opacity-10"
              style={{ backgroundImage: rainbowGradient }}
            />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
