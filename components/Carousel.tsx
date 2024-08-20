"use client";

import { useCallback } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { CarouselProps } from "@/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoaderSpinner from "./LoaderSpinner";

const Carousel = ({ fansLikeDetail }: CarouselProps) => {
  const router = useRouter();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const slides =
    fansLikeDetail &&
    fansLikeDetail?.filter((item: any) => item.totalPodcasts > 0);

  if (!slides) {
    return <LoaderSpinner />;
  }

  return (
    <section
      className="flex w-full flex-col gap-4 overflow-hidden"
      ref={emblaRef}
    >
      <div className="flex">
        {slides?.slice(0, 5).map((podcast) => (
          <figure
            key={podcast._id}
            className="carousel_box"
            onClick={() =>
              router.push(`/podcasts/${podcast.podcast[0]?.podcastId}`)
            }
          >
            <Image
              src={podcast.imageUrl}
              alt="podcast card"
              fill
              className="absolute size-full rounded-xl border-none"
            />
            <div className="glassmorhism-black relative z-10 flex flex-col rounded-b-xl p-4">
              <h2 className="text-14 font-semibold text-white-1">
                {podcast.podcast[0]?.podcastTitle}
              </h2>
              <p className="text-12 font-normal text-white-2">{podcast.name}</p>
            </div>
          </figure>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            isSelected={index === selectedIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
