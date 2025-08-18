// next.config.mjs
import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable PWA in dev
  // ⚠️ Do NOT exclude middleware-manifest.json (needed for App Router)
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 768, 1024, 1200],
  },
  // Remove this unless you're actively using Server Actions
  // experimental: {
  //   serverActions: {},
  // },
};

export default withPWA(nextConfig);
