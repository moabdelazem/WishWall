import { config } from "dotenv";

const environment = process.env.NODE_ENV || "development";
const envFile =
  {
    development: ".env",
    test: ".env.test",
    production: ".env.prod",
  }[environment] || ".env";

config({
  path: envFile,
});

export const PORT = process.env.PORT || 3000; // fallback port
export const NODE_ENV = environment;
export const DATABASE_URL = process.env.DATABASE_URL;
