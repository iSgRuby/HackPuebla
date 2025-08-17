import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

// Converts local file information to a Part object.  
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function runPrompt() {
  const imagePart = fileToGenerativePart("C:/Users/fabia/Documents/Develop/HackPuebla/BACKEND/uploads/image-1755431860475-33355125.jpeg", "image/jpeg");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [imagePart, "Explain this image"],
  });

  console.log(response.text);
}

export { runPrompt };