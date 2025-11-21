import express from "express";
import multer from "multer";
import { handleFileUpload } from "../controllers/uploadController.js";

const router = express.Router();

// Use memory storage instead of saving to /uploads folder
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter: (_, file, cb) => {
    const allowed = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Unsupported file type"));
    }
    cb(null, true);
  },
});

router.post("/", upload.single("file"), handleFileUpload);

export default router;
