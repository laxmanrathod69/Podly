import { onAuthenticatedUser } from "@/actions/auth/auth.actions"
import PodcastDetail from "@/components/global/podcast-detail"
import { redirect } from "next/navigation"

type Props = Promise<{ podcastId: string }>

const PodcastDetailsPage = async ({ params }: { params: Props }) => {
  const { podcastId } = await params
  const userData = await onAuthenticatedUser()

  if (!userData || userData?.status !== 200) {
    return redirect("/sign-in")
  }

  return (
    <PodcastDetail podcastId={podcastId} userId={userData.data?.id ?? ""} />
  )
}

export default PodcastDetailsPage
