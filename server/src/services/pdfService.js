import pdfParse from "pdf-parse";

const extractText = async (buffer) => {
  // buffer is a Node.js Buffer from Multer memoryStorage
  const data = await pdfParse(buffer);
  return data.text || "";
};

export default { extractText };
