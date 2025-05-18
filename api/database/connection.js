import pkg from 'pg';
import env from "dotenv";

env.config();

const { Client } = pkg;

const db = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
});

db.connect();

db.on("error", (err) => {
    console.log("error =>", err.message);
    process.exit(-1);
});

export const query = (text, params) => db.query(text, params);