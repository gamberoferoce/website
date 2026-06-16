import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  turbopack: {
    // Prevent Next from inferring a higher-level workspace root
    // when multiple lockfiles exist on the machine.
    root: process.cwd(),
  },
};

export default nextConfig;
