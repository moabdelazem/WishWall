import pkg from "pg";
import { DATABASE_URL } from "../config/env.js";
const { Pool } = pkg;

/**
 * @type {import('pg').Pool}
 */
const pool = new Pool({
  connectionString: DATABASE_URL,
  // Add explicit configuration for debugging
  ssl: false,
  parseInputDatesAsUTC: true,
});

/**
 * Test database connection
 * @returns {Promise<boolean>}
 */
export const testConnection = async () => {
  let client;
  try {
    client = await pool.connect();
    await client.query("SELECT NOW()");
    console.info("✅ Database connection successful");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", {
      message: error.message,
      detail: error.detail,
      hint: error.hint,
    });
    throw error;
  } finally {
    client?.release();
  }
};

// Helper functions for common database operations
/**
 * Execute a query with optional parameters
 * @param {string} text - The SQL query text
 * @param {Array} params - The query parameters
 * @returns {Promise<import('pg').QueryResult>}
 */
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error("Query error", { text, error });
    throw error;
  }
};

/**
 * Get a client from the pool
 * @returns {Promise<import('pg').PoolClient>}
 */
export const getClient = () => pool.connect();

export default pool;
