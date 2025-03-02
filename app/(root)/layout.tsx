import Image from "next/image"
import LeftSidebar from "@/components/global/left-sidebar"
import PodcastPlayer from "@/components/global/podcast-player"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import {
  onGetRecentPodcasts,
  onGetTrendingPodcasts,
} from "@/actions/podcast.actions"
import { onAuthenticatedUser } from "@/actions/auth.actions"
import {
  onGetPopularPodcasters,
  onGetTopPodcasters,
} from "@/actions/user.actions"
import RightSidebar from "@/components/global/right-sidebar"
import MobileNav from "@/components/mobile-nav"

const HomeLayout = async ({ children }: ChildrenProp) => {
  const query = new QueryClient()
  const authenticated = await onAuthenticatedUser()
  if (authenticated?.status !== 200) return null

  await query.prefetchQuery({
    queryKey: ["trending-podcasts"],
    queryFn: onGetTrendingPodcasts,
  })

  await query.prefetchQuery({
    queryKey: ["recent-podcasts"],
    queryFn: onGetRecentPodcasts,
  })

  await query.prefetchQuery({
    queryKey: ["top-podcasters"],
    queryFn: onGetTopPodcasters,
  })

  await query.prefetchQuery({
    queryKey: ["popular-podcasters"],
    queryFn: onGetPopularPodcasters,
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="relative flex flex-col">
        <main className="relative flex bg-black-3">
          <LeftSidebar />
          <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
            <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
              <div className="flex h-16 items-center justify-between md:hidden">
                <Image
                  src="/icons/logo.svg"
                  alt="menu logo"
                  width={30}
                  height={30}
                />
                <MobileNav user={authenticated.user as User} />
              </div>
              <div className="flex flex-col md:pb-14">{children}</div>
            </div>
          </section>
          <RightSidebar user={authenticated.user as User} />
        </main>
        <PodcastPlayer />
      </div>
    </HydrationBoundary>
  )
}

export default HomeLayout
