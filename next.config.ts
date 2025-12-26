import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    localPatterns: [{ pathname: "/assets/**", search: "" }],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/viniciosneves/**",
      },
    ],
  },
};

export default nextConfig;
