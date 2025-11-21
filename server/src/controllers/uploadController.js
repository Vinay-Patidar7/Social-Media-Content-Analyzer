import fs from "fs/promises";
import path from "path";
import pdfService from "../services/pdfService.js";
import ocrService from "../services/ocrService.js";

export const handleFileUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { mimetype, path: filePath } = req.file;

  try {
    let text = "";

    if (mimetype === "application/pdf") {
      text = await pdfService.extractText(filePath);
    } else if (mimetype.startsWith("image/")) {
      text = await ocrService.extractText(filePath);
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    await fs.unlink(filePath).catch(() => {});

    return res.json({ text });
  } catch (error) {
    console.error("File processing error:", error);
    return res
      .status(500)
      .json({ error: "Failed to process file. Please try again." });
  }
};
