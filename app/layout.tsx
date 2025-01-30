import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import AudioProvider from "@/providers/AudioProvider"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme"
import { ReactQueryProvider } from "@/react-query/provider"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Podly - Where Every Voice Finds Its Audience!",
  description:
    "🎧 Podly is a comprehensive podcast platform that serves as a one-stop destination for all things podcasting. Whether you're a creator looking to share your passion or a listener seeking your next audio adventure, Podly has you covered.",
  icons: {
    icon: "/icons/logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* TODO: delete audio provider later */}
        <AudioProvider>
          <body className={manrope.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ReactQueryProvider>{children}</ReactQueryProvider>
              <Toaster />
            </ThemeProvider>
          </body>
        </AudioProvider>
      </html>
    </ClerkProvider>
  )
}
