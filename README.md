# Social Media Content Analyzer

🔗 **Live Demo:**  
https://social-media-content-analyzer-cyan.vercel.app/

A full-stack web application that allows users to upload PDFs or images of their social media content, extract the text automatically, and receive engagement suggestions based on simple content heuristics. The system combines OCR, PDF parsing, and frontend text analysis in a clean, modern UI.

---

### Approach

- Implemented an Express API that accepts a single file upload via Multer.
- If the file is a PDF, I use pdf-parse to extract the text.
- If the file is an image, I use tesseract.js to perform OCR.
- The API returns the raw text as JSON.
- The React frontend provides a drag-and-drop upload UI, showing loading and error states.
- Once text is returned, a simple analyzer computes basic metrics (length, words, hashtags, questions, CTA).
- From these metrics, I generate heuristic suggestions to improve engagement.
- The UI shows the raw extracted text plus the suggestions in a clean two-column layout.

---

## ✨ Features

- Upload **PDFs and images** (JPG, PNG, WEBP)
- Automatic text extraction using:
  - `pdf-parse` for PDF parsing
  - `tesseract.js` for OCR on images
- Content analysis including:
  - Word count
  - Character count
  - Hashtag detection
  - CTA detection
  - Question detection
- Engagement suggestions based on extracted text
- Drag-and-drop upload UI
 
  

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- JavaScript ES Modules
- CSS

### Backend
- Node.js + Express
- Multer for file uploads
- pdf-parse for PDF text extraction
- Tesseract.js for OCR
- dotenv

### Deployment
- Backend → Render (Node Web Service)
- Frontend → Vercel (Static Build)  
  **Frontend URL:** https://social-media-content-analyzer-cyan.vercel.app/

---

## 📌 Usage

1. Open the deployed frontend:  
   **https://social-media-content-analyzer-cyan.vercel.app/**
2. Upload a PDF or image.
3. Wait for extraction (OCR/PDF parsing).
4. View:
   - Extracted text
   - Content statistics
   - Suggestions to improve engagement

---
