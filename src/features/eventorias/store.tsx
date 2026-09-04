import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { ORGANIZER_SEED_EVENTS, SEED_EVENTS } from "./data";
import { EMPTY_FILTERS, type Category, type EventItem, type Filters } from "./types";

/** Demo "today" so relative date filters line up with the simulated data. */
const TODAY = "2026-09-04";
const TOMORROW = "2026-09-05";
const WEEKEND = ["2026-09-05", "2026-09-06"];

export function matches(
  event: EventItem,
  filters: Filters,
  query: string,
  chip: Category | "All",
) {
  const q = query.trim().toLowerCase();
  if (
    q &&
    ![event.title, event.neighborhood, event.venue, event.category].some((v) =>
      v.toLowerCase().includes(q),
    )
  ) {
    return false;
  }
  if (chip !== "All" && event.category !== chip) return false;
  if (filters.categories.length > 0 && !filters.categories.includes(event.category))
    return false;
  if (filters.language !== "any" && event.language !== filters.language) return false;
  if (filters.date === "today" && event.date !== TODAY) return false;
  if (filters.date === "tomorrow" && event.date !== TOMORROW) return false;
  if (filters.date === "weekend" && !WEEKEND.includes(event.date)) return false;
  if (filters.budget === "free" && event.price !== 0) return false;
  if (filters.budget === "under20" && event.price >= 20) return false;
  if (filters.budget === "under40" && event.price >= 40) return false;
  return true;
}

type Store = {
  query: string;
  setQuery: (v: string) => void;
  chip: Category | "All";
  setChip: (c: Category | "All") => void;
  filters: Filters;
  setFilters: (f: Filters) => void;
  signedIn: boolean;
  setSignedIn: (v: boolean) => void;
  notifications: boolean;
  setNotifications: (v: boolean) => void;
  myEvents: EventItem[];
  allEvents: EventItem[];
  visibleEvents: EventItem[];
  findEvent: (id: string) => EventItem | undefined;
  upsertEvent: (event: EventItem) => void;
  cancelEvent: (id: string) => void;
  resetSearch: () => void;
  resetAll: () => void;
};

const EventoriasContext = createContext<Store | null>(null);

export function EventoriasProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [chip, setChip] = useState<Category | "All">("All");
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [signedIn, setSignedIn] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [myEvents, setMyEvents] = useState<EventItem[]>(ORGANIZER_SEED_EVENTS);

  const allEvents = useMemo(() => [...SEED_EVENTS, ...myEvents], [myEvents]);
  const visibleEvents = useMemo(
    () => allEvents.filter((e) => matches(e, filters, query, chip)),
    [allEvents, filters, query, chip],
  );

  const value: Store = {
    query,
    setQuery,
    chip,
    setChip,
    filters,
    setFilters,
    signedIn,
    setSignedIn,
    notifications,
    setNotifications,
    myEvents,
    allEvents,
    visibleEvents,
    findEvent: (id) => allEvents.find((e) => e.id === id),
    upsertEvent: (event) =>
      setMyEvents((list) =>
        list.some((e) => e.id === event.id)
          ? list.map((e) => (e.id === event.id ? event : e))
          : [event, ...list],
      ),
    cancelEvent: (id) => setMyEvents((list) => list.filter((e) => e.id !== id)),
    resetSearch: () => {
      setFilters(EMPTY_FILTERS);
      setChip("All");
      setQuery("");
    },
    resetAll: () => {
      setFilters(EMPTY_FILTERS);
      setChip("All");
      setQuery("");
      setSignedIn(false);
      setNotifications(true);
      setMyEvents(ORGANIZER_SEED_EVENTS);
    },
  };

  return (
    <EventoriasContext.Provider value={value}>{children}</EventoriasContext.Provider>
  );
}

export function useEventorias(): Store {
  const ctx = useContext(EventoriasContext);
  if (!ctx) throw new Error("useEventorias must be used inside EventoriasProvider");
  return ctx;
}
