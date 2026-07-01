import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@qixu/ui",
    "@qixu/config",
    "@qixu/types",
    "@qixu/utils",
    "@qixu/domain",
    "@qixu/contracts",
  ],
};

export default nextConfig;
