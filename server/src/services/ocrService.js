import Tesseract from "tesseract.js";

const extractText = async (buffer) => {
  const { data } = await Tesseract.recognize(buffer, "eng", {
    logger: () => {}, // silence logs
  });
  return data.text || "";
};

export default { extractText };
