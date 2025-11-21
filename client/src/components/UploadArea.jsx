import { useState, useCallback } from "react";
import { uploadFile } from "../services/api.js";

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

function UploadArea({ onStartLoading, onError, onTextExtracted, isLoading }) {
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = useCallback(
    async (files) => {
      const file = files[0];
      if (!file) return;

      if (!ACCEPTED_TYPES.includes(file.type)) {
        onError("Please upload a PDF or image file.");
        return;
      }

      try {
        onStartLoading();
        const res = await uploadFile(file);
        onTextExtracted(res.text || "");
      } catch (err) {
        onError(err.message || "Something went wrong during upload.");
      }
    },
    [onStartLoading, onError, onTextExtracted]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  return (
    <section className="card upload">
      <h2>1. Upload content</h2>
      <p className="upload__hint">
        Drop a **PDF** or **image** (screenshot of your post, etc.).
      </p>

      <div
        className={`upload__dropzone ${
          dragActive ? "upload__dropzone--active" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>
          {isLoading
            ? "Processing your file…"
            : "Drag & drop here or click to browse"}
        </p>
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </div>
    </section>
  );
}

export default UploadArea;
