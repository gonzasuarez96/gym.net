import dotenv from "dotenv";

dotenv.config();

export const config = {
  api: {
    url: process.env.API_URL ?? "http://localhost:3100",
    port: process.env.PORT ?? 3100
  },
  database: {
    url: process.env.DATABASE_URL ?? "postgres://localhost:5432/gym",
    name: process.env.DATABASE_NAME ?? "gym",
    user: process.env.DATABASE_USER ?? "postgres",
    password: process.env.DATABASE_PASSWORD ?? "password",
    host: process.env.DATABASE_HOST ?? "localhost"
  },
  docs: {
    definition: {
      openapi: "3.0.0",
      info: { title: "Express API for Gym management", version: "0.1.0" }
    },
    servers: [{ url: process.env.DOCS_URL ?? "http://localhost:3100" }],
    apis: ["./src/web/v1/docs/*.{yaml, ts}"]
  },
  jwt: {
    AT_EXPIRE_HR: process.env.JWT_AT_EXPIRE_HR ?? "10 minutes",
    RT_EXPIRE_HR: process.env.JWT_RT_EXPIRE_HR ?? "1 day",
    AT_EXPIRE_TS: parseInt(process.env.JWT_AT_EXPIRE_TS ?? "30000", 10),
    RT_EXPIRE_TS: parseInt(process.env.JWT_RT_EXPIRE_TS ?? "86400000", 10),
    secret: process.env.JWT_SECRET ?? "secret"
  }
};
