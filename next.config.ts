/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
      // Add this configuration for DigitalOcean Spaces
      {
        protocol: "https",
        hostname: "ati-image-bicket.nyc3.digitaloceanspaces.com",
        port: "",
        pathname: "/**", // Allow all paths
      },
    ],
  },
};

module.exports = nextConfig;
