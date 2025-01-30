import type { NextConfig } from 'next';
import dotenv from 'dotenv'

dotenv.config()

const nextConfig: NextConfig = {
  optimizeFonts: true,
  reactStrictMode: true,
  env: {
    JWT: process.env.JWT,
    URL: process.env.URL,
  },
  font: [{
    name: 'Inter',
    url: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
  }]
};

export default nextConfig;
