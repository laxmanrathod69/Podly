"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import Image from "next/image";
import { useDebounce } from "@/lib/useDebounce";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedValue) {
      router.push(`/discover?search=${debouncedValue}`);
    } else if (!debouncedValue && pathname === "/discover") {
      router.push("/discover");
    }
  }, [debouncedValue, router, pathname]);

  return (
    <div className="relative mt-8 block">
      <Input
        value={search}
        onLoad={() => setSearch("")}
        onChange={(e) => setSearch(e.target.value)}
        className="input-class py-6 pl-12 focus-visible:ring-offset-orange-1"
        placeholder="Search for podcasts"
      />
      <Image
        src="/icons/search.svg"
        alt="search"
        width={20}
        height={20}
        className="absolute left-4 top-3.5"
      />
    </div>
  );
};

export default Searchbar;
