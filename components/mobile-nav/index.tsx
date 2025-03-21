"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { cn } from "@/lib/utils"
import { SIDEBAR_ITEMS } from "@/constants/constant"

const MobileNav = ({ user }: { user: User }) => {
  const pathname = usePathname()
  const router = useRouter()

  if (!user?.id) {
    router.push("/sign-in")
    return null
  }

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
            {SIDEBAR_ITEMS.map(({ route, item, label }) => {
              const isActive =
                pathname === route || pathname.startsWith(`${route}/`)
              return (
                <Link
                  key={label}
                  href={route}
                  className={cn("flex gap-3 py-3 items-center justify-start", {
                    "bg-nav-focus border-r-4 border-orange-1": isActive,
                  })}
                >
                  {item}
                  <p>{label}</p>
                </Link>
              )
            })}
          </nav>
          {/*FIX: User component is not showing properly */}
          <div className="flex items-center gap-3 absolute bottom-4 left-4">
            <Link
              href={`/user/${user.id}`}
              className="glassmorphism-black p-[0.20rem] w-fit rounded-full"
            >
              <Image
                src={user?.image || "/icons/profile.svg"}
                alt={user.name}
                width={45}
                height={45}
                className="rounded-full"
              />
            </Link>
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
