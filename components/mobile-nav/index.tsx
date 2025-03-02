"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { cn } from "@/lib/utils"
import { sidebarLinks } from "@/constants"

const MobileNav = ({ user }: { user: User }) => {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger>
        <Image src="/icons/hamburger.svg" alt="menu" width={30} height={30} />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="h-full border-none bg-black-1 flex flex-col"
      >
        <SheetClose>
          <SheetHeader>
            <SheetTitle>
              <Link href="/">
                <Image
                  src="/icons/brand-logo.svg"
                  alt="brand-logo"
                  width={90}
                  height={90}
                />
              </Link>
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-9 text-white-1 mt-8 flex-grow">
            {sidebarLinks.map(({ route, imgURL, label }) => {
              const isActive =
                pathname === route || pathname.startsWith(`${route}/`)
              return (
                <Link
                  key={imgURL}
                  href={route}
                  className={cn("flex gap-3 py-3 items-center justify-start", {
                    "bg-nav-focus border-r-4 border-orange-1": isActive,
                  })}
                >
                  <Image src={imgURL} alt={label} width={24} height={24} />
                  <p>{label}</p>
                </Link>
              )
            })}
          </nav>
          {/*FIX: User component is not showing properly */}
          <div className="flex items-center gap-3 absolute bottom-4 left-4">
            <div className="glassmorphism-black p-[0.20rem] w-fit rounded-full">
              <Image
                src={user.image!}
                alt={user.name}
                width={45}
                height={45}
                className="rounded-full"
              />
            </div>
            <h1 className="text-base font-medium text-white-1 hover:underline">
              {user.name}
            </h1>
          </div>
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
