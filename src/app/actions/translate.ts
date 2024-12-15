"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "sonner";

interface translateTextProps {
  text: string;
  targetLanguage: string;
  languageFrom: string;
}

async function translateText({
  text,
  targetLanguage,
  languageFrom,
}: translateTextProps) {
  const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY as string
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = languageFrom
    ? `Translate the following text from ${languageFrom} to ${targetLanguage} : ${text}`
    : `Detect the language of the text and translate it into ${targetLanguage} : ${text}`;
  const additional_prompt =
    "Just return the translated text. Do not add additional descriptions such as `Here are the translations`";
  try {
    const result = await model.generateContent(prompt + additional_prompt);
    return result.response.text();
  } catch (error) {
    toast.error("Error translating text");
    console.error(error);
  }
}

export async function translate(formData: FormData) {
  const text = formData.get("text");
  const targetLanguage = formData.get("languageTo");
  const languageFrom = formData.get("languageFrom");

  const translation = await translateText({
    text: text as string,
    targetLanguage: targetLanguage as string,
    languageFrom: languageFrom as string,
  });

  console.log({ translation });

  return { translation };
}
