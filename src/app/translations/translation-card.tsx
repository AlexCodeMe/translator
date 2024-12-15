import { languageToCountryMap } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

interface TranslationCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  group: Record<string, any>;
}

export default function TranslationCard({ group }: TranslationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <div className="flex items-center justify-center mb-4 text-2xl">
        {group.source_language && group.target_language ? (
          <>
            <span>
              {
                languageToCountryMap[
                  group.source_language as keyof typeof languageToCountryMap
                ]
              }
            </span>
            <span className="mx-2 text-gray-500">
              {group.source_language.toUpperCase()}
            </span>
            <ArrowRight className="text-gray-400" />
            <span className="mx-2 text-gray-500">
              {group.target_language.toUpperCase()}
            </span>
            <span>
              {
                languageToCountryMap[
                  group.target_language as keyof typeof languageToCountryMap
                ]
              }
            </span>
          </>
        ) : (
          <span>Unknown Languages</span>
        )}
      </div>
      <div className="flex-grow space-y-4">
        {group.source_texts.map((sourceText: string, index: number) => (
          <div
            key={`${group.source_language}_${group.target_language}_${index}`}
            className="border-b pb-4 last:border-b-0"
          >
            <div className="mb-2">
              <h3 className="font-semibold mb-1">Source</h3>
              <p>{sourceText || "No source text available"}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Translations</h3>
              <p>
                {group.translated_texts[index] || "No translation available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
