import { query } from "./database.js";

/**
 * Create the wishes table if it doesn't exist
 * @returns {Promise<void>}
 */
export const initializeSchema = async () => {
  const createWishesTable = `
    CREATE TABLE IF NOT EXISTS wishes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await query(createWishesTable);
    console.info("✅ Database schema initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize database schema:", error);
    throw error;
  }
};
