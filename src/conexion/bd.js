import { createPool } from "mysql2/promise";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from "../config.js";
let pool
try {
        pool = createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT,
        database: DB_DATABASE
    })

    const connection = await pool.getConnection();
    console.log("Connected to the database");
} catch (error) {
    console.error("Error connecting to the database: ", error);
}

export { pool }
