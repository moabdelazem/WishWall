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
   * Retrieves all wishes from the database in descending order by creation date
   * @returns {Promise<Wish[]>} Array of wish objects
   * @throws {Error} If the database operation fails
   */
  static async getAllWishes() {
    const sql = `
      SELECT * FROM wishes
      ORDER BY created_at DESC
    `;
    const result = await query(sql);
    return result.rows;
  }
}

export default WishModel;
