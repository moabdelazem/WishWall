import express from "express";
import rateLimit from "express-rate-limit";
import logger from "./middlewares/logger.middleware.js";
import { errorHandler, CustomError } from "./middlewares/error.middleware.js";
import { testConnection } from "./database/database.js";
import wishRouter from "./routes/wish.route.js";

export const app = express();

// Setting Basic Middlewares
app.use(logger); // Simple Logger to see requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);

// Create API v1 Router
const apiV1Router = express.Router();

// Add health check endpoint
apiV1Router.get("/health", async (req, res, next) => {
  try {
    await testConnection();
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch {
    next(new CustomError("Database health check failed", 503));
  }
});

// Mount wishes router
apiV1Router.use("/wishes", wishRouter);

// Mount API v1 router
app.use("/api/v1", apiV1Router);

// Handle 404 routes
app.use("*", (req, res, next) => {
  next(new CustomError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Error handling middleware (should be last)
app.use(errorHandler);
