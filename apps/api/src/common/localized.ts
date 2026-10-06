import type { Prisma } from "@prisma/client";

export type Localized = {
  es: string;
  en: string;
};

export function asJson(value: unknown): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue;
}

export const emptyLocalized: Localized = { es: "", en: "" };

export type Screenshot = {
  src: string;
  alt: Localized;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readLocalized(value: unknown): Localized {
  if (
    !isRecord(value) ||
    typeof value.es !== "string" ||
    typeof value.en !== "string"
  ) {
    throw new Error("Stored localized text is invalid");
  }

  return { es: value.es, en: value.en };
}

export function readLocalizedList(value: unknown): Localized[] {
  if (!Array.isArray(value)) {
    throw new Error("Stored localized list is invalid");
  }

  return value.map((item) => readLocalized(item));
}

export function readScreenshots(value: unknown): Screenshot[] {
  if (!Array.isArray(value)) {
    throw new Error("Stored screenshots are invalid");
  }

  return value.map((item) => {
    if (!isRecord(item) || typeof item.src !== "string") {
      throw new Error("Stored screenshot is invalid");
    }

    return { src: item.src, alt: readLocalized(item.alt) };
  });
}
