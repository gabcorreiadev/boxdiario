import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Libera o modo dev quando o site é aberto pelo IP da rede (ex.: no celular, mesmo Wi-Fi).
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
};

export default nextConfig;
