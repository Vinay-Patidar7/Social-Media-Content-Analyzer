import pdfParse from "pdf-parse";

const extractText = async (filePath) => {
  const dataBuffer = await import("fs").then(({ default: fs }) =>
    fs.readFileSync(filePath)
  );
  const data = await pdfParse(dataBuffer);
  // data.text already contains extracted text
  return data.text || "";
};

export default { extractText };
