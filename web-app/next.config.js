/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  env: {
    IPFS_KEY: process.env.IPFS_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    MASTER_KEY: process.env.MASTER_KEY,
  },
};

module.exports = nextConfig;
