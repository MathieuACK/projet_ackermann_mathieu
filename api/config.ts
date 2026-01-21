import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const config = {
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key-change-in-production",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "24h",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  BDD: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    bdname: process.env.DB_NAME,
  },
  PORT: process.env.PORT || 3000,
};

export default config;
