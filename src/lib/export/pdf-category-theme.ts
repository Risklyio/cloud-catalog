import type { ServiceCategory } from "@/types";

export type PdfCategoryTheme = {
  cardFill: [number, number, number];
  cardStroke: [number, number, number];
  badgeFill: [number, number, number];
  badgeText: [number, number, number];
  metaText: [number, number, number];
};

/** Card background tints aligned with catalog category badges. */
export const PDF_CATEGORY_THEME: Record<ServiceCategory, PdfCategoryTheme> = {
  SaaS: {
    cardFill: [245, 243, 255],
    cardStroke: [221, 214, 254],
    badgeFill: [237, 233, 254],
    badgeText: [109, 40, 217],
    metaText: [91, 33, 182],
  },
  PaaS: {
    cardFill: [240, 249, 255],
    cardStroke: [186, 230, 253],
    badgeFill: [224, 242, 254],
    badgeText: [3, 105, 161],
    metaText: [7, 89, 133],
  },
  IaaS: {
    cardFill: [255, 251, 235],
    cardStroke: [253, 230, 138],
    badgeFill: [254, 243, 199],
    badgeText: [146, 64, 14],
    metaText: [120, 53, 15],
  },
  AI: {
    cardFill: [253, 244, 255],
    cardStroke: [245, 208, 254],
    badgeFill: [250, 232, 255],
    badgeText: [134, 25, 143],
    metaText: [112, 26, 117],
  },
};

export const PDF_BRAND = {
  headerFill: [101, 87, 255] as [number, number, number],
  headerAccent: [247, 77, 199] as [number, number, number],
  headerText: [255, 255, 255] as [number, number, number],
  pillFill: [255, 255, 255] as [number, number, number],
};
