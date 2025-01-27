/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "img.clerk.com" }],
  },
}
// "lint-staged": {
//     "**/*": "prettier --write --ignore-unknown"
//   }
export default nextConfig
