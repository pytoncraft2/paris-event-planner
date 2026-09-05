export type Category = "Music" | "Culture" | "Experience" | "Tour" | "Food" | "Sport" | "Event";

export const CATEGORIES: Category[] = [
  "Music",
  "Culture",
  "Experience",
  "Tour",
  "Food",
  "Sport",
];

export type Language = "English" | "French" | "Bilingual";

export type EventItem = {
  id: string;
  title: string;
  category: Category;
  /** ISO date, e.g. 2026-09-12 */
  date: string;
  time: string;
  neighborhood: string;
  venue: string;
  address: string;
  language: Language;
  /** price in euros, 0 = Free */
  price: number;
  description: string;
  organizer: string;
  organizerRole: string;
  image?: string | undefined;
  publishedByMe?: boolean | undefined;
};

export type Filters = {
  date: "any" | "today" | "tomorrow" | "weekend";
  categories: Category[];
  language: "any" | Language;
  budget: "any" | "free" | "under20" | "under40";
};

export const EMPTY_FILTERS: Filters = {
  date: "any",
  categories: [],
  language: "any",
  budget: "any",
};

export function activeFilterCount(f: Filters): number {
  return (
    (f.date !== "any" ? 1 : 0) +
    f.categories.length +
    (f.language !== "any" ? 1 : 0) +
    (f.budget !== "any" ? 1 : 0)
  );
}

export function formatPrice(price: number): string {
  return price === 0 ? "Free" : `€${price}`;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Deterministic (locale/timezone independent) so SSR and client agree. */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return `${WEEKDAYS[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}
