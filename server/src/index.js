import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import uploadRouter from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
  })
);

app.use(express.json());

// Simple health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// File upload + extraction routes
app.use("/api/upload", uploadRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
