import WishModel from "../models/wish.model.js";
import { CustomError } from "../middlewares/error.middleware.js";

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * Retrieves paginated wishes from the database
 * @param {Request} req - Express request object with query parameters for pagination
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
export const getWishes = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
    const offset = (page - 1) * limit;

    const { wishes, total } = await WishModel.getAllWishes({ limit, offset });

    // Ensure wishes is always an array, even if empty
    const safeWishes = Array.isArray(wishes) ? wishes : [];
    const totalPages = Math.max(1, Math.ceil(total / limit));

    res.status(200).json({
      data: safeWishes, // Changed to 'data' for clarity
      pagination: {
        currentPage: page,
        totalPages: totalPages || 1, // Ensure it's never null
        totalItems: total || 0, // Ensure it's never null
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new wish in the database
 * @param {Request} req - Express request object with body containing title
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {Promise<void>}
 * @throws {Error} Forwards any database errors to error handling middleware
 * @example
 * // Request body
 * {
 *   "title": "Learn TypeScript"
 * }
 */
export const createWish = async (req, res, next) => {
  try {
    const { title } = req.body;

    // Add character length validation
    if (title.length > 255) {
      throw new CustomError("Title is too long (max 255 characters)", 400);
    }

    const newWish = await WishModel.createWish({ title });
    res.status(201).json(newWish);
  } catch (error) {
    next(error);
  }
};
