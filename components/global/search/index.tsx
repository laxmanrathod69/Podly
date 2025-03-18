"use client"

import Image from "next/image"
import { useSearch } from "@/hooks/search"
import { useState } from "react"
import { Input } from "@/components/ui/input"

const Searchbar = () => {
  const [query, setQuery] = useState("")
  // TODO: fix issues in hooks for data fetching
  const { isLoading, data } = useSearch(query)
  const search = ""

  return (
    <div className="relative mt-8 block">
      <Input
        value={search}
        // onLoad={() => setSearch("")}
        // onChange={(e) => setSearch(e.target.value)}
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
  )
}

export default Searchbar
