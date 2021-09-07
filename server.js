/**
 * Express Server App
 * Receives incoming requests
 */

import dotenv from "dotenv/config.js";
import express from "express";
import { itemsRouter } from "./routes/index.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use("/api", itemsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

export default app;
