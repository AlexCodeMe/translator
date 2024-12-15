import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";
import React from "react";
import TranslationCard from "./translation-card";

async function getData(userId: string) {
  const sql = neon(process.env.DATABASE_URL as string);
  const response = await sql`
    SELECT 
      source_language, 
      target_language, 
      COUNT(*) AS translation_count,
      ARRAY_AGG(source_text) AS source_texts,
      ARRAY_AGG(translated_text) AS translated_texts
    FROM translations
    WHERE user_id = ${userId}
    GROUP BY source_language, target_language;
    `;
  return response;
}

export default async function TranslationsPage() {
  const { userId } = await auth();
  const data = await getData(userId as string);
  return (
    <>
      <h1 className="text-3xl fond-bold text-center mb-8 text-gray-800">
        Translations
      </h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((group, index) => (
          <TranslationCard key={index} group={group} />
        ))}
      </div>
    </>
  );
}