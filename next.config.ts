import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone/LAN access in `next dev` (blocks /_next assets otherwise)
  allowedDevOrigins: ["192.168.0.103", "localhost", "127.0.0.1"],
};

export default nextConfig;
