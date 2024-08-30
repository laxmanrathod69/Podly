import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ConvexClerkProvider } from "@/providers/ConvexClerkProvider";
import AudioProvider from "@/providers/AudioProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podly - Where Every Voice Finds Its Audience!",
  description:
    "🎧 Podly is a comprehensive podcast platform that serves as a one-stop destination for all things podcasting. Whether you're a creator looking to share your passion or a listener seeking your next audio adventure, Podly has you covered.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <AudioProvider>
          <body className={manrope.className}>{children}</body>
        </AudioProvider>
      </html>
    </ConvexClerkProvider>
  );
}
