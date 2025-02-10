import { app } from "./app.js";
import { PORT } from "./config/env.js";
import { testConnection } from "./database/database.js";

const startServer = async () => {
  try {
    // Test database connection before starting server
    await testConnection();

    app.listen(PORT, () => {
      console.log("✨ WishWall is listening on http://localhost:3000");
    });
  } catch (error) {
    console.error("🚨 Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
