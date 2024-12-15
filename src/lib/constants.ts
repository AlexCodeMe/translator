export type langOptions = {
  value: string;
  label: string;
};

export const languageOptions: langOptions[] = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "es",
    label: "Spanish",
  },
  {
    value: "fr",
    label: "French",
  },
];

export const languageToCountryMap = {
  en: "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
};
