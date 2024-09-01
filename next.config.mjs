/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lovely-flamingo-139.convex.cloud" },
      { protocol: "https", hostname: "steady-bat-258.convex.cloud" },
      {
        protocol: "https",
        hostname: "ai-text-to-image-generator-api.p.rapidapi.com",
      },
      {
        protocol: "https",
        hostname: "peregrine-results.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "api.play.ht",
      },
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },
};

export default nextConfig;
