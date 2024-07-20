/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASEURL: process.env.API_BASEURL,
  },
  images: {
    
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
