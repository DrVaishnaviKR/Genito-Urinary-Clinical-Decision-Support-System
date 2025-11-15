
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, User } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const getGeminiExplanation = async (diagnosis: string, info: string | undefined, history: ChatMessage[], user: User): Promise<string> => {
  if (!ai) {
    return Promise.resolve("Gemini AI is not configured. Please set the API_KEY environment variable.");
  }

  const conversationPath = history
    .map(msg => `${msg.sender === 'system' ? 'System Question' : 'Patient Answer'}: ${msg.text}`)
    .join('\n');

  const prompt = `
    You are a helpful medical assistant explaining a potential diagnosis to a user based on a clinical decision support tool.
    The patient's details are: Name: ${user.name}, Age: ${user.age}, Gender: ${user.gender}.
    The tool has suggested a potential diagnosis of "${diagnosis}".
    ${info ? `Additional information from the tool: "${info}".` : ''}

    The user's answers that led to this conclusion were:
    ---
    ${conversationPath}
    ---

    Based on this information, please provide a simple, clear, and empathetic explanation for the user.
    - Explain what "${diagnosis}" is in easy-to-understand terms.
    - Briefly mention common symptoms associated with it.
    - IMPORTANT: Conclude by strongly advising the user to consult a qualified healthcare professional for an accurate diagnosis and treatment. State clearly that this tool is for informational purposes only and is not a substitute for professional medical advice.
    - Do not give any medical advice, treatment plans, or prescriptions.
    - Keep the tone reassuring and professional.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "There was an error generating an explanation. Please consult a healthcare professional directly.";
  }
};
