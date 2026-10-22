/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The three marketing pages are prerendered as static HTML. The contact
  // form needs a small Node server for /api/contact, so the project is built
  // and started with `next build` + `next start` (not a pure static export).
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
