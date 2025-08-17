import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';
import * as fs from 'fs';
import { type } from "os";

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
  const imagePart = fileToGenerativePart("C:/Users/fabia/Documents/Develop/HackPuebla/BACKEND/uploads/image-1755444490349-567674403.jpeg", "image/jpeg");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [imagePart, "Which is the risk level of this content? Considering that should be seen by a child"],
    config: {
      systemInstruction: "You are a cibersecurity agent.",
      responseMimeType: "application/json",
      // temperature: 0.1,
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            description: {
              type: Type.STRING,
            },
            risk: {
              type: Type.STRING,
              enum: ["None", "Warning", "High"],
            },
          },
        },
      },
    },
  });

  console.log(response.text);
}

export { runPrompt };