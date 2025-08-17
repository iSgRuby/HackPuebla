import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';
import fs from 'fs';
import path from "path";
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

async function runPrompt(filename) {
  const pathimg = path.join(process.cwd(), '/uploads', filename);
  const imagePart = fileToGenerativePart(pathimg, "image/jpeg");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [imagePart, "Which is the risk level of this content? Considering that could be seen by a child"],
    config: {
      systemInstruction: "You are a cibersecurity agent with the goal of preventing grooming, your outputs will help us classify these interaction, you'll assign a brief title like 'Suspicious Language Detected' or 'innapropiate content', description of the possible danger, who sent the message, triggered content (why, maybe the especific message), a descriptive  emoji of the. alert, the application where this behavior was detected.",
      responseMimeType: "application/json",
      // temperature: 0.1,
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
            },
            description: {
              type: Type.STRING,
            },
            triggeredContent: {
              type: Type.STRING,
            },
            from: {
              type: Type.STRING,
            },
            icon: {
              type: Type.STRING,
            },
            app: {
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
  return response;
}

export { runPrompt };