import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Folder/index.html per route — works cleanly on Hostinger public_html
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
