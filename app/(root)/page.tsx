import PodcastCard from "@/components/PodcastCard";
import { podcastData } from "@/constants";

const Home = () => {
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Home</h1>
        <div className="podcast_grid">
          {podcastData.map(({ id, imgURL, title, description }) => (
            <PodcastCard
              key={id}
              imgURL={imgURL}
              title={title}
              podcastId={id}
              description={description}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
