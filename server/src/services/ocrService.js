import Tesseract from "tesseract.js";

const extractText = async (filePath) => {
  const { data } = await Tesseract.recognize(filePath, "eng", {
    logger: () => {},
  });
  return data.text || "";
};

export default { extractText };
