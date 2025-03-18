const Search = () => {
  return <div>Search</div>
}

export default Search

// import EmptyState from "@/components/EmptyState"
// import LoaderSpinner from "@/components/LoaderSpinner"
// // import PodcastCard from "@/components/global/podcast-cards/podcast-card"
// import Searchbar from "@/components/Searchbar"
// // import { api } from "@/convex/_generated/api"
// // import { useQuery } from "convex/react";

// const Discover = (props: { searchParams: Promise<{ search: string }> }) => {
//   const searchParams = use(props.searchParams)

//   const { search } = searchParams

//   // const podcastData = useQuery(api.podcasts.getPodcastBySearch, {
//   //   search: search || "",
//   // });
//   return (
//     <div className="flex flex-col gap-9">
//       <Searchbar />
//       <div className="flex flex-col gap-9">
//         <h1 className="text-20 font-bold text-white-1">
//           {!search ? "Discover Trending Podcasts" : "Search results for: "}{" "}
//           {search && <span className="text-white-2"> {search}</span>}
//         </h1>
//         {/* {podcastData ? (
//           <>
//              {podcastData.length > 0 ? (
//               <div className="podcast_grid">
//                 {podcastData?.map(
//                   ({ _id, imageUrl, podcastTitle, podcastDescription }) => (
//                     <PodcastCard
//                       key={_id}
//                       imgUrl={imageUrl!}
//                       title={podcastTitle}
//                       podcastId={_id}
//                       description={podcastDescription}
//                     />
//                   ),
//                 )}
//               </div>
//             ) : (
//               <EmptyState title="No results found" />
//             )}
//           </>
//         ) : (
//           <LoaderSpinner />
//         )} */}
//       </div>
//     </div>
//   )
// }

// export default Discover
