import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    history: [],
  });

  while (true) {
    const userProblem = readlineSync.question("What do you want to ask? ");

    if (userProblem.toLowerCase() === "exit") {
      console.log("Chat ended.");
      break;
    }

    const response = await chat.sendMessage({
      message: userProblem,
    });

    console.log(response.text);
  }
}

await main();