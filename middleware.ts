import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isProtectedRoute = createRouteMatcher([
  "/create(.*)",
  "/podcast(.*)",
  "/user(.*)",
])

export default clerkMiddleware(async (Auth, req) => {
  const baseHost = "localhost:3000"
  const host = req.headers.get("host")
  const reqPath = req.nextUrl.pathname
  const origin = req.nextUrl.origin
  const auth = await Auth()
  if (isProtectedRoute(req)) {
    // If the user is not authenticated, redirect them to the sign-in page
    if (!auth.userId) {
      return NextResponse.redirect(new URL("/sign-in", origin))
    }
  }

  if (!baseHost.includes(host as string) && reqPath.includes("/podcast")) {
    const response = await fetch(`${origin}/api/domain?host=${host}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    if (data.status === 200 && data) {
      return NextResponse.rewrite(
        new URL(reqPath, `https://${data.domain}/${reqPath}`),
      )
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/api/(.*)", "/podcast(.*)", "/user(.*)", "/create(.*)"],
}
