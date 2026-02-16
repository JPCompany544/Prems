import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Allow cross-origin requests from local network devices during development
  allowedDevOrigins: [
    "192.168.1.64",
    // You can add more IPs or use a pattern like "192.168.1.*" if needed
  ],
};

export default nextConfig;
