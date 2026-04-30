import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
const History=[];

async function Chatting(userProblem){
  History.push({
  role: "user",
  parts: [{ text: userProblem }]
});
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: History,
  });
  console.log(response.text);
  History.push({
  role: "model",
    parts: [{ text: response.text }]
});
}
async function main() {
  const userProblem=readlineSync.question("What do you want to ask? ");
  await Chatting(userProblem);
  main();
}

await main();