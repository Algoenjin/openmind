import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack doesn't pick a parent lockfile.
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
