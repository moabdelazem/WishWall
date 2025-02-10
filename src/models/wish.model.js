import { query } from "../database/database.js";

/**
 * @typedef {Object} Wish
 * @property {number} id - The unique identifier of the wish
 * @property {string} title - The title of the wish
 * @property {Date} created_at - The timestamp when the wish was created
 */

/**
 * Model class for handling wish-related database operations
 * @class WishModel
 */
class WishModel {
  /**
   * Creates a new wish in the database
   * @param {Object} params - The wish creation parameters
   * @param {string} params.title - The title of the wish
   * @returns {Promise<Wish>} The created wish object
   * @throws {Error} If the database operation fails
   */
  static async createWish({ title }) {
    const sql = `
      INSERT INTO wishes (title, created_at)
      VALUES ($1, NOW())
      RETURNING id, title, created_at
    `;
    const result = await query(sql, [title]);
    return result.rows[0];
  }

  /**
   * Retrieves paginated wishes from the database
   * @param {Object} params - Pagination parameters
   * @param {number} params.limit - Number of wishes per page
   * @param {number} params.offset - Number of wishes to skip
   * @returns {Promise<{wishes: Wish[], total: number}>} Paginated wishes and total count
   */
  static async getAllWishes({ limit = 10, offset = 0 }) {
    const sql = `
      SELECT id, title, created_at 
      FROM wishes 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `;
    const countSql = "SELECT COUNT(id) as total FROM wishes";

    try {
      const [result, countResult] = await Promise.all([
        query(sql, [limit, offset]),
        query(countSql),
      ]);

      return {
        wishes: result.rows || [], // Ensure it's always an array
        total: parseInt(countResult.rows[0]?.total || "0"), // Safe parsing with default
      };
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  }
}

export default WishModel;
