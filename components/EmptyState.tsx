import { EmptyStateProps } from "@/types";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const EmptyState = ({
  title,
  search,
  buttonLink,
  buttonText,
}: EmptyStateProps) => {
  return (
    <section className="flex-center size-full flex-col gap-3">
      <Image
        src="/icons/emptyState.svg"
        alt="empty state"
        width={250}
        height={250}
      />
      <div className="flex-center w-full max-w-[254px] flex-col gap-3">
        <h1 className="text-16 text-center font-medium text-white-1">
          {title}
        </h1>
        {search && (
          <p className="text-14 text-center font-medium text-white-2">
            Start searching to find some podcasts
          </p>
        )}
        {buttonLink && (
          <Button asChild className="bg-orange-1">
            <Link href={buttonLink} className="flex gap-1">
              <Image
                src="/icons/discover.svg"
                alt="discover"
                width={20}
                height={20}
              />
              <h1 className="text-16 font-extrabold text-white-1">
                {buttonText}
              </h1>
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};

export default EmptyState;
