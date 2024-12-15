"use server";

import { neon } from "@neondatabase/serverless";
import { auth } from "@clerk/nextjs/server";
import { toast } from "sonner";

export async function saveTranslation(
  sourceLan: string,
  targetLan: string,
  sourceText: string,
  translatedText: string
) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    toast("Please sign in to save your translation");
    return redirectToSignIn();
  }

  const sql = neon(process.env.DATABASE_URL as string);
  const response = await sql`
  INSERT INTO translations (
    user_id,
    source_language,
    target_language,
    source_text,
    translated_text
  ) VALUES (
    ${userId},
    ${sourceLan},
    ${targetLan},
    ${sourceText},
    ${translatedText}
  )`;

  console.log("save-translation.ts: ", { response });
}
