import { Pool } from "pg";
import { CONFIG } from "./config.js";

export const pool = new Pool({
    user: process.env.POSTGRES_USER || "basic",
    password: process.env.POSTGRES_PASSWORD || "123456",
    // host: "localhost",
    host: process.env.POSTGRES_HOST || "database",
    port: Number(process.env.POSTGRES_PORT || 5432),
    database: process.env.POSTGRES_DB || "transcendence",
});
