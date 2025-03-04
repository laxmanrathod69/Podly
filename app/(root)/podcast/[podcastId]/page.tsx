import { onAuthenticatedUser } from "@/actions/auth.actions"
import { onGetPodcastDetails } from "@/actions/podcast.actions"
import PodcastDetail from "@/components/global/podcast-detail"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { redirect } from "next/navigation"

type Props = Promise<{ podcastId: string }>

const PodcastDetailsPage = async ({ params }: { params: Props }) => {
  const { podcastId } = await params
  const query = new QueryClient()
  const { user } = await onAuthenticatedUser()

  if (!user?.id) {
    return redirect("/sign-in")
  }

  await query.prefetchQuery({
    queryKey: ["podcast-details", podcastId],
    queryFn: () => onGetPodcastDetails(podcastId),
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <PodcastDetail podcastId={podcastId} userId={user?.id} />
    </HydrationBoundary>
  )
}

export default PodcastDetailsPage
