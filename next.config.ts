import type { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' vitals.vercel-insights.com cdn.usefathom.com;
  child-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src * blob: data: i.ytimg.com cdn.usefathom.com;
  object-src 'none';
  media-src 'none';
  frame-src www.youtube-nocookie.com;
  connect-src *;
  font-src 'self';
`;

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
];

const nextConfig: NextConfig = withPlaiceholder({
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/youtube",
        destination: "https://youtube.com/daveroverts",
        permanent: true,
      },
    ];
  },
});

module.exports = nextConfig;
