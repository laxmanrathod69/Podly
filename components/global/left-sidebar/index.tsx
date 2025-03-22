"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { usePodcast } from "@/context/provider"
import { SIDEBAR_ITEMS } from "@/constants/constant"

const LeftSidebar = () => {
  const { currentPodcast } = usePodcast()
  const pathname = usePathname()

  return (
    <section
      className={`left_sidebar ${currentPodcast?.id ? "h-[calc(100vh-80px)]" : "h-screen"}`}
    >
      <nav className="flex flex-col gap-5">
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-1 max-lg:justify-center"
        >
          <Image src="/icons/logo.svg" width={23} height={27} alt="logo" />
          <h1 className="text-24 font-extrabold text-white-1 max-lg:hidden">
            Podly
          </h1>
        </Link>
        {SIDEBAR_ITEMS.map(({ route, label, item }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`)

          return (
            <Link
              key={label}
              href={route}
              className={cn(
                "flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start hover:text-orange-1 transition-all duration-75 ease-in",
                { "bg-nav-focus border-r-4 border-orange-1": isActive },
              )}
            >
              {item}
              <p className="sm:hidden lg:block">{label}</p>
            </Link>
          )
        })}
      </nav>
    </section>
  )
}

export default LeftSidebar
