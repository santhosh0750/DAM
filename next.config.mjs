/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  // pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: { unoptimized: true },
  reactStrictMode: true,

  env: {
    // NEXT_PUBLIC_Backend_URL: "http://172.16.5.213:3000/",
    NEXT_PUBLIC_Backend_URL: "http://172.16.5.22:4400/",
  },
};

export default nextConfig;
