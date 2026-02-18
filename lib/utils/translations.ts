export const translations = {
  en: {
    main_text:
      "I’m ~ a Frontend Engineer specializing in turning complex problems into elegant, high-performance interfaces",
    description: "Explore the magnifying glass effect.",
  },
  kz: {
    main_text: "Bienvenido a nuestro proyecto",
    description: "Explora el efecto de la lupa.",
  },
  ru: {
    main_text: "Bienvenido a nuestro proyecto",
    description: "Explora el efecto de la lupa.",
  },
};

export type Language = keyof typeof translations;
export type TranslationKeys = keyof (typeof translations)["en"];
