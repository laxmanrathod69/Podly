import Image from "next/image";

interface PodcastCardProps {
  imgURL: string;
  title: string;
  podcastId: number;
  description: string;
}

const PodcastCard = ({
  imgURL,
  title,
  podcastId,
  description,
}: PodcastCardProps) => {
  return (
    <div className="cursor-pointer">
      <figure className="flex flex-col gap-2">
        <Image
          src={imgURL}
          alt={title}
          width={174}
          height={174}
          className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
        />
        <div className="flex flex-col">
          <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
          <h2 className="text-12 truncate font-normal capitalize text-white-1">
            {description}
          </h2>
        </div>
      </figure>
    </div>
  );
};

export default PodcastCard;
