/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lovely-flamingo-139.convex.cloud" },
      { protocol: "https", hostname: "steady-bat-258.convex.cloud" },
      { protocol: "https", hostname: "ai-image-generator3.p.rapidapi.com" },
      { protocol: "https", hostname: "open-ai-text-to-speech1.p.rapidapi.com" },
      { protocol: "https", hostname: "image.lexica.art" },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },
};

export default nextConfig;
