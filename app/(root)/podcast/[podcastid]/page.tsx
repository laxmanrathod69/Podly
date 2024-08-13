const PodcastDetails = ({ params }: { params: { podcastid: string } }) => {
  return <p className="text-white-1">PodcastDetails for {params.podcastid}</p>;
};

export default PodcastDetails;
