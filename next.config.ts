import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/atendimento-whatsapp",
        destination: "/nexiatend",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
