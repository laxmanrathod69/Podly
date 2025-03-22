import PodcastDetail from "@/components/global/podcast-detail"

type Props = Promise<{ podcastId: string }>

const PodcastDetailsPage = async ({ params }: { params: Props }) => {
  const { podcastId } = await params

  return <PodcastDetail podcastId={podcastId} />
}

export default PodcastDetailsPage
