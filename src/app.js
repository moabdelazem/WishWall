import express from "express";
import logger from "./middlewares/logger.middleware.js";
import { errorHandler, CustomError } from "./middlewares/error.middleware.js";
import { testConnection } from "./database/database.js";

export const app = express();

// Setting Basic Middlewares
app.use(logger); // Simple Logger to see requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// Add routes to API v1 Router
apiV1Router.get("/", (req, res) => {
  res.json({
    message: "This is Fucking API",
  });
});

// Mount API v1 router
app.use("/api/v1", apiV1Router);

// Handle 404 routes
app.use("*", (req, res, next) => {
  next(new CustomError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Error handling middleware (should be last)
app.use(errorHandler);
