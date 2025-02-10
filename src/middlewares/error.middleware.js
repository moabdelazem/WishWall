/**
 * @module ErrorMiddleware
 * @description Custom error handling middleware for the application
 */

/**
 * @typedef {Object} ErrorResponse
 * @property {boolean} success - Always false for error responses
 * @property {Object} error - Error details
 * @property {string} error.message - Error message
 * @property {number} error.statusCode - HTTP status code
 * @property {string} error.timestamp - ISO timestamp of when the error occurred
 * @property {string} [error.stack] - Stack trace (only in development mode)
 */

/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function
 * @returns {void}
 */
const errorHandler = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";

    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error:", err);
    }

    res.status(statusCode).json({
      success: false,
      error: {
        message,
        statusCode,
        timestamp: new Date().toISOString(),
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Custom error class for handling operational errors
 * @class CustomError
 * @extends Error
 */
class CustomError extends Error {
  /**
   * Creates an instance of CustomError
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * @exports
 * @type {{
 *   errorHandler: function,
 *   CustomError: typeof CustomError
 * }}
 */
export { CustomError, errorHandler };
