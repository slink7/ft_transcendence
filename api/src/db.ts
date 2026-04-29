import { Pool } from "pg";
import { CONFIG } from "./config.js";

export const pool = new Pool({
    user: 'basic',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'transcendence',
});