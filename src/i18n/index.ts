export type Lang = "es" | "en" | "fr";
import es from "./es.json";
import en from "./en.json";
import fr from "./fr.json";
const dict: Record<Lang, any> = { es, en, fr };

export function t(lang: Lang, path: string): string {
  const parts = path.split(".");
  let cur: any = dict[lang] ?? dict.es;
  for (const p of parts) cur = cur?.[p];
  return typeof cur === "string" ? cur : path;
}

export function normalizeLang(input?: string): Lang {
  if (input === "en" || input === "fr" || input === "es") return input;
  return "es";
}
