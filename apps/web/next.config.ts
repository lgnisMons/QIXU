import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@qixu/ui", "@qixu/config", "@qixu/types", "@qixu/utils"],
};

export default nextConfig;
