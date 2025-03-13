import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"
import { ReactQueryProvider } from "@/react-query/provider"
import { ThemeProvider } from "@/components/theme"
import "./globals.css"
import { AudioPlayerProvider } from "@/context/provider"

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Podly - Where Every Voice Finds Its Audience!",
  description:
    "🎧 Podly is a comprehensive podcast platform that serves as a one-stop destination for all things podcasting. Whether you're a creator looking to share your passion or a listener seeking your next audio adventure, Podly has you covered.",
  icons: {
    icon: "/icons/logo.svg",
  },
}

const RootLayout = ({ children }: ChildrenProp) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={manrope.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AudioPlayerProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
              <Toaster />
            </AudioPlayerProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
