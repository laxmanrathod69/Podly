import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isProtectedRoute = createRouteMatcher([
  "/create(.*)",
  "/podcast(.*)",
  "/user(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  const baseHost = "localhost:3000"
  const host = req.headers.get("host")
  const reqPath = req.nextUrl.pathname
  const origin = req.nextUrl.origin

  if (isProtectedRoute(req)) {
    // If the user is not authenticated, redirect them to the sign-in page
    const authObject = await auth()
    if (!authObject.userId) {
      return NextResponse.redirect(new URL("/sign-in", origin))
    }
  }

  if (!baseHost.includes(host as string) && reqPath.includes("/podcast")) {
    return fetch(`${origin}/api/domain?host=${host}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200 && data) {
          return NextResponse.rewrite(
            new URL(reqPath, `https://${data.domain}/${reqPath}`),
          )
        }
        return NextResponse.next()
      })
      .catch((error) => {
        console.error("Error fetching domain:", error)
        return NextResponse.next()
      })
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!.*\\..*|_next|api).*)", "/", "/podcast(.*)"],
}
