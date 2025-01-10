import type { NextConfig } from 'next';
import dotenv from 'dotenv'

dotenv.config()

const nextConfig: NextConfig = {
  optimizeFonts: true,
  env: {
    JWT: process.env.JWT,
    URL: process.env.URL,
  }
};

export default nextConfig;
